var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var helpers = require('./helpers.js');

var filter = function() {
  var links = JSON.parse(fs.readFileSync('./recipes.txt', 'utf8'));

  var numReturned = 0;
  var finalRecipes = [];

  // iterate over links fetch html, and push to final results if good
  links.forEach(function(recipe) {

    request(recipe.link, function(e, r, html) {
      // if (e) { console.error('Error!', e); }

      if (html) {
        var keto = helpers.ketoRecipe(html);

        if (keto) {
          finalRecipes.push(recipe);
        } else {
        }

        numReturned++;
        console.log('found: ', finalRecipes.length, 'numReturned: ', numReturned, 'of ', links.length);

        if (numReturned === links.length) {
          console.log('done!');
          fs.writeFile('ketoRecipes.txt', JSON.stringify(finalRecipes), function(err) { console.error(err); });
        }
      }
    })
  });

};

filter();