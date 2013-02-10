

var jsbarcode = require('../main.js')

exports.testEAN = function(beforeExit, assert) {
  var barcode = new jsbarcode.EAN('9780199532179')
  assert.strictEqual(barcode.valid(), true)
  assert.strictEqual(barcode.encoded(), '10101110110001001010011100110010010111000101101010100111010000101101100110011010001001110100101')
}

exports.testCODE128 = function(beforeExit, assert) {
  var barcode = new jsbarcode.CODE128('0#%Ab')
  assert.strictEqual(barcode.valid(), true)
  assert.strictEqual(barcode.encoded(), "110100100001001110110010010011000100010011001010001100010010000110111100100101100011101011")
}

exports.testRendererValid = function(beforeExit, assert) {
  assert.strictEqual(new jsbarcode.renderer('AKALK2#$', {format:"CODE128"}).valid(), true)
  assert.strictEqual(new jsbarcode.renderer("\u20AC", {format:"CODE128"}).valid(), false)
  assert.strictEqual(new jsbarcode.renderer('9780199532179', {format:"EAN"}).valid(), true)
  assert.strictEqual(new jsbarcode.renderer('AKXK', {format:"EAN"}).valid(), false)
}

exports.testRendererLength = function(beforeExit, assert) {
  assert.strictEqual(new jsbarcode.renderer('AKALK2#$', {format:"CODE128"}).length(), 123)
  assert.strictEqual(new jsbarcode.renderer("\u20AC", {format:"CODE128"}).length(), 0)
  assert.strictEqual(new jsbarcode.renderer('9780199532179', {format:"EAN"}).length(), 95)
  assert.strictEqual(new jsbarcode.renderer('AKXK', {format:"EAN"}).length(), 0)
}

exports.testRendererRender = function(beforeExit, assert) {
  var ctx = { calls: [], fillRect: function(x,y,w,h) { this.calls.push(Array.prototype.slice.call(arguments)) } }

  assert.strictEqual(new jsbarcode.renderer('A', {format:"CODE128"}).render(ctx,0,0,66,1), undefined)
  assert.strictEqual(ctx.calls.length, 20)
  //  1101001000010100011000100010110001100011101011
  assert.eql(ctx.calls[0], [10,0,1,1])
  assert.eql(ctx.calls[1], [11,0,1,1])
  assert.eql(ctx.calls[2], [13,0,1,1])
  assert.eql(ctx.calls[3], [16,0,1,1])
  assert.eql(ctx.calls[17], [52,0,1,1])
  assert.eql(ctx.calls[18], [54,0,1,1])
  assert.eql(ctx.calls[19], [55,0,1,1])
}

exports.testRendererRenderWithSpecifiedQuietWidth = function(beforeExit, assert) {
  var ctx = { calls: [], fillRect: function(x,y,w,h) { this.calls.push(Array.prototype.slice.call(arguments)) } }

  assert.strictEqual(new jsbarcode.renderer('A', {format:"CODE128"}).render(ctx,0,0,46,1, 0), undefined)
  assert.strictEqual(ctx.calls.length, 20)
  //  1101001000010100011000100010110001100011101011
  assert.eql(ctx.calls[0], [0,0,1,1])
  assert.eql(ctx.calls[1], [1,0,1,1])
  assert.eql(ctx.calls[2], [3,0,1,1])
  assert.eql(ctx.calls[3], [6,0,1,1])
  assert.eql(ctx.calls[17], [42,0,1,1])
  assert.eql(ctx.calls[18], [44,0,1,1])
  assert.eql(ctx.calls[19], [45,0,1,1])
}
