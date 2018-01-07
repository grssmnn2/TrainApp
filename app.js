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

$("#submit").on("click", function () {
    event.preventDefault();
   
    var tableData = $("<td>");
    
    tableData.append($("#trainName").val());
    tableData.append($("#destination").val());
   tableData.append($("#firstTrain").val());
   tableData.append($("#frequency").val());
    
    $("#trainSchedule").append(tableData);

})