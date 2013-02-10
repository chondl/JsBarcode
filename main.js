;(function(exports){

  var encoders = {}

  function exportEncoder(module, name) {
    if (require && !exports[name]) encoders[name] = exports[name] = require(module)[name]
  }

  exportEncoder('./EAN_UPC.js', 'EAN')
  exportEncoder('./EAN_UPC.js', 'UPC')
  exportEncoder('./CODE128.js', 'CODE128')

  exports.renderer = function(content, options) {
    var encoder = encoders[options.format] && new encoders[options.format](content);

    this._content = content;
    this._options = options;
		this._valid = !!encoder && encoder.valid();
    this._encoded = this._valid && encoder.encoded();

    this.valid = function() {
      return this._valid;
    }
    
    this.length = function() {
      return this._encoded ? this._encoded.length : 0
    }

    this.width = function(barWidth, quietWidth) {
      return this.length() * barWidth + 2 * quietWidth
    }

    this.render = function(ctx,x,y,w,h,quiet) {
      var length = this.length(),
          encoded = this._encoded,
          quietWidth = quiet === undefined ? (10*w)/(length+20) : quiet,  
          renderWidth = w - 2*quietWidth,
          barWidth = renderWidth/length,
          i, x

		  for(i=0;i<length;i++){
		  	if(encoded[i] == "1"){
		    	ctx.fillRect((i/length)*renderWidth+quietWidth,y,barWidth,h);
		  	}
		  }

    }

    return this
  }

})(typeof exports === 'undefined' ? this['JsBarcode']=(this['JsBarcode'] || {}) : exports)
;
