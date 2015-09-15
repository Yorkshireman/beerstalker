beerStalker.controller('BeerStalkController', ['$scope', '$resource', function($scope, $resource) {

  var self = this;

  $scope.search = function() {
    var searchResource = $resource('https://api.meetup.com/2/open_events.json?and_text=true&:text&:country&:city&:key', {
        text: "text=free+beer",
        country: "country=gb",
        city: "city=" + $scope.cityName,
        key: 'key=646f252216306e6d712d7c536a3c2565',
        callback: 'JSON_CALLBACK' },
        { get: { method: 'JSONP'} });
        
      searchResource.get().$promise.then(function(response){
          $scope.searchResult = response.results;
          console.log($scope.searchResult[0].visibility)
      });
    };
}]);
