// Initialize Firebase
var config = {
  apiKey: "AIzaSyBMjYDh7LqRGvN6B6j-powSaMjACRs1iJk",
  authDomain: "trainschedule-3c875.firebaseapp.com",
  databaseURL: "https://trainschedule-3c875.firebaseio.com",
  projectId: "trainschedule-3c875",
  storageBucket: "",
  messagingSenderId: "95592467295"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//upon clicking the "add train" button
$("#add-trainButton").on("click", function() {
  event.preventDefault();//to clear form after submitting

  //creat variables using the value of the user's input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = parseInt($("#frequency").val().trim());

  //pushing the values of the user's input into firebase
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    nextArrival:nextArrival,
    minutesAway: minutesAway
  });

});

//display data in firebase onto page at reload
database.ref().on("child_added", function(snapshot) {
display(snapshot.val());
});

//shows all trains in the table
function display(data) {
  //$("tbody").html("");???
  var row = $("<tr>")
  row.append($("<td>").text(data.trainName))
    .append($("<td>").text(data.destination))
    .append($("<td>").text(data.frequency))
    .append($("<td>").text(nextTrain))//add next arrival function
    .append($("<td>").text(minutesAway));//add minutes away function
      
  // append row above to the table
  $("tbody").append(row);

  // clear text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");

};




//////////////////////////////////////////
//create minutes away and arrive time:////
/////////////////////////////////////////
var trainName = $("#train-name").val().trim();
var destination = $("#destination").val().trim();
var firstTrainTime = $("#firstTrainTime").val().trim();
var frequency = parseInt($("#frequency").val().trim());

var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm");
var currentTime = moment().format("MMMM Do YYYY, HH:mm");
var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");

var timeRemainder = diffTime % frequency;
var minutesAway = frequency - timeRemainder;

var nextTrain = moment().add(minutesAway, "minutes");
var nextTrainFormatted = moment(nextTrain).format("HH:mm");
console.log(firstTrainTimeConverted);
console.log(currentTime);
console.log(diffTime);
console.log(timeRemainder);
console.log(minutesAway);
console.log(nextTrain);
console.log(nextTrainFormatted);





// database.ref().on("child_added", function(childSnapshot, prevChildKey){
//   console.log(childSnapshot.val());

//   //make firebase variables for the snapshots
//   var fTrainName = childSnapshot.val().trainName;
//   var fDestination = childSnapshot.val().destination;
//   var fFirstTrainTime = childSnapshot.val().firstTrainTime;
//   var fFrequency = childSnapshot.val().frequency;

//   var diffTime = moment().diff(moment.unix(fFirstTrainTime), "minutes");
//   var timeRemainder = moment().diff(moment.unix(fFirstTrainTime), "minutes") % fFrequency;
//   var minutesAway = fFrequency - timeRemainder;

//   var nextTrain = moment().add(minutes, "m").format("HH:mm A");

//   console.log(minutesAway);
//   console.log(nextTrain);

// })






