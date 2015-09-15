beerStalker.controller('BeerStalkController', ['$scope', '$resource', function($scope, $resource) {

  var self = this;

  $scope.search = function() {
    var searchResource = $resource('https://api.meetup.com/2/open_events.json?and_text=true&:text&:country&:city&:key&:text_format', {
        text_format: "text_format=plain",
        text: "text=free+beer",
        country: "country=gb",
        city: "city=" + $scope.cityName,
        key: 'key=646f252216306e6d712d7c536a3c2565',
        callback: 'JSON_CALLBACK' },
        { get: { method: 'JSONP'} });

      searchResource.get().$promise.then(function(response){
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
          $scope.searchResult = filteredResults
        }
      });
    };
}]);