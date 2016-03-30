function toNaturalString(date) {
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var nat = monthNames[date.getMonth()];
  nat += " " + date.getDate();
  nat += ", " + date.getFullYear();
  return nat;
}

function isValidDate(date) {
    return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
}

var http = require('http')
var url = require('url')

var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  
  // default to null value
  var result = JSON.stringify({ unix: null, natural: null})
  try {
    // get value from user (convert html spaces and other things)
    var urlProps = url.parse(req.url, true)
    var userVal = decodeURI(urlProps.pathname.slice(1))
    
    // parse date
    var d
    if (isNaN(userVal)) {
      d = new Date(userVal)
    } else {
      // number in ms so get ms
      d = new Date(1000 * userVal)
    }

    if (isValidDate(d)) {
  	  result = JSON.stringify({ unix: (d.getTime() / 1000),
  	                            natural: toNaturalString(d) })
    }
  } catch (err) {
    console.log(err)
  } 
  res.end(result)
})
server.listen(process.env.PORT)