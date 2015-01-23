(function(){
  // safe mode
  'use strict';


  // name corresponds to the template name (e.g. beagleResults)
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

  $(document).ready(function(){ // runs the function on document ready
    var $list = $('#beagle'); // targets div with id beagle in the html

    results.forEach(function(item){ // for each item in results (references var results)
      // renderTemplate references function renderTemplate above (link 5)
      var beagleItems = renderTemplate('beagleResults',{ //beagleResults is the name of the template in the html file I want to render
        itemUrl: item.url,
        itemImage: item.Images[0].url_170x135,
        itemTitle: item.title,
        itemShopUrl: item.Shop.url,
        itemPrice: item.price,
        itemCurrency: item.currency_code
      });
      $list.append(beagleItems); // beagleItems is set at the start of the forEach function
    });
  });

  // THE ORIGINAL JAVASCRIPT COMMENTED OUT; NOW RENDERED THROUGH A TEMPLATE
  // $('#beagle').append(
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
