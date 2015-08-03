if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('status', 0);

  Template.main.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.main.events({
    'click #start': function () {
      console.log("start button clicked");
      Session.set('status',1);
      if (Meteor.isCordova) {
        console.log("starting GPS geolocation!");
        LocationServices.watchPosition(onGeolocationSuccess,onLocationError,options);

      }
      //Session.set('counter', Session.get('counter') + 1);
    },
    'click #stop': function () {
      console.log("stop button clicked");
      Session.set('status',0);
    }
  });


  Template.gpsStatus.helpers({
      getGpsState: function () {
        if (Session.get('status')===1) {
          return 'ON';
        }
        else return 'OFF';
        
      }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

function onGeolocationSuccess(position) {

        console.log('got a GPS position!\n' +
          'Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');

};

function onLocationError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
};

var options = { maximumAge: 3000, 
                timeout: 5000, enableHighAccuracy: true, 
                priority: 100, 
                interval: 1000, 
                fastInterval: 500 };
