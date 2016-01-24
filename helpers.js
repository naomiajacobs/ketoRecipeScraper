var includes = require('underscore.string/include');
var cheerio = require('cheerio');
var bad = [
  'flour',
  'bread',
  'sugar',
  'pasta',
  'potato',
  'nutella',
  'bean',
  'chickpea',
  'honey',
  'molasses',
  'apple',
  'orange',
];

var goodText = function(text) {
  for (var i = 0; i < bad.length; i++) {
    if (includes(text.toLowerCase(), bad[i])) {
      return false;
    }
  }
  return true;
};

var ketoRecipe = function(html) {
  var foundBadIngredient = false;
  var $ = cheerio.load(html);
  $('.entry > p').each(function() {
    var textTest = goodText($(this).text());
    if (!textTest) {
      foundBadIngredient = true;
    }
  });
  return !foundBadIngredient;
};


module.exports = {
  goodText,
  ketoRecipe,
}