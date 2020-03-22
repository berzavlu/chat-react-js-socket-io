var fs = require('fs')
var request = require('request')

var saveImage = function(uri, dir, filename, callback) {
  var path = dir + filename
  request.head(uri, function() {
    request(uri)
      .pipe(fs.createWriteStream(path))
      .on('close', callback)
  })
}

module.exports = saveImage
