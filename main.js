/**
 * Created by Manu Masson on 6/27/2017.
<<<<<<< HEAD
 * Forked by BS on 11/11/2017
=======
 * Modified by Block-Shaman on 11/11/2017
>>>>>>> aa62d228ba4de507d20cab8e3b3c2d3bf886abcd
 *
 */

'use strict';

const request = require('request'), Promise = require("bluebird"); //request for pulling JSON from api. Bluebird for Promises.
var ccxt = require ('ccxt')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const gulp = require('gulp');
const xmlTransformer = require("gulp-xml-transformer");
const express = require('express'),
    app = express(),
    helmet = require('helmet'),
    http = require('http').Server(app),
    io = require('socket.io')(http); // For websocket server functionality
/*
    binance.options({
    	'APIKEY':'MPFVR12vWimJ4envNQPvWBCjwr4EHUVTFNA9Cwf06WOU61AgnEt56XdSgG4Ds02a',
    	'APISECRET':'oLJ9Iwlt4TxGyuZvcB4OARySosntTCV4sFga0KwCBvIddVl2M4rXa1X7Tqd5RTUN'
    });
    */
//var ccxtPolo = new ccxt.poloniex();
//var ccxtBittrex = new ccxt.bittrex();
var ccxtLiqui = new ccxt.liqui();
//const Poloniex = require('poloniex-api-node');


var bittrex = require('node-bittrex-api');
const API_KEY = "123";
const API_SECRET = "123321123321";
bittrex.options({
'apikey' : API_KEY,
'apisecret' : API_SECRET,
});

const WebSocket = require('ws');
const Liqui = require('node.liqui.io');
let liqui = new Liqui();
//let poloniex = new Poloniex();




var ccxtCryptopia = new ccxt.cryptopia();

const TOKEN = {
  AVT: "0x0d88ed6e74bbfd96b831231638b66c05571e824f",
  EVX: "0xf3db5fa2c66b7af3eb0c0b782510816cbe4813b8",
  COSS: "0x65292eeadf1426cd2df1c4793a3d7519f253913b",
  OMG: "0xd26114cd6ee289accf82350c8d8487fedb8a0c07",
  KNC: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
  REQ: "0x8f8221afbb33998d8584a2b05749ba73c37a938a",
  SALT: "0x4156D3342D5c385a87D264F90653733592000581",
  LINK: "0x514910771af9ca656af840dff83e8264ecf986ca",
  WTC: "0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74",
  TKN: "0xaaaf91d9b90df800df4f55c205fd6989c977e73a",
  DNT: "0x0abdace70d3790235af448c88547603b945604ea",
  MCO: "0xb63b606ac810a52cca15e44bb630fd42d8d1d83d",
  WINGS: "0x667088b212ce3d06a1b553a7221E1fD19000d9aF",
  ZRX: "0xe41d2489571d322189246dafa5ebde1f4699f498",
  GNO: "0x6810e776880c02933d47db1b9fc05908e5386b96",
  MYST: "0xa645264C5603E96c3b0B078cdab68733794B0A71",
  FIRST: "0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7",
  ADT: "0xd0d6d6c5fe4a677d343cc433536bb717bae167dd",
  MOD: "0x957c30ab0426e0c93cd8241e2c60392d08c6ac8e",
  HMQ: "0xcbcc0f036ed4788f63fc0fee32873d6a7487b908",
  GUP: "0xf7b098298f7c69fc14610bf71d5e02c60792894c"
};



app.use(helmet.hidePoweredBy({setTo: 'PHP/5.4.0'}));

const port = process.env.PORT || 3000;



app.use(express.static(__dirname + '/docs'));

http.listen(port, function () {
    console.log('listening on', port);
});


require('./settings.js')(); //Includes settings file.
// let db = require('./db.js'); //Includes db.js


let coinNames = [];
io.on('connection', function (socket) {
    socket.emit('coinsAndMarkets', [marketNames, coinNames]);
    socket.emit('results', results);
});

// coin_prices is an object with data on price differences between markets. = {BTC : {market1 : 2000, market2: 4000, p : 2}, } (P for percentage difference)
// results is a 2D array with coin name and percentage difference, sorted from low to high.
let coin_prices = {}, numberOfRequests = 0, results = []; // GLOBAL variables to get pushed to browser.

const Service = require('./service.js');

const service = new Service();

const getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
    })
};


function getMarketData(options, coin_prices, callback) {   //GET JSON DATA
    return new Promise(function (resolve, reject) {
        request(options.URL, function (error, response, body) {
            try {
              if (options.marketName == "etherdelta")
              {
                console.log("Websocket about to be initiated..");

                var ws = new WebSocket("wss://socket.etherdelta.com/socket.io/?EIO=3&transport=websocket", "returnTicker");

                ws.onopen = function() {
                    console.log("Message is about to be sent...");
                  };

                  ws.onmessage = function (evt) {
                      var received_msg = evt.data;
                      //console.log("Message is received...", evt.data);
                      body = evt.data;
                    };

                    let data = JSON.parse(body);
                    console.log(data);
/*
                    let newCoinPrices = options.last(data, coin_prices, options.toBTCURL);
                    numberOfRequests++;
                    if (numberOfRequests >= 1) computePrices(coin_prices);
                    resolve(newCoinPrices);
*/

              } else {
                let data = JSON.parse(body);
                console.log("Success", options.marketName);
                if (options.marketName) {

                    let newCoinPrices = options.last(data, coin_prices, options.toBTCURL);
                    numberOfRequests++;
                    if (numberOfRequests >= 1) computePrices(coin_prices);
                    resolve(newCoinPrices);
                }
                else {
                    resolve(data);
                }
              }
            } catch (error) {
                console.log("Error getting JSON response from", options.URL, error); //Throws error
                reject(error);
            }

        });


    });
}

async function computePrices(data) {
    results = [];

    function loopData() {
        return new Promise(function (resolve, reject) {

            if (numberOfRequests >= 2) {

                for (let coin in data) {
                  if (coin != "NET" && coin != "BTM" && coin != "ELC" && coin != "HSR")

                    if (Object.keys(data[coin]).length > 1) {
                        if (coinNames.includes(coin) == false) coinNames.push(coin);
                        let arr = [];
                        for (let market in data[coin]) {
                            arr.push([data[coin][market], market]);

                        }
                        arr.sort(function (a, b) {
                            return a[0] - b[0];
                        });
                        for (let i = 0; i < arr.length; i++) {
                            for (let j = i + 1; j < arr.length; j++) {
                                results.push(
                                    {
                                        coin: coin,
                                        spread: arr[i][0] / arr[j][0],
                                        market2: {
                                            name: arr[i][1],
                                            last: arr[i][0],
                                            volume: arr[i][2]
                                        },
                                        market1: {
                                            name: arr[j][1],
                                            last: arr[j][0],
                                            volume: arr[i][2]
                                        }

                                    },
                                    {//TODO, shouldnt have to create duplicate object for same markets
                                        coin: coin,
                                        spread: arr[j][0] / arr[i][0],
                                        market2: {
                                            name: arr[j][1],
                                            last: arr[j][0],
                                            volume: arr[i][2]
                                        },
                                        market1: {
                                            name: arr[i][1],
                                            last: arr[i][0],
                                            volume: arr[i][2]
                                        }

                                    }
                                );

                                // db.insert({
                                //     coin: coin,
                                //     lastSpread: arr[i][0] / arr[j][0],
                                //     market1: {
                                //         name: arr[i][1],
                                //         last: arr[i][0]
                                //     },
                                //     market2: {
                                //         name: arr[j][1],
                                //         last: arr[j][0]
                                //     }
                                // })

                            }
                        }

                    }
                }
                results.sort(function (a, b) {
                    return a.spread - b.spread;
                });
                console.log('Finishing function...');
                resolve();
            }
        })
    }  

    await loopData();


    io.emit('results', results);
}

async function getOrders(marketName, coin)
{


  let results1 = [];
  let results2 = [];

  var price = 0;
  let deltaOB = [];

  //console.log("1");
  //console.log(deltaOB);


  switch (marketName) {
      case "bittrex":
      var string1 = "";

      var data;
      var link = "https://bittrex.com/api/v1.1/public/getorderbook?market=ETH-" + coin + "&type=both";
      //console.log(link);
      await getContent(link)
          .then((html) => data = JSON.parse(html))
          .catch((err) => console.error(err));

          //console.log("test binance finish ");
          /*
          console.log(data.bids[0][0]);
          console.log(data.bids[0][1]);
          console.log(data.bids[1][0]);
          console.log(data.bids[1][1]);
          */

          //console.log(data.asks[0][0]);
          var i = 0;
          var count;
          //console.log(data.result);
          try {
              //console.log("test1: ", deltaOB.length, "test2: ", deltaOB.Length);
              for (count = 0; count < 5; count++)
              {
                results1[i] = data.result.buy[count].Rate; i++;
                results1[i] = data.result.buy[count].Quantity; i++;
              }
              i=0;
              for (count = 0; count < 5; count++)
              {
                results2[i] = data.result.sell[count].Rate; i++;
                results2[i] = data.result.sell[count].Quantity; i++;
              }

            } catch(err) {
            console.log(err);
            console.log("err.db.conversion.bittrex");
          }
/*
var data1 = "";
          data1 = await bittrex.getorderbook({ market : 'ETH-LTC', depth : 5, type : 'both' }, function( data, err ) {
            //console.log( data.result.buy[0].Rate );
              return data;
        //data = await (ccxtBittrex.fetchOrderBook('ETH-' + coin));
        //console.log(data1);

                var i = 0;
                var count;

            //console.log("test1: ", deltaOB.length, "test2: ", deltaOB.Length);
              for (count = 0; count < 5; count++)
              {
                results1[i] = data.result.buy[count].Rate; i++;
                results1[i] = data.result.buy[count].Quantity; i++;
              }
              i=0;
              for (count = 0; count < 5; count++)
              {
                results2[i] = data.result.sell[count].Rate; i++;
                results2[i] = data.result.sell[count].Quantity; i++;
              }
              //console.log(results2);


      });

        console.log(data1);
        //console.log("test2: ", results);
*/
      break;

      case "poloniex":
        data = await (ccxtPolo.fetchOrderBook('ETH_' + coin));
        var i = 0;
        var count;
        try {
            //console.log("test1: ", deltaOB.length, "test2: ", deltaOB.Length);
            for (count = 0; count < 5; count++)
            {
              results1[i] = data.bids[count][0]; i++;
              results1[i] = data.bids[count][1]; i++;
            }
            i=0
            for (count = 0; count < 5; count++)
            {
              results2[i] = data.asks[count][0]; i++;
              results2[i] = data.asks[count][1]; i++;
            }

          } catch(err) {
          console.log(err);
          console.log("err.db.conversion.poloniex");
        }


      break;

      case "liqui":
/*
      await liqui.info().then( result => {
          console.log(result);
      });
*/    var pair = coin.toLowerCase() + '_eth';
      await liqui.depth(pair)
                  .then( result => {
                    console.log(result[pair].asks[0][0]);
                    var i =0;
                    for (count = 0; count < 5; count++)
                    {
                      results1[i] = data.bids[count][0]; i++;
                      results1[i] = data.bids[count][1]; i++;
                    }
                    i=0
                    for (count = 0; count < 5; count++)
                    {
                      results2[i] = data.asks[count][0]; i++;
                      results2[i] = data.asks[count][1]; i++;
                    }
                        //console.log(result.asks[0][0])

                       });
        //results = await (ccxtLiqui.fetchOrderBook('ETH' + coin));
      break;

      case "binance":
        //var pair = coin + "ETH";
        var string1 = "";

        var data;
        var link = "https://www.binance.com/api/v1/depth?symbol=" + coin + "ETH";
        //console.log(link);
        await getContent(link)
            .then((html) => data = JSON.parse(html))
            .catch((err) => console.error(err));

            //console.log("test binance finish ");
            /*
            console.log(data.bids[0][0]);
            console.log(data.bids[0][1]);
            console.log(data.bids[1][0]);
            console.log(data.bids[1][1]);
            */

            //console.log(data.asks[0][0]);
            var i = 0;
            var count;
            try {
                //console.log("test1: ", deltaOB.length, "test2: ", deltaOB.Length);
                for (count = 0; count < 5; count++)
                {
                  results1[i] = data.bids[count][0]; i++;
                  results1[i] = data.bids[count][1]; i++;
                }
                i=0;
                for (count = 0; count < 5; count++)
                {
                  results2[i] = data.asks[count][0]; i++;
                  results2[i] = data.asks[count][1]; i++;
                }

              } catch(err) {
              console.log(err);
              console.log("err.db.conversion.binance");
            }
          //console.log("test 1: ", array1.buys[0]);
          //console.log("bookTickers()", ticker);
          //console.log("Price of ", coin, ": ", ticker[coin + 'ETH']);

      break;

      case "cryptopia":
        console.log("test1: ", marketName);

        results = await (ccxtCryptopia.fetchOrderBook(coin + '-ETH'));
        console.log("test2: ", marketName, " with data: ", results);

      break;

      case "etherdelta":
        console.log("test1: ", marketName);
        if (coin == "1ST") coin = "FIRST";
        var myToken = TOKEN[coin];
        var localToken = {
          addr: myToken,
          decimals: 18,
        };
        //console.log(myToken);

          //console.log(localToken.addr);
          await service.init(config)
                        .then(() => service.waitForMarket(localToken, user))
                         .catch((err) => {
                            console.log(err);
                            console.log("err.service.1");
                            process.exit();
                          })
                         .then(() => deltaOB = service.getOrderBook())
                          .catch((err) => {
                            console.log(err);
                            console.log("err.service.2");
                            process.exit();
                          });
        var i = 0;
        var c = 1;
        var count;
        try {
            //console.log("test1: ", deltaOB.length, "test2: ", deltaOB.Length);
            for (count = deltaOB.length-1; count > 4; count--)
            {
              results1[i] = deltaOB[count].price.toFixed(9); i+=2;
              //console.log(deltaOB[count].ethAvailableVolume.toFixed(3));
              results1[c] = deltaOB[count].ethAvailableVolume.toFixed(3); c+=2;
            }
            i=0; c=0;
            for (count = 0; count < 5; count++)
            {
              results2[i] = deltaOB[count].price.toFixed(9); i+=2;
              //console.log(deltaOB[count].ethAvailableVolume.toFixed(3));
              results2[c] = deltaOB[count].ethAvailableVolume.toFixed(3); c+=2;
            }


          } catch(err) {
            console.log(err);
            console.log("err.db.conversion.1");
          }

        //results = deltaOB;
        if (results.length > 0)
          console.log("DB OK")
        else {
          console.log("DB EMPTY")
        }
        //console.log(deltaOB);
      break;

      default:
        console.log("Uknown Market: ", marketName);
   }

   if (results1 != "undefined"){
      console.log("test ok, object defined");
      return {
          results1: results1,
          results2: results2,
            };
   }
   else
   {
      console.log("Error fetching OrderBook of ", marketName);
      return null;
   }
}
/*
        var count = 0;
        while (count < 5){
          gulp.src("docs/grid.xml").pipe(xmlTransformer([
            { path: '//table//data//row//column1', text: ordersBuy.buys[count].price },
            { path: '//table//data//row//column2', text: ordersBuy.buys[count].ethAvailableVolumeBase },
            { path: '//table//data//row//column3', text: ordersBuy.sell[count].price },
            { path: '//table//data//row//column4', text: ordersBuy.sell[count].ethAvailableVolumeBase }
          ])).pipe(gulp.dest("docs/"));
          count++;
        }
*/






const user = {
  addr: '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819',
  pk: '',
};

const config = {
  addressEtherDelta: '0x8d12a197cb00d4747a1fe03395095ce2a5cc6819',
  provider: 'https://mainnet.infura.io/Ky03pelFIxoZdAUsr82w',
  socketURL: 'https://socket.etherdelta.com',
  gasLimit: 150000,
  gasPrice: 4000000000,
};



(async function main() {
    let arrayOfRequests = [];


    for (let i = 0; i < markets.length; i++) {
        arrayOfRequests.push(getMarketData(markets[i], coin_prices));
    }

    await Promise.all(arrayOfRequests.map(p => p.catch(e => e)))

        .then(results => computePrices(coin_prices))

        .catch(e => console.log(e));


        let whichOne = results[0];
        let coin = whichOne.coin;
        //let coin = "MCO";
        console.log("=====",coin,"===== ||| ", whichOne.market1, " vs ", whichOne.market2, "===========");

        let orders1Array = await getOrders(whichOne.market1.name, coin); //whichOne.market1.name
        let orders1Buy = orders1Array.results1;
        let orders1Sell = orders1Array.results2;

        console.log("====price=====vol (",coin,")=======================");
        console.log(orders1Buy[0], " = ", orders1Buy[1], "     |   ", orders1Sell[0], " = ", orders1Sell[1]);
        console.log(orders1Buy[2], " = ", orders1Buy[3], "     |   ", orders1Sell[2], " = ", orders1Sell[3]);
        console.log(orders1Buy[4], " = ", orders1Buy[5], "     |   ", orders1Sell[4], " = ", orders1Sell[5]);
        console.log(orders1Buy[6], " = ", orders1Buy[7], "     |   ", orders1Sell[6], " = ", orders1Sell[7]);
        console.log(orders1Buy[8], " = ", orders1Buy[9], "     |   ", orders1Sell[8], " = ", orders1Sell[9]);

        console.log("======= WAIT 1 OK ==================================");

        let orders2Array = await getOrders(whichOne.market2.name, coin);
        let orders2Buy = orders2Array.results1;
        let orders2Sell = orders2Array.results2;

        console.log("====price=====vol (",coin,")=======================");
        console.log(orders2Buy[0], " = ", orders2Buy[1], "     |   ", orders2Sell[0], " = ", orders2Sell[1]);
        console.log(orders2Buy[2], " = ", orders2Buy[3], "     |   ", orders2Sell[2], " = ", orders2Sell[3]);
        console.log(orders2Buy[4], " = ", orders2Buy[5], "     |   ", orders2Sell[4], " = ", orders2Sell[5]);
        console.log(orders2Buy[6], " = ", orders2Buy[7], "     |   ", orders2Sell[6], " = ", orders2Sell[7]);
        console.log(orders2Buy[8], " = ", orders2Buy[9], "     |   ", orders2Sell[8], " = ", orders2Sell[9]);
        console.log("====== WAIT 2 OK ======");


        //var count = 0;
        var i = 0;
        //while (count < 5){
          gulp.src("docs/grid.xml").pipe(xmlTransformer([
            { path: '//table//data//row//column1', text: orders1Buy[0] },
            { path: '//table//data//row//column2', text: orders1Buy[1] },
            { path: '//table//data//row//column3', text: orders1Sell[0] },
            { path: '//table//data//row//column4', text: orders1Sell[1] },
            { path: '//table//data//row//column5', text: orders2Buy[0] },
            { path: '//table//data//row//column6', text: orders2Buy[1] },
            { path: '//table//data//row//column7', text: orders2Sell[0] },
            { path: '//table//data//row//column8', text: orders2Sell[1] },

            { path: '//table//data//row1//column1', text: orders1Buy[2] },
            { path: '//table//data//row1//column2', text: orders1Buy[3] },
            { path: '//table//data//row1//column3', text: orders1Sell[2] },
            { path: '//table//data//row1//column4', text: orders1Sell[3] },
            { path: '//table//data//row1//column5', text: orders2Buy[2] },
            { path: '//table//data//row1//column6', text: orders2Buy[3] },
            { path: '//table//data//row1//column7', text: orders2Sell[2] },
            { path: '//table//data//row1//column8', text: orders2Sell[3] },

            { path: '//table//data//row2//column1', text: orders1Buy[4] },
            { path: '//table//data//row2//column2', text: orders1Buy[5] },
            { path: '//table//data//row2//column3', text: orders1Sell[4] },
            { path: '//table//data//row2//column4', text: orders1Sell[5] },
            { path: '//table//data//row2//column5', text: orders2Buy[4] },
            { path: '//table//data//row2//column6', text: orders2Buy[5] },
            { path: '//table//data//row2//column7', text: orders2Sell[4] },
            { path: '//table//data//row2//column8', text: orders2Sell[5] },

            { path: '//table//data//row3//column1', text: orders1Buy[6] },
            { path: '//table//data//row3//column2', text: orders1Buy[7] },
            { path: '//table//data//row3//column3', text: orders1Sell[6] },
            { path: '//table//data//row3//column4', text: orders1Sell[7] },
            { path: '//table//data//row3//column5', text: orders2Buy[6] },
            { path: '//table//data//row3//column6', text: orders2Buy[7] },
            { path: '//table//data//row3//column7', text: orders2Sell[6] },
            { path: '//table//data//row3//column8', text: orders2Sell[7] }

          ])).pipe(gulp.dest("docs/"));
        //  count++;


        console.log("done.");
/*
        if (orders1Buy=="undefined"){
            console.log("ordersBuy undefined")
            throw new Exception();
          }
        else {
          console.log("ordersBuy array OK");
        }
*/
        //console.log("orderStart");

        //console.log(ordersSell[0]);
        console.log("============");


        //console.log("orderEnd");

/*
        console.log(whichOne.market1.name + ":" + whichOne.market2.name);
        console.log(coin);


      /*                while (count < 5){
                  gulp.src("docs/grid.xml").pipe(xmlTransformer([
                    { path: '//table//data//row//column5', text: ordersSell.buys[count].price },
                    { path: '//table//data//row//column6', text: ordersSell.buys[count].ethAvailableVolumeBase },
                    { path: '//table//data//row//column7', text: ordersSell.sell[count].price },
                    { path: '//table//data//row//column8', text: ordersSell.sell[count].ethAvailableVolumeBase }
                  ])).pipe(gulp.dest("docs/"));
                  count++;
                }

              break;

              default:
                  console.log("Uknown Market: ", whichOne.market2.name);
            }
*/
        //let orders = await (ccxtBittrex.fetchOrderBook('BTC-DOGE'));
        //let testGrid = $('#tablecontent').html();
        //let templateGrid = Handlebars.compile(testGrid);
        console.log("Emitting Results...");



        /*
        console.log("Can Buy");
        console.log("======================================");
        console.log("Price:" + ordersBuy.asks[0][0].toFixed(8).toString() + ", Volume:" + ordersBuy.asks[0][1]);
        console.log("Price:" + ordersBuy.asks[1][0].toFixed(8).toString() + ", Volume:" + ordersBuy.asks[1][1]);
        console.log("Price:" + ordersBuy.asks[2][0].toFixed(8).toString() + ", Volume:" + ordersBuy.asks[2][1]);
        console.log("Price:" + ordersBuy.asks[3][0].toFixed(8).toString() + ", Volume:" + ordersBuy.asks[3][1]);

        console.log("Can Sell");
        console.log("======================================");
        console.log("Price:" + ordersSell.bids[0][0].toFixed(8).toString() + ", Volume:" + ordersSell.bids[0][1]);
        console.log("Price:" + ordersSell.bids[1][0].toFixed(8).toString() + ", Volume:" + ordersSell.bids[1][1]);
        console.log("Price:" + ordersSell.bids[2][0].toFixed(8).toString() + ", Volume:" + ordersSell.bids[2][1]);
        console.log("Price:" + ordersSell.bids[3][0].toFixed(8).toString() + ", Volume:" + ordersSell.bids[3][1]);
        */
    setTimeout(main, 10000);
})();




/*   ============
        Obsolete Methods
     ============

https://www.binance.com/api/v1/depth?symbol=ETHBTC

     async function getDeltaOrders(symbol) {

           try {
                 //console.log("test1");

                 var xhr = new XMLHttpRequest();
                 xhr.ontimeout = function () {
                     console.error("The request for " + " timed out.");
                 };

                 var orders = [];


                 var link = TOKEN["EVX"];

                 console.log(link);
                 //xhr.open("GET", 'https://cache.etherdelta.com/nonce/' + link, false);
                 xhr.open("")
                 xhr.onload = await function(response) {
                   if (xhr.readyState === 4) {
                     if (xhr.status === 200) {
                       var dataResponse1 = JSON.parse(xhr.responseText);
                       //console.log(dataResponse1);
                       //console.log(xhr.responseText);
                       //console.log(dataResponse1.buys[0].price, ", ", dataResponse1.buys[0].amount);
                       var result = dataResponse1.buys[0].price + ", " + dataResponse1.buys[0].amount;
                       console.log(result);
                       console.log("====");
                       return result;
                       //return dataResponse1;
                     } else {
                         console.error(xhr.statusText);
                     }
                   }
                 };
                 xhr.send(null);
           } catch (error) {
                 console.log("Error :" + error); //Throws error
             return null;
           }
     }

     ==================
        Obsolete properties
     =====================

     data = await bittrex.getmarketsummaries( function( data, err ) {
             if (err) {
               return console.error(err);
             }
             for( var i in data.result ) {
               bittrex.getticker( { market : data.result[i].MarketName }, function( ticker ) {
                 console.log( ticker );
               });
             }
           });


    const TOKEN = {
      AVT: "983677e33d3420776b14e2226a5dfd3fd7900a62b6fb648879797cfd4040721e/orders/0x0d88ed6e74bbfd96b831231638b66c05571e824f/0",
      EVX: "1f69737fdb7c130ae81bee716dc70d686f9f2bfb4712a1b9cc5ac5c9bc4def72/orders/0xf3db5fa2c66b7af3eb0c0b782510816cbe4813b8/0",
      COSS: "784291f69b6c2e314fd952f103aea37fdb5150494cc83b1fd51c09696b80c21f/orders/0x65292eeadf1426cd2df1c4793a3d7519f253913b/0",
      OMG: "8ab5add6018edf01f0ef037b28e28c60ac41fef76f306cbbd565dffdb51a7488/orders/0xd26114cd6ee289accf82350c8d8487fedb8a0c07/0"
    };

    const MARKET = {
      POLONIEX: "",
      BITTREX: "",
      LIQUI: "",
      BINANCE: "",
      CRYPTOPIA: "",
      ETHERDELTA: ""
    };

    await new Promise((resolve, reject) => {
       binance.bookTickers(
        async function(ticker) {
          string1 = ticker[coin + 'ETH'].bid + "=" + ticker[coin + 'ETH'].bids;
          //console.log(string1.substr(0,string1.indexOf('=')));
          results[0]=string1.substr(0,string1.indexOf('='));
          results[1]=string1.substr(string1.indexOf('=')+1);
          resolve();
        }
      );
    });
     */
