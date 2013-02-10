

var jsbarcode = require('../main.js')

exports.testEAN = function(beforeExit, assert) {
  var barcode = new jsbarcode.EAN('9780199532179')
  assert.eql(barcode.valid(), true)
  assert.eql(barcode.encoded(), '10101110110001001010011100110010010111000101101010100111010000101101100110011010001001110100101')
}

exports.testCODE128 = function(beforeExit, assert) {
  var barcode = new jsbarcode.CODE128('0#%Ab')
  assert.eql(barcode.valid(), true)
  assert.eql(barcode.encoded(), "110100100001001110110010010011000100010011001010001100010010000110111100100101100011101011")
}
