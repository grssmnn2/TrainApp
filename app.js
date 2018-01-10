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
    // global variables to use later
    var tableRow;
    var trainfrequency;
    var minutesAway;


    // check current time using moment.js
    var currentTime = moment().format('hh:mm A');
    console.log(currentTime);

    //  when the submit button is clicked
    $("#submit").on("click", function () {
        // prevent submit button from opening new page
        event.preventDefault();
        // send data to firebase
        // grab user input and place in variables for ease of access
        var name = $("#trainName").val();
        var destination = $("#destination").val();
        var firstTrain = $("#firstTrain").val();
        // made frequency input into a number in case it was being read as a string
        var frequency = parseInt($("#frequency").val());

        // the current time + frequency in minutes is the arrival time
        var trainArrive = moment().add(frequency, 'minutes').format('hh:mm A');
        console.log(trainArrive);

        // send data to firebase using object
        var data = {  
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        trainArrive: trainArrive
        }
        
        database.ref().push(data);

        // variable to hold info to make new table row
        tableRow = $("<tr>");
        // minutesAway=the initial train frequency as a number
        minutesAway = parseInt($("#frequency").val());

        // append the train name input, destination, first train, frequency and minutesAway to same row
        tableRow.append("<td>" + $("#trainName").val() + "</td>");
        tableRow.append("<td>" + $("#destination").val() + "</td>");
        tableRow.append("<td>" + $("#frequency").val() + "</td>");
        tableRow.append("<td>" + trainArrive + "</td>");
        tableRow.append("<td>" + minutesAway + "</td>");


        // append row to the train schedule
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
        $(tableRow).append(snapshot.val().trainArrive);


    });

});
