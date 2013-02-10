;(function(exports){

  function exportEncoder(module, name) {
    if (require && !exports[name]) exports[name] = require(module)[name]
  }

  exportEncoder('./EAN_UPC.js', 'EAN')
  exportEncoder('./EAN_UPC.js', 'UPC')
  exportEncoder('./CODE128.js', 'CODE128')

})(typeof exports === 'undefined' ? this['JsBarcode']=(this['JsBarcode'] || {}) : exports)
;
