$(document).ready(function () {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCu-hVPCfk5n5ZAZ1JczJ-CLuw-AOLrYoU",
    authDomain: "trainapp-e2286.firebaseapp.com",
    databaseURL: "https://trainapp-e2286.firebaseio.com",
    projectId: "trainapp-e2286",
    storageBucket: "trainapp-e2286.appspot.com",
    messagingSenderId: "1093165244921"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = $("#trainName").val();
var destination = $("#destination").val();
var firstTrain = $("#firstTrain").val();
var frequency = $("#frequency").val();
var trainfrequency;
var minutesAway;
var currentTime = moment().format('h:mm');
console.log(currentTime);   
// the current time + frequency in minutes is the arrival time
var trainArrive = moment().add(300, 'minutes').format('hh:mm A');
console.log(trainArrive);
  

//  when the submit button is clicked
$("#submit").on("click", function () {
    // prevent submit button from opening new page
    event.preventDefault();
    // send data to firebase
    database.ref().set({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    // minutesAway=the initial train frequency as a number
    minutesAway = Number($("#frequency").val());
    // train frequency runs once every minute (in seconds now to check if working)
    trainFrequency = setInterval(arrival, 1000);
    // if minutes away = 0 after 60 seconds, start over
    function arrival() {
        if (minutesAway == 0) {
            clearInterval(trainFrequency);
            minutesAway = $("#frequency").val();
            // otherwise keep subtracting 1 minute
        } else {
            minutesAway--;
        }
    }

    // add new table data to bottom of table
    var tableRow = $("<tr>");

    // append the train name input, destination, first train, frequency and minutes to train
    tableRow.append("<td>" + $("#trainName").val() + "</td>");
    tableRow.append("<td>" + $("#destination").val() + "</td>");
    tableRow.append("<td>" + $("#frequency").val() + "</td>");
    tableRow.append("<td>" + trainArrive + "</td>");
    tableRow.append("<td>" + minutesAway + "</td>");


    // append table data to the train schedule
    $("#trainSchedule").append(tableRow);

    // empty input after submit is clicked
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");

})

// pull data updates from Firebase and append them to the table
database.ref().on("value", function (snapshot) {
    $(tableRow).append(snapshot.val().name);
    $(tableRow).append(snapshot.val().destination);
    $(tableRow).append(snapshot.val().firstTrain);
    $(tableRow).append(snapshot.val().frequency);

});

});
