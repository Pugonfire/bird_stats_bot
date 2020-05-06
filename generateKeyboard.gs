/*
function generateInlineKeyboard(dict) {

  var buttons =[];
  var counter = 1; 
  var buttonRow = [];
  for (var element in dict) {
    if(counter == 3){//counter no. = no. of buttons on a row
    var button = {
        "text": element,
        "callback_data": dict[element]
        };
        buttonRow.push(button);
        buttons.push(buttonRow);
        buttonRow=[];
        counter = 1;
     }
     else {
      var button = {
        "text": element,
        "callback_data": dict[element]
        };
        buttonRow.push(button);
        counter++;
        }
    }
    if(buttonRow[0]) buttons.push(buttonRow);
  var keyboard = {
    "inline_keyboard":buttons
  }
  return keyboard;
  Logger.log(JSON.stringify(keyboard))
}
*/


function createDict(sheetname) {
  var dict = {};
  var ssID = "1HCbfI-lyNyqjmKyUpUvw4ewN26x7pV0cgKSjNVcJvCA"
  var spreadsheet = SpreadsheetApp.openById(ssID);
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheetByName(sheetname))
  var sheets = spreadsheet.getActiveSheet();
  var values = sheets.getDataRange().getValues();
  
  for (var x=1; x<values.length; x++) {
    var key = values[x][0]
    var data = values[x][1]
    dict[key] = data
  }
  return dict
  Logger.log(data)
}

