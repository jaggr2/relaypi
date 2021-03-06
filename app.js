
/**
 * Module dependencies.
 */

var express = require('express');
var relay = require('./routes/relay');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', relay.index);
app.get('/relays', relay.list);
app.post('/relays', relay.change);

http.createServer(app).listen(app.get('port'), function(){
  console.log('HTTP-Server listening on port ' + app.get('port'));
});
