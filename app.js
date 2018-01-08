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


// document.onload(function(){
    var arrive = moment().add(7, 'minutes').calendar();
    var minutesAway = moment().add(frequency, 'minutes').calendar();
// })

$("#chooArrive").append(arrive);
$("#chooAway").append(minutesAway);



//  when the submit button is clicked
$("#submit").on("click", function () {
    // prevent submit button from opening new page
    event.preventDefault();
    // send data to firebase
    database.ref().set({
        name: $("#trainName").val(),
        destination: $("#destination").val(),
        firstTrain: $("#firstTrain").val(),
        frequency: $("#frequency").val(),
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    // add new table data to bottom of table
    var tableRow = $("<tr>");
    
    // append the train name input, destination, first train, frequency
    tableRow.append("<td>" + $("#trainName").val() + "</td>");
    tableRow.append("<td>" + $("#destination").val() + "</td>");
    tableRow.append("<td>" + $("#firstTrain").val() + "</td>");
    tableRow.append("<td>" + $("#frequency").val() + "</td>");
    // append table data to the train schedule
    $("#trainSchedule").append(tableRow);

    // empty input after submit is clicked
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
    
})

// pull data updates from Firebase and append them to the table
database.ref().on("value", function(snapshot){
    $(tableRow).append(snapshot.val().name);
    $(tableRow).append(snapshot.val().destination);
    $(tableRow).append(snapshot.val().firstTrain);
    $(tableRow).append(snapshot.val().frequency);
       
});

$("#trainSchedule").append(tableData);
