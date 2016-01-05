# BeerStalker  

This app filters search results from the [meetup.com](http://www.meetup.com/) api to find events that have free beer!  

It does something that meetup.com cannot do: it searches for events that have the _phrase_ "free beer". Meetup.com itself cannot do this; meetup.com itself can only return results that have "free" and "beer" anywhere in the document. This app additionally filters out irrelevant results, returning only those events that have "free beer" (or "free drinks") ;-)  

####Technologies  
It was built in a team of four on a two-day hackathon. Because of the short time available and it was a small app, we decided not to write tests.  

It is built on [AngularJS](https://angularjs.org/) and deployed to [Heroku](http://heroku.com) using [Express](http://expressjs.com/).  

Although it was initially built as a team, I wrote all of the CSS and did a lot of work on the app after the hackathon on my own to fix and improve the app in the following ways:  
- refactored a lot of code out of the controller into factories,  
- made the app only ask for permission to use geolocation if 'autosearch' is used, and will not make the api call until the user's location is found (had to get my head around 'promises' for this),  
- added error handling for the above,  
- fixed a bug where 'no results found' was only shown for manual search and not when autosearch was used.  

