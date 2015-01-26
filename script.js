(function() {
  // safe mode
  'use strict';

  // name corresponds to the template name (e.g. searchResults)
  function renderTemplate(name, data) {
    var $template = $('[data-template-name=' + name + ']').text();
    $.each(data, function(prop, value) {
      // for each beesting (e.g. <% itemUrl %>) in the html, replace it with the given value (e.g. item.url)
      // this is what tells the forEach function below to replace <% itemUrl %> with item.url value
      $template = $template.replace('<% ' + prop + ' %>', value);
    });
    return $template;
  }

  // references var beagle in data.js
  var results = beagle.results;
  var $list = $('#container'); // targets div with id container in the html

  $(document).ready(function() { // runs the function on document ready
    // var $list = $('#container'); // targets div with id container in the html

    filter(results);

    // results.forEach(function(item) { // for each item in results (references var results)
    //   // renderTemplate references function renderTemplate above (line 6)
    //   var searchItems = renderTemplate('searchResults', { //searchResults is the name of the template in the html file I want to render
    //     itemUrl: item.url,
    //     itemImage: item.Images[0].url_170x135,
    //     itemTitle: item.title,
    //     itemShopUrl: item.Shop.url,
    //     itemPrice: item.price,
    //     itemCurrency: item.currency_code
    //   });
    //   $list.append(searchItems); // searchItems is set at the start of the forEach function
    // });
  });

  // updates list based on filter selection
  $('#results-filter').on('change', function(event) { // runs the function when the select option changes
    if ($('#results-filter option:selected').text() === 'Lowest Price') {

      var sortedResults = _.sortBy(results, function(item) { // sorts the results by price in ascending order
        return Number(item.price);
      });

      filter(sortedResults);

    } else if ($('#results-filter option:selected').text() === 'Highest Price') {
      var sortedResults = _.sortBy(results, function(item) { // sorts the results by price in descending order
        return Number(item.price);
      }).reverse();

      // passes sortedResults to function filter
      filter(sortedResults);

    } else if ($('#results-filter option:selected').text() === 'Relevancy') {
      results = beagle.results;
      filter(results);
    }
  });

  function filter(results) {
    // $('#container').empty(); // targets div with id container in the html
    // var $list = $('#container');
    $list.empty();

    results.forEach(function(item) { // for each item in sortResults
      // renderTemplate references function renderTemplate above (line 6)
      var searchItems = renderTemplate('searchResults', { //searchResults is the name of the template in the html file I want to render
        itemUrl: item.url,
        itemImage: item.Images[0].url_170x135,
        itemTitle: item.title,
        itemShopUrl: item.Shop.url,
        itemPrice: item.price,
        itemCurrency: item.currency_code
      });
      $list.append(searchItems); // searchItems is set at the start of the forEach function
    });

  }

  // THE ORIGINAL JAVASCRIPT COMMENTED OUT; NOW RENDERED THROUGH A TEMPLATE
  // $('#container').append(
  //   '<div class="container">'+
  //   '<div>'+
  //   '<a class="image_link" href="'+
  //   item.url+
  //   '">'+
  //   '<img class="image" src="'+
  //   item.Images[0].url_170x135+
  //   '"/>'+
  //   '</a>'+
  //   '</div>'+
  //
  //   '<div class="title">'+
  //   '<a class="title_link" href="'+
  //   item.url+
  //   '">'+
  //   item.title+
  //   '</a>'+
  //   '</div>'+
  //
  //   '<div class="shop_name">'+
  //   '<a class="shop_link" href="'+
  //   item.Shop.url+
  //   '">'+
  //   item.Shop.shop_name+
  //   '</a>'+
  //   '</div>'+
  //
  //   '<div class="price">'+
  //   '$'+item.price+' '+item.currency_code+
  //   '</div>'+
  //   '</div>'
  //   );

})();
