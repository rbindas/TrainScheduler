// initial database
//add input into to db
//calc minutes away
//button to add train



// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAGjkwiyUPRbi-9_AmKri1S6mftWtJcMs",
    authDomain: "trainschedule-142d9.firebaseapp.com",
    databaseURL: "https://trainschedule-142d9.firebaseio.com",
    projectId: "trainschedule-142d9",
    storageBucket: "trainschedule-142d9.appspot.com",
    messagingSenderId: "969683034278"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //Button to add trains
  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  
  // Uploads data to the database
  database.ref().push({
  	name: trainName,
    destin: destination,
    time: trainTime,
    freq: frequency
	});

  // Logs everything to console
  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

  //Empty out form
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("")

});

//Firebase event for adding train to the database & row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destin;
  var trainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);  

var firstTrainTime = moment(trainTime, "HH:mm").subtract(1, "years");
var minutesAway = frequency - (moment().diff(moment(firstTrainTime), "minutes") % frequency);

var nextArrival = (moment(moment().add(minutesAway, "minutes")).format("HH:mm"));

      
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");	  


// Handle the errors
 }, function(errorObject) {
    	console.log("Errors handled: " + errorObject.code);
    });


