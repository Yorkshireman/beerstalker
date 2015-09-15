beerStalker.controller('BeerStalkController',['$scope', '$resource', function($scope, $resource) {

  var self = this;
  // var searchResource = $resource('https://api.meetup.com/2/open_events.json?:text&:key')

  // self.searchResult = searchResource.get(
  //   {text: "text=beer",
  //    key: 'key=646f252216306e6d712d7c536a3c2565'}
  //   );

  var searchResource = $resource('https://api.meetup.com/2/open_events.json?:text&:key',
    {text: "text=free+beer", key: 'key=646f252216306e6d712d7c536a3c2565', callback:'JSON_CALLBACK'}, {get:{method:'JSONP'}})

  $scope.search = function() {
      searchResource.get().$promise.then(function(response){
          $scope.searchResult = response.results;
          console.log($scope.searchResult[0].visibility)
      });
    };
}]);
