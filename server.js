var express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var app = express();

app.get('/scrape', function(req, res) {
  var url = 'http://smittenkitchen.com/recipes/';
  console.log('here, about to fetch');

  request(url, function(error, response, html) {
    if (error) { console.error(error); }
    else {
      var $ = cheerio.load(html);
      var json = {recipeTitle: '', link: ''};

      var links = {};

      $('.lcp_catlist > li > a').each(function() {
        var el = $(this);
        var title = el.text();
        var link = el.attr('href');
        links[title] = {title: title, link: link};
      });

      res.status(200).send(links);
    }

  });

});

app.listen(1754);
console.log('listening on 1754');
module.exports = app;