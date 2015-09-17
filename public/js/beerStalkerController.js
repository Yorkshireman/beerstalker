beerStalker.factory('ApiCall', function($resource) {
  return {
    customSearch: function(cityName) {
      var meetupUrl = 'https://api.meetup.com/2/open_events.json?and_text=true&:text&:country&:city&:key&:text_format&:order'
      
      var searchForEvents = $resource(
        meetupUrl, 
        {
          text_format: "text_format=plain",
          text: "text=free+beer",
          country: "country=gb",
          city: "city=" + cityName,
          key: 'key=646f252216306e6d712d7c536a3c2565',
          order: "order=distance",
          callback: 'JSON_CALLBACK' 
        },
        { get: { method: 'JSONP'} }
      );

      //nothing gets returned from this function unless you have the 'return' on line 21
      //the other return further down is only within the scope of that function, not this function.
      return searchForEvents.get().$promise.then(function(response){
        var filteredResults = [];
        for (index = 0; index < response.results.length; index++) {
          var result = response.results[index].description;

          try {
            result.indexOf('free beer')
          }
          catch(err) {
            $('#error-div').fadeIn(500).delay(8000).fadeOut(1000);
            break;
          }

          if(result.indexOf('free beer') >= 0) {
            filteredResults.push(response.results[index]);
          }
        }

        if(filteredResults.length === 0) {
          $('.results').hide();
          $('#no-results-div').fadeIn(500).delay(8000).fadeOut(1000);
          return
        } else {
          $('.results').show();
          return filteredResults
        }
      });
    },

    autoSearch: function(lat, lon) {
      var meetupUrl = 'https://api.meetup.com/2/open_events.json?and_text=true&:text&:lat&:lon&:key&:text_format&:order'
      
      var searchForEvents = $resource(
        meetupUrl, 
        {
          text_format: "text_format=plain",
          text: "text=free+beer",
          lat: 'lat=' + lat,
          lon: 'lon=' + lon,
          key: 'key=646f252216306e6d712d7c536a3c2565',
          order: "order=distance",
          callback: 'JSON_CALLBACK' 
        },
          { get: { method: 'JSONP'} });

      //$promise syntax is not always necessary (not sure why it's needed here), but the
      //return value of the searchForEvents.get() is passed into the next function as an argument -
      //in this case 'response' - you can call it whatever you want.
      //'return' is needed here because line 116 is also a promise (indicated by the .then), so a return value
      //is needed. This is then passed into the 'function(results)' bit as an argument (called 'results' but, again,
      // it could have been called whatever I liked). Then, finally (kind of backwards chronologically), the
      //'customSearch' function is called in the view with 'customSearch()'
      //also note that a 'return' on line 100 is needed, because autoSearch needs one?
      return searchForEvents.get().$promise.then(function(response){
        var filteredResults = [];

        for (index = 0; index < response.results.length; index++) {
          var result = response.results[index].description;

          try {
            result.indexOf('free beer')
          }
          catch(err) {
            $('#error_div').fadeIn(500).delay(8000).fadeOut(1000);
            break;
          }

          if(result.indexOf('free beer') >= 0) {
            filteredResults.push(response.results[index]);
          }
        }

        if(filteredResults.length === 0) {
          $('.results').hide();
          $('#no_results_div').fadeIn(500).delay(8000).fadeOut(1000);
          return
        } else {
          $('.results').show();
          return filteredResults
        }
      });
    }
  }
});

beerStalker.controller('BeerStalkController', ['$scope', '$resource', 'ApiCall', function($scope, $resource, ApiCall) {
  var lat
  var lon

  navigator.geolocation.getCurrentPosition(function(position) {
   lat = position.coords.latitude;
   lon = position.coords.longitude;
  });

  $scope.customSearch = function() { ApiCall.customSearch($scope.cityName).then(function(results){
    $scope.searchResult = results
  }); };


  $scope.autoSearch = function() { ApiCall.autoSearch(lat, lon).then(function(results){
    $scope.searchResult = results
  }); };
}]);
