var http = require('http')
var url = require('url')

var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  var urlProps = url.parse(req.url, true)
  var result
  try {
  	var d = new Date(urlProps.pathname.slice(1))
  	result = JSON.stringify({ unix: d.getTime(),
  	                natural: d.getNaturalDate() })
  } catch (err) {
  	result = JSON.stringify({ unix: null, natural: null})
  } 
  res.end(result)
})
server.listen(process.env.PORT)