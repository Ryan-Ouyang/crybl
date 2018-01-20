Node CoinMarketCap
===========

NodeJS Client Library for the CoinMarketCap (https://coinmarketcap.com) API

This is an asynchronous node.js client for the CoinMarketCap API. It exposes all the API methods found here: https://coinmarketcap.com/api 

## Installation

`npm i node-coinmarketcap-api`

## Methods

#### ticker (currency, convert, limit)
return an array of currencies.
* `currency`: (optional) target a specific currency by id
* `convert`: (optional) return 24h volume, and market cap in terms of another currency (available currencies with 'currencies()' method)
* `limit`: (optional) limit result number (order by rank)

#### global (convert)
return an object of current market data.
* `convert`: (optional) return 24h volume, and market cap in terms of another currency (available currencies with 'currencies()' method)

#### currencies ()
return an array with all available currencies for 'convert' parameter.

## Example usage

```javascript
const Coinmarketcap = require('node-coinmarketcap-api');
const coinmarketcap = new Coinmarketcap();

(async () => {
    let bitcoin_price = await coinmarketcap.ticker('bitcoin', 'EUR');
    console.log(bitcoin_price);
    // [
    //     { 
    //         id: 'bitcoin',
    //         name: 'Bitcoin',
    //         symbol: 'BTC',
    //         rank: '1',
    //         price_usd: '3946.58',
    //         price_btc: '1.0',
    //         '24h_volume_usd': '2371570000.0',
    //         market_cap_usd: '65368191185.0',
    //         available_supply: '16563250.0',
    //         total_supply: '16563250.0',
    //         percent_change_1h: '1.81',
    //         percent_change_24h: '-5.28',
    //         percent_change_7d: '-13.5',
    //         last_updated: '1505324670',
    //         price_eur: '3293.06976438',
    //         '24h_volume_eur': '1978864095.27',
    //         market_cap_eur: '54543937775.0'
    //     }
    // ] 

    let top_two = await coinmarketcap.ticker(null, 'CAD', 2);
    console.log(top_two);
    // [
    //     { 
    //         id: 'bitcoin',
    //         name: 'Bitcoin',
    //         symbol: 'BTC',
    //         rank: '1',
    //         price_usd: '3943.01',
    //         price_btc: '1.0',
    //         '24h_volume_usd': '2377900000.0',
    //         market_cap_usd: '65309060383.0',
    //         available_supply: '16563250.0',
    //         total_supply: '16563250.0',
    //         percent_change_1h: '0.66',
    //         percent_change_24h: '-5.25',
    //         percent_change_7d: '-13.59',
    //         last_updated: '1505325274',
    //         price_cad: '4787.79200648',
    //         '24h_volume_cad': '2887360319.2',
    //         market_cap_cad: '79301395951.0'
    //     },
    //     { 
    //         id: 'ethereum',
    //         name: 'Ethereum',
    //         symbol: 'ETH',
    //         rank: '2',
    //         price_usd: '276.843',
    //         price_btc: '0.0701555',
    //         '24h_volume_usd': '967705000.0',
    //         market_cap_usd: '26189023989.0',
    //         available_supply: '94598830.0',
    //         total_supply: '94598830.0',
    //         percent_change_1h: '1.08',
    //         percent_change_24h: '-4.84',
    //         percent_change_7d: '-16.05',
    //         last_updated: '1505325270',
    //         price_cad: '336.156059064',
    //         '24h_volume_cad': '1175033860.84',
    //         market_cap_cad: '31799970000.0'
    //     }
    // ]

    let global_market = awaitcoinmarketcap.global();
    console.log(global_market);
    // { 
    //     total_market_cap_usd: 137745373945,
    //     total_24h_volume_usd: 5725916824,
    //     bitcoin_percentage_of_market_cap: 47.52,
    //     active_currencies: 866,
    //     active_assets: 242,
    //     active_markets: 5479
    // }

    let available_currencies = await coinmarketcap.currencies();
    console.log(available_currencies);
    // ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR']
})();
```

BTC donation address: `3FopcPnDHXcR83qyMUyt5gE9u3WXkxgVUs` <br>
ETH donation address: `0xF90150a16b2Faee858426f23bbC76AF5BD88503a`