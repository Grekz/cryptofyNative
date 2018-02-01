const axios = require("axios");

const Methods = {
  ticker24hr: {
    name: 'ticker/24hr',
    version: 'v1',
    verb: 'GET',
    signed: false,
    parameters: {
        symbol: {
            isMandatory: true,
            type: 'STRING',
            desciption: null
        }
    },
    desciption: '24 hour price change statistics.'
  },
  allPricesTickers: {
      name: 'ticker/allPrices',
      version: 'v1',
      verb: 'GET',
      signed: false,
      parameters: null,
      desciption: 'Latest price for all symbols.',
      fCallback: function(responseJson) {
        let aUsdtCurrencies = [];
        responseJson.data.forEach(function(element, index) {
          if(element.symbol.indexOf('USDT') > 0) {
            // console.warn('element: ' + element.symbol + ' price: ' + element.price + ' index: ' + index);
            aUsdtCurrencies.push(element);
          }
        });
        console.warn(aUsdtCurrencies);
        return aUsdtCurrencies;
      }
  }
};

export default class BinanceRequest {
  /**
   * Set the config variable
   * @param {*} configs config object should have these keys APIKey,secretKey
   */
  constructor(configs) {
    this._configs = configs;
    if (!this._configs.endPointUrl) {
        this._configs.endPointUrl = 'https://www.binance.com/api/';
    }
    if (!this._configs.wsEndPointUrl) {
        this._configs.wsEndPointUrl = 'wss://stream.binance.com:9443/ws/';
    }
  }

  /**
   * Creates the rest call object
   *
   * @param {Object} args Arguments.
   * @param {Method} method 
   * @returns {Object}  Object represrents Rest call headers and url
   * @private
   */
  _constructRequest(args, method) {

    let reqHeaders = {};

    if (method.apikey) {
        reqHeaders["X-MBX-APIKEY"] = "5o9jeWDzI4WE3kYTYQdzWF4w8fvo0iKza6JN9U8VrFumOb8Cl9uHRH7gl4jrmFiD";
    }

    let restObj = {
        method: method.verb,
        headers: reqHeaders,
        url: this._configs.endPointUrl + 'v1' + '/' + method.name
    };

    // if (!this._isEmpty(args)) {
    //     restObj.data = args;
    // }

    if (method.signed) {
        if (typeof restObj.data === 'undefined') restObj.data = {};
        restObj.data['signature'] = this.signature(args);
    }
    return restObj;
  }

  /**
  * Function to initiate the API call from the methods object
  *
  * @param {Object} args Name of the event.
  * @param {Method} method Name of the event.
  * @returns {Object}  Object represrents Rest call headers
  * @private
  */
  _methodCall(method, args, fCallback) {
    console.warn(method);
    if (typeof args === 'undefined') {
        args = {};
    }
    return axios(this._constructRequest(args, method))
      .then((responseJson) => {
          if(typeof fCallback === 'function') {
            console.warn(fCallback);
            return fCallback(responseJson);
          } else {
            return responseJson.data;
          }

      })
      .catch((error) => {
          throw error;
      });
  }

  /**
   * Latest price for all symbols.
   *
   * @returns {Promise<ResponseJson>} Array of objects [{...},{...},{....}] if its success
   * @public
   */
  allPricesTickers() {
    return this._methodCall(Methods.allPricesTickers, {}, Methods.allPricesTickers.fCallback);
  }
}