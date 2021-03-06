
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var imgService = require('./imagesService.js');
var quoteService = require('./quotesService.js');
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.images);
app.get('/images', routes.images);
app.get('/getimages', imgService.getImages);
app.get('/getimagestopics', imgService.getTopics);
app.get('/selectimage', imgService.selectImage);
app.get('/deselectimage', imgService.deSelectImage);

app.get('/quotes', routes.quotes);
app.get('/getquotes', quoteService.getQuotes);
app.get('/getquotestopics', quoteService.getTopics);
app.get('/selectquote', quoteService.selectQuote);
app.get('/deselectquote', quoteService.deSelectQuote);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
