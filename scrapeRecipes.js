var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var url = 'http://smittenkitchen.com/recipes/';
var goodText = require('./helpers').goodText;

var scrapeRecipes = function() {
  request(url, function(error, response, html) {
    // if (error) { console.error('Error!', error); }
    var $ = cheerio.load(html);
    var linkObj = {};

    // grab all links and remove dups by storing in obj
    $('.lcp_catlist > li > a').each(function() {
      var el = $(this);
      var title = el.text();
      var link = el.attr('href');
      linkObj[title] = {title: title, link: link};
    });
    // turn into array for easier traversal
    var links = [];
    for (var recipe in linkObj) {
      var rec = linkObj[recipe];
      // only push ones with good titles
      if (goodText(rec.title)) { links.push(rec) }
    }

    fs.writeFile('recipes.txt', JSON.stringify(links), function(err) { console.log(err); });
  });
};

scrapeRecipes();