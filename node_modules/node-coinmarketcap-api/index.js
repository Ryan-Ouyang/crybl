const request = require('request');

const cmc_url = 'https://api.coinmarketcap.com/v1/';
const currencies = ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'];

module.exports = class Coinmarketcap {

    constructor(options) { }

    ticker(currency, convert, limit) {
        return new Promise((resolve, reject) => {
            if (currency && typeof currency !== 'string') return reject(new Error('Invalid \'currency\' parameter.'));
            if (convert && (typeof convert !== 'string' || currencies.indexOf(convert.toUpperCase()) < 0)) return reject(new Error('Invalid \'convert\' parameter.'));
            if (limit && isNaN(limit)) return reject(new Error('Invalid \'limit\' parameter.'));
            var qs = {};
            if (convert) qs.convert = convert.toUpperCase();
            qs.limit = limit || 0;
            request.get({
                url: cmc_url + 'ticker/' + (currency ? currency : ''),
                qs: qs,
                json: true
            }, (err, resp, body) => {
                if (err) return reject(new Error('Can\'t reach coin market cap server.'));
                if (resp && resp.statusCode == 404) return reject(new Error('Currency id not found.'));
                if (!resp || resp.statusCode != 200) return reject(new Error('Invalid response from coin market cap server.'));
                return resolve(body);
            })
        });
    }

    global(convert) {
        return new Promise((resolve, reject) => {
            if (convert && (typeof convert !== 'string' || currencies.indexOf(convert.toUpperCase()) < 0)) return reject(new Error('Invalid \'convert\' parameter.'));
            var qs = {};
            if (convert) qs.convert = convert.toUpperCase();
            request.get({
                url: cmc_url + 'global/',
                qs: qs,
                json: true
            }, (err, resp, body) => {
                if (err) return reject(new Error('Can\'t reach coin market cap server.'));
                if (!resp || resp.statusCode != 200) return reject(new Error('Invalid response from coin market cap server.'));
                return resolve(body);
            })
        });
    }

    currencies() {
        return new Promise((resolve, reject) => {
            return resolve(currencies);
        });
    }

}