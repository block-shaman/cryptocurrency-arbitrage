//
// let boilerPlateMarket =
// {
//     marketName: '',
//     URL: '', //URL To Fetch API From.
//     toBTCURL: false, //URL, if needed for an external bitcoin price api.
//     last: function (data, coin_prices) { //Get the last price of coins in JSON data
//         return new Promise(function (res, rej) {
//             try {
//                 for (x in / of data) {
//                     price = ...;
//                     coin_prices[coinName][marketName] = price;
//                 }
//                 res(coin_prices);
//             }
//             catch (err) {
//                 rej(err);
//             }
//
//         })
//     },
//
//
// }

let markets = [

    // {
    //     marketName: 'cryptowatchAPI',
    //     URL: 'https://api.cryptowat.ch/markets/summaries', //URL To Fetch API From.
    //     toBTCURL: false, //URL, if needed for an external bitcoin price api.
    //
    //     last: function (data, coin_prices, toBTCURL) { //Where to find the last price of coin in JSON data
    //         return new Promise(function (res, rej) {
    //             try {
    //                 data = data.result;
    //                 for (let key in data) {
    //                     let marketPair = key.split(':');
    //                     let market = marketPair[0], pair = marketPair[1];
    //                     let indexOfBTC = pair.indexOf('btc');
    //                     if (indexOfBTC > 0 && !pair.includes('future') && !market.includes('qryptos') && !market.includes('quoine') && !market.includes('poloniex')) {
    //                         if(marketNames.indexOf(market) === -1 ){
    //                             marketNames.push([[market], ['']]);
    //                             console.log(marketNames);
    //                         }
    //                         let coin = pair.replace(/btc/i, '').toUpperCase();
    //                         let price = data[key].price.last;
    //                         if(price > 0) {
    //                             if (!coin_prices[coin]) coin_prices[coin] = {};
    //                             coin_prices[coin][market] = price;
    //
    //                         }
    //                     }
    //                 }
    //                 res(coin_prices);
    //             }
    //             catch (err) {
    //                 console.log(err);
    //                 rej(err)
    //             }
    //         })
    //     }
    //
    // },
    {
        marketName: 'bittrex',
        URL: 'https://bittrex.com/api/v1.1/public/getmarketsummaries',
        toBTCURL: false,
        pairURL : '',
        last: function (data, coin_prices) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
                    for (let obj of data.result) {
                        if(obj["MarketName"].includes('ETH-') && !obj["MarketName"].includes('BTS')) {
                            let coinName = obj["MarketName"].replace("ETH-", '');
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].bittrex = obj.Last;
                        }
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },

    },{
        marketName: 'binance',
        URL: 'https://binance.com/api/v1/ticker/allPrices',
        toBTCURL: false,
        pairURL : '',
        last: function (data, coin_prices) { //Where to find the last price of coin in JSON data

            return new Promise(function (res, rej) {

                try {



                  for (let obj of data) {

                        if(!obj["symbol"].includes('LRC') && !obj["symbol"].includes('ZEC')) {

                            let coinName = obj["symbol"].replace("ETH", '');

                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].binance = obj.price;
                        }
                      /*  if(obj["symbol"].includes('ETH')) {
                            let coinName = obj["symbol"].replace("ETH", '');
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].bittrex = obj.Last;
                        } */
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },

    },/*
    {
        marketName: 'kucoin',
        URL: 'https://api.kucoin.com/v1/open/tick',
        toBTCURL: false,
        pairURL : '',
        last: function (data, coin_prices) { //Where to find the last price of coin in JSON data

            return new Promise(function (res, rej) {

                try {
                  //console.log("===kucoin===");
                  //console.log(data);
                  //console.log(data[0]);
                  //console.log(coin_prices);

                  for (var obj in data) {
                        if(!obj["symbol"].includes('LRC') && !obj["symbol"].includes('ZEC')) {
                            let coinName = obj["symbol"].replace("-ETH", '');
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].binance = obj.price;
                        }
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },

    },*/
    {
        marketName: 'liqui',
        URL: 'https://api.liqui.io/api/3/ticker/eth_btc-ven_btc-salt_btc-snm_btc-bmc_btc-bat_btc-knc_btc-stx_btc-dnt_btc-gnt_btc-trx_btc-ae_btc-zrx_btc-mgo_btc-tnt_btc-ltc_btc-adx_btc-mana_btc-1st_btc-edg_btc-vsl_btc-taas_btc-sngls_btc-myst_btc-xid_btc-snt_btc-ant_btc-gup_btc-icn_btc-wings_btc-omg_btc-eos_btc-oax_btc-dash_btc-ptoy_btc-mco_btc-tkn_btc-waves_btc-trst_btc-bcc_btc-storj_btc-pro_btc-pay_btc-rlc_btc-cfi_btc-plu_btc-qrl_btc-bnt_btc-gno_btc-san_btc-time_btc-mln_btc-cvc_btc-lun_btc-net_btc-dgd_btc-rep_btc-hmq_btc-qtum_btc-ind_btc-bcap_btc-round_btc-incnt_btc',
        toBTCURL: false,
        pairURL : '',
        last: function (data, coin_prices) { //Where to find the last price of coin in JSON data

            return new Promise(function (res, rej) {

                try {


                  for (var obj in data) {
                    //console.log(data);
                      if(!obj.includes('_btc')&&obj!=="incnt_eth"&&obj!=="qtum_eth") {
                            let priceCoin = data[obj].last;
                            let coinName = obj.replace("_eth", '').toUpperCase();
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].liqui = priceCoin;
                          }
                      /*  if(obj["symbol"].includes('ETH')) {
                            let coinName = obj["symbol"].replace("ETH", '');
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].bittrex = obj.Last;
                        } */
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },

    },




    {
        marketName: 'poloniex',
        URL: 'https://poloniex.com/public?command=returnTicker',
        toBTCURL: false,
        pairURL : '',
        last: function (data, coin_prices) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
                    for (var obj in data) {
                        if(obj.includes('ETH_')&&obj!=="ETH_EMC2"&&obj!=="ETH_XVC") {
                            let coinName = obj.replace("ETH_", '');
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].poloniex = data[obj].last;
                        }
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },

    },
/*
    {

          marketName: 'etherdelta', // kraken has no one size fits all market summery so each pair has to be entered as param in GET - will need to add new coins as they are added to exchange
          URL: 'https://api.etherdelta.com/returnTicker', //URL To Fetch API From.
          toBTCURL: false, //URL, if needed for an external bitcoin price api.
          pairURL : '',
          last: function (data, coin_prices) { //Where to find the last price of coin in JSON data
              return new Promise(function (res, rej) {
                  try {
                      for (var obj in data) {
                          if(obj.includes('ETH_') && !obj.includes('BTG')) {
                              let coinName = obj.replace("ETH_", '');
                              if (!coin_prices[coinName]) coin_prices[coinName] = {};
                              //console.log(coinName);
                              //console.log("Price:" + data[obj].last.toFixed(9).toString());
                              coin_prices[coinName].etherdelta = data[obj].last;
                          }
                      }
                      res(coin_prices);
                  }
                  catch (err) {
                      console.log(err);
                      rej(err);
                  }


              })
          },
      },

    {
		marketName: 'cryptopia',
		URL: 'https://www.cryptopia.co.nz/api/GetMarkets/BTC', //URL To Fetch API From.
		toBTCURL: false, //URL, if needed for an external bitcoin price api.
        pairURL : '',
        last: function (data, coin_prices) { //Get the last price of coins in JSON data
			return new Promise(function (res, rej) {
				try {
					for (let obj of data.Data) {
						if(obj["Label"].includes('/BTC')) {
							let coinName = obj["Label"].replace("/BTC", '');
							if (!coin_prices[coinName]) coin_prices[coinName] = {};
							coin_prices[coinName].cryptopia = obj.LastPrice;
                        }
                    }
                    res(coin_prices);

                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
		},
	},


	{

        marketName: 'kraken', // kraken has no one size fits all market summery so each pair has to be entered as param in GET - will need to add new coins as they are added to exchange
        URL: 'https://api.kraken.com/0/public/Ticker?pair=DASHXBT,EOSXBT,GNOXBT,ETCXBT,ETHXBT,ICNXBT,LTCXBT,MLNXBT,REPXBT,XDGXBT,XLMXBT,XMRXBT,XRPXBT,ZECXBT', //URL To Fetch API From.
        toBTCURL: false, //URL, if needed for an external bitcoin price api.
        pairURL : '',
        last: function (data, coin_prices) { //Get the last price of coins in JSON data
            return new Promise(function (res, rej) {
                try {
                    for (let key in data.result) {
                        let arr = key.match(/DASH|EOS|GNO|ETC|ETH|ICN|LTC|MLN|REP|XDG|XLM|XMR|XRP|ZEC/); // matching real names to weird kraken api coin pairs like "XETCXXBT" etc
                        let name = key;
                        let matchedName = arr[0];
                        if (matchedName === "XDG") { //kraken calls DOGE "XDG" for whatever reason
                            let matchedName = "DOGE";
                            var coinName = matchedName;
                        } else {
                            var coinName = matchedName;
                        }

                        if (!coin_prices[coinName]) coin_prices[coinName] = {};

                        coin_prices[coinName].kraken = data.result[name].c[0];

                    }
                    res(coin_prices);

                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },
    },
    */

];

let marketNames = [];
for(let i = 0; i < markets.length; i++) { // Loop except cryptowatch
    marketNames.push([[markets[i].marketName], [markets[i].pairURL]]);
}
console.log("Markets:", marketNames);
module.exports = function () {
    this.markets = markets;
    this.marketNames = marketNames;
};
