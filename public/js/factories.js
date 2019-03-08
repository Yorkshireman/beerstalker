beerStalker.factory('ApiCall', function($resource) {
  return {
    getApiKey: function() {
      var keyUrl = '/apiKey';

      var apiKey = $resource(
        keyUrl, { }
      );

      return apiKey.get().$promise.then(function(result) {
        console.log('typeof result: ', typeof result);
        return result.toJSON().apiKey;
      });
    },

    customSearch: async function(cityName) {
      var apiKey = await this.getApiKey();
      console.log('apiKey: ', apiKey);
      var meetupUrl = 'https://api.meetup.com/2/open_events.json?and_text=true&:text&:country&:city&:key&:text_format&:order'

      var searchForEvents = $resource(
        meetupUrl,
        {
          text_format: "text_format=plain",
          text: "text=free+beer",
          country: "country=gb",
          city: "city=" + cityName,
          key: `key=${apiKey}`,
          order: "order=distance",
          callback: 'JSON_CALLBACK'
        },
        { get: { method: 'JSONP'} }
      );

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
          $('#no-results-div').fadeIn(500).delay(5000).fadeOut(1000);
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

      return searchForEvents.get().$promise.then(function(response){
        var filteredResults = [];

        for (index = 0; index < response.results.length; index++) {
          var result = response.results[index].description;

          try {
            result.indexOf('free beer')
          }
          catch(err) {
            $('#error_div').fadeIn(500).delay(5000).fadeOut(1000);
            break;
          }

          if(result.indexOf('free beer') >= 0) {
            filteredResults.push(response.results[index]);
          }
        }

        if(filteredResults.length === 0) {
          $('.results').hide();

          $('#no-results-div').fadeIn(500).delay(6000).fadeOut(1000);
          return
        } else {
          $('.results').show();
          return filteredResults
        }
      });
    }
  }
});

beerStalker.factory('GeoLocation', function() {
  return {
    getLocation: function() {

      var deferred = $.Deferred();

      if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(deferred.resolve, this.geoLocationError, {
          timeout: 5000
        });

      } else {
        alert('Your browser does not support Geo Location.');
      }
      return deferred.promise();
    },

    geoLocationError: function() {
      alert('Geo Location failed.');
    }
  }
});
