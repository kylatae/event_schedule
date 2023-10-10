var scheduleLocation = ('.container-lg');
var clickSave = ('.saveBtn');
var dayDisp = ('#currentDay');
// hourBlockTotal is how many hour blocks do you want to appear? It will only show hours from 0 to 23 (12am to 11pm)
const hourBlockTotal = 9;
//timeStart is for what hour you want your time to start (0 to 23) any time after 24 will not build. This is a "day" schedule afterall
const timeStart = 9;
var now = dayjs();
var currentTime = now.hour();

    //Since I removed the div sections for the hour blocks they are rebuilt here custom to the time range given and colored by the time of day.
    //This is set up to run once. It builds an hourBlockTotal amount of hour blocks on the page and starts at whatever time timeStart is set to.
function buildPage(){
  for(i = 0; i < hourBlockTotal; i++){
    var timeID = i+timeStart
    var timeSlot = i+timeStart
    var timeSlotSuf = "AM"
    var notifyColor = ""
    if (currentTime > timeID)notifyColor="past";
    else if (currentTime === timeID)notifyColor="present";
    else notifyColor="future";
    if (timeID === 0) timeSlot = 12;
    else if (timeID > 12 && timeID < 24){
      timeSlot -=12;
      timeSlotSuf = "PM";
    }
    var blockLoadID = (timeSlot+timeSlotSuf);
    var blockLoadText = JSON.parse(localStorage.getItem(blockLoadID));
    if (blockLoadText === null) blockLoadText = "";
    //During the append most of the build is actually from the original div in the HTML only changing the few variables that needed to be changed based on some checks above.
    if (timeID < 24){
      var row = `<div id="hour-${timeID}" class="row time-block ${notifyColor}">
      <div class="col-2 col-md-1 hour text-center py-3">${timeSlot}${timeSlotSuf}</div>
      <textarea class="col-8 col-md-10 description" rows="3">${blockLoadText}</textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
      </div>
      `
      $(scheduleLocation).append(row);
    }

  }
}

$(clickSave).click(function(event){
  // var blockSave = $(this).prev('textarea').val();
  var blockSaveText = $(this).siblings('textarea').val();
  var blockSaveID = $(this).siblings('.hour').text();
  localStorage.setItem(blockSaveID, JSON.stringify(blockSaveText));
  })

//Displays Today's Date
$(dayDisp).text(now.format("dddd, MMMM DD"));
//Builds Page
buildPage();