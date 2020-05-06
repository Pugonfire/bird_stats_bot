function monthlySheet() { //not in use
  
  var date = new Date('February 01, 2020 13:00:00 +0800')
  var ssID = "1HCbfI-lyNyqjmKyUpUvw4ewN26x7pV0cgKSjNVcJvCA";
  var month = Utilities.formatDate(date, "GMT+8", "MM_yyyy");
  var spreadsheet = SpreadsheetApp.openById(ssID);
  var values = [['Date', 'Time', 'Location', 'Birds', 'Inspector']];
  
  if (spreadsheet.getSheetByName(month)) { //to do nothing
    Logger.log("Sheet already exists")
  }
  else {
    spreadsheet.insertSheet(month);
    SpreadsheetApp.setActiveSheet(spreadsheet.getSheetByName(month))
    var sheet = spreadsheet.getActiveSheet();
    var range = sheet.getRange("A1:E1");
    sheet.setFrozenRows(1);
    range.setValues(values).setBackground("yellow").setHorizontalAlignment('center');
    var newrange = sheet.getRange("A2:E2000");
    newrange.setHorizontalAlignment('center')
  }
}


function addtosheet(location, number, type, inspector) { //rawdate, location, number, type, inspector

  /*
  var rawdate = new Date('April 18, 2020 13:00:00 +0800')
  var location = 'test location 2'
  var number = '111'
  var type = 'Dog'
  var inspector = 'Inspector'
  */
  var rawdate = new Date();
  var date = Utilities.formatDate(rawdate, "GMT+8", "dd/MM/yyyy");
  var time = Utilities.formatDate(rawdate, "GMT+8", "HHmm") + "H"
  var month = Utilities.formatDate(rawdate, "GMT+8", "MM_yyyy");
  var birds = createDict('Types of Birds');
  var bird = birds[type]
  var ssID = "1HCbfI-lyNyqjmKyUpUvw4ewN26x7pV0cgKSjNVcJvCA";
  var spreadsheet = SpreadsheetApp.openById(ssID);
  var values = [['Date', 'Time', 'Location', 'Birds', 'Inspector']];
  
  if (spreadsheet.getSheetByName(month)) {
    SpreadsheetApp.setActiveSheet(spreadsheet.getSheetByName(month));
    var sheets = spreadsheet.getActiveSheet();
  }
  else {
    spreadsheet.insertSheet(month);
    SpreadsheetApp.setActiveSheet(spreadsheet.getSheetByName(month))
    var sheets = spreadsheet.getActiveSheet();
    var range = sheets.getRange("A1:E1");
    sheets.setFrozenRows(1);
    range.setValues(values).setBackground("yellow").setHorizontalAlignment('center');
    var newrange = sheets.getRange("A2:E2000");
    newrange.setHorizontalAlignment('center');
  }
    
  if (bird == undefined) {
    sheets.appendRow([date, time, location, number + ' x ' + type, inspector]);
  }
  else {
    sheets.appendRow([date, time, location, number + ' x ' + bird, inspector]);
  }
  
}

function inspComplete() {

  var ssID = "1HCbfI-lyNyqjmKyUpUvw4ewN26x7pV0cgKSjNVcJvCA";
  var spreadsheet = SpreadsheetApp.openById(ssID);
  var month = Utilities.formatDate(new Date(), "GMT+8", "MM_yyyy");
  var values = [['Date', 'Time', 'Location', 'Birds', 'Inspector']];
  
  if (spreadsheet.getSheetByName(month)) {
    SpreadsheetApp.setActiveSheet(spreadsheet.getSheetByName(month));
    var sheets = spreadsheet.getActiveSheet();
  }
  else {
    spreadsheet.insertSheet(month);
    SpreadsheetApp.setActiveSheet(spreadsheet.getSheetByName(month))
    var sheets = spreadsheet.getActiveSheet();
    var range = sheets.getRange("A1:E1");
    sheets.setFrozenRows(1);
    range.setValues(values).setBackground("yellow").setHorizontalAlignment('center');
    var newrange = sheets.getRange("A2:E2000");
    newrange.setHorizontalAlignment('center');
  }
  
  sheets.appendRow(['-------','INSPECTION', '-------', 'COMPLETED', '-------']);
  
  
}