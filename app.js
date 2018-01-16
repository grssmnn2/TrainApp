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
    var timeDifference;

    // check current time using moment.js
    var currentTime = moment();
    console.log(currentTime);

    //  when the submit button is clicked
    $("#submit").on("click", function () {
        // prevent submit button from opening new page
        event.preventDefault();

        // grab user input and place in variables for ease of access
        var name = $("#trainName").val();
        var destination = $("#destination").val();
        var firstTrain = $("#firstTrain").val();
        var frequency = parseInt($("#frequency").val());

        console.log(name, destination, firstTrain, frequency);

        // the firstTrain time + frequency is the next trainArrive time
        var trainArrive = moment(firstTrain, 'HH:mm').add(frequency, 'minutes').format('hh:mm A');
        console.log(trainArrive);

        // timer attempt updated every second to see immediate result
        var trainFrequency = setInterval(arrival, 1000);
        // the difference between the current time and the train arrival time in minutes is minutes away
        timeDifference = moment.utc(moment(firstTrain, "HH:mm").diff(moment(currentTime, "HH:mm"))).format("HH:mm");
        var timeToMinutes = moment.duration(timeDifference).asMinutes();
        console.log(timeDifference);
        console.log(timeToMinutes);
        // convert current time and train arrival into numbers
        minutesAway = timeToMinutes;

        // if minutesAway is zero, clear the timer and set minutes back to frequency
        function arrival() {
            if (minutesAway == 0) {
                clearInterval(trainFrequency);
                minutesAway = frequency;

            } else {
                minutesAway--;
                $("#updatedMinute").html(minutesAway);


            }
        }

        // send data to firebase using object
        var data = {
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            trainArrive: trainArrive,
            minutesAway: minutesAway
        }

        database.ref().push(data);

        // variable to hold info to make new table row


        // empty input after submit is clicked

        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");

    })

    // pull data updates from Firebase and append them to the table
    database.ref().on("child_added", function (childSnapshot) {
        tableRow = $("<tr>");
        // append the train name input, destination, first train, frequency and minutesAway to same row
        tableRow.append("<td>" + childSnapshot.val().name + "</td>");
        tableRow.append("<td>" + childSnapshot.val().destination + "</td>");
        tableRow.append("<td>" + childSnapshot.val().frequency + "</td>");
        tableRow.append("<td>" + childSnapshot.val().trainArrive + "</td>");
        // append the td with the changing html inside of it
        tableRow.append($('td[id="updatedMinute"]'));
        //for the last column you should calculate each trains individual 
        //minutes/seconds away based on the current time of the user 
        //and then append that value to the last column and set it up 
        //in a wa that whenever that value changes it updates in the html 
        // somehow use this??

        // append row to the train schedule
        $("#trainSchedule").append(tableRow);

    });

});


