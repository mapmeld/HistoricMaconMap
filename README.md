# GeoData-Checkout

[![Greenkeeper badge](https://badges.greenkeeper.io/mapmeld/HistoricMaconMap.svg)](https://greenkeeper.io/)

GeoData-Checkout is an open data platform for geospatial and time-enabled data. Data is stored inside MongoDB and made available to users in an interactive timeline/map, time-enabled KML for Google Earth, and GeoJSON.

Step 1: Draw a polygon around your neighborhood ( using Leaflet.js polygon editing tools )

<img src="http://i.imgur.com/U9uW5.png"/>

Step 2: Click the "View Web Map" link and you will land on <a href="http://maconmaps.herokuapp.com/timeline?customgeo=50789e4994661b0200000051">an interactive timeline-map</a> ( powered by Mapbox.js )

<img src="http://codeforamerica.org/wp-content/uploads/2012/09/Screen-Shot-2012-09-24-at-3.54.11-PM.png"/>

Step 3: Download options include KML or GeoJSON. When you open the KML file in Google Earth, it will open a timeline control.

<img src="http://i.imgur.com/AZ0Au.png"/>

# Technology

## About MongoDB

MongoDB is a NoSQL database which supports <a href="http://www.mongodb.org/display/DOCS/Geospatial+Indexing">geospatial queries</a>. The drawn polygon is saved as a CustomGeo, and its points are used to make this query:

    timepoint.TimePoint.find( {
      ll: {
        "$within": {
          "$polygon": poly
        }
      }
    })

## Other technologies used

Leaflet.js from Cloudmade, MapBox.js from MapBox, Leaflet.js Pan Control, Node.js

## About Poang

Poang ([github](https://github.com/BeyondFog/Poang)) is a Node.js/MongoDB app built using the [Express](http://expressjs.com/) framework. Poang uses [Everyauth](http://everyauth.com/) for local authentication, [Mongoose-Auth](https://github.com/bnoguchi/mongoose-auth) to connect Everyauth to MongoDB (and [Mongoose](http://mongoosejs.com/) as the ODM) for account persistence, and [Connect-Mongo](https://github.com/kcbanner/connect-mongo) as a session store. Most of the code in app.js was generated by Express and all of the code in auth.js after the Comment schema is straight from the Mongoose-Auth docs.

For testing, Poang uses the [Mocha](http://visionmedia.github.com/mocha/) test framework, [should](https://github.com/visionmedia/should.js) for assertions, [Sinon.JS](http://sinonjs.org/) for mocks & stubs, and [Zombie.js](http://zombie.labnotes.org/) for lightweight integration testing.

For more details, please see BeyondFog's [blog post](http://blog.beyondfog.com/?p=222) that walks through the various tests in Poang.

### Installation
 
1) Do a git clone:

    git clone git://github.com/codeforamerica/geodata-checkout.git
    
2) cd into the project directory and then install the necessary node modules:

    npm install -d

3) start up MongoDB if it's not already running:
  
    mongod --noprealloc --nojournal
    
4) start the node process:

    node app.js

5) add a geospatial index to the "ll" field in your MongoDB settings

### Deploy to Heroku

    heroku create APP_NAME
    git push heroku master

After you have created a new app on Heroku and pushed the code via git, you will need to use the Heroku Toolbelt from your command line to add the free MongoLab starter addon:

    heroku addons:add mongolab:starter

Go to Heroku, click on Apps and then on this app's Addons panel. On the MongoLab admin panel, add a geospatial index to the "ll" field


### Uploading data

POST each of your TimePoints to /timeline using a script such as https://gist.github.com/3853444

POST body should include these variables:

* lat = latitude
* lng = longitude
* start = StartMonth
* end = EndMonth