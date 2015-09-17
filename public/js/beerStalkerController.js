beerStalker.controller('BeerStalkController', ['$scope', '$resource', 'ApiCall', 'GeoLocation', function($scope, $resource, ApiCall, GeoLocation) {

  $scope.autoSearch = function() {
    $.when(GeoLocation.getLocation()).then(function(data, textStatus, jqXHR) {
      return [data.coords.longitude, data.coords.latitude];
    }).then(function(location) {
      ApiCall.autoSearch(location[1], location[0]).then(function(results){
        $scope.searchResult = results
      });
    }); 
  };

  $scope.customSearch = function() { 
    ApiCall.customSearch($scope.cityName).then(function(results){
      $scope.searchResult = results
    });
  };
}]);