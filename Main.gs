// This script only runs on RhinoRuntime. DO NOT run on V8 Run time
// Run --> Enable App script runtime powered by Rhino

var token = // insert token here;
var url = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/AKfycbxjkARIoce9ak9b5Yym3VERQKLn547qHyz9z3psEBY1xUs_e0ep/exec";
var ssID = // insert google spreadsheet ID here

function getMe() {
  var response = UrlFetchApp.fetch(url + "/getMe");
  Logger.log(response.getContentText());
}

function getUpdates() {
  var response = UrlFetchApp.fetch(url + "/getUpdates");
  Logger.log(response.getContentText());
}

function setWebhook() {
  var response = UrlFetchApp.fetch(url + "/setWebhook?url=" + webAppUrl);
  Logger.log(response.getContentText());
}

function sendText(id, text, keyboard) {
  if (keyboard!=undefined) {
    var data = {
      method:"post",
      payload:{
        method:"sendMessage",
        chat_id:id,
        text:text,
        parse_mode:"HTML",
        reply_markup:JSON.stringify(keyboard)
      }
    }
    }
  else {
    var data = {
      method:"post",
      payload:{
        method:"sendMessage",
        chat_id:id,
        parse_mode:"HTML",
        text:text
      }
    }
    }
  try{
    return UrlFetchApp.fetch(url + "/",data);
  }
  catch(e){return undefined};
}

function editMessage(id, messageID, text, keyboard) {
  if(keyboard!=undefined) {
    var data = {
      method:"post",
      payload:{
        method:"editMessageText",
        chat_id:id,
        message_id:messageID,
        parse_mode:"HTML",
        text:text,
        reply_markup:JSON.stringify(keyboard)
      }
    }
  }
  else {
    var data ={
      method:"post",
      payload:{
        method:"editMessageText",
        chat_id:id,
        message_id:messageID,
        parse_mode:"HTML",
        text:text
      }
    }
  }
  try{
    return UrlFetchApp.fetch(url +"/",data);
  }
  catch(e){return undefined};
}


function sendSticker(id, stickerID) {
  var response = UrlFetchApp.fetch(url + "/sendSticker?chat_id=" + id + "&sticker=" + stickerID); 
}

function sendAnimation(id, animationID) {
  var response = UrlFetchApp.fetch(url + "/sendAnimation?chat_id=" + id + "&animation=" + animationID);
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Birdstats for 207");
}


function doPost(e) {
  var contents = JSON.parse(e.postData.contents);
  var userProperties = PropertiesService.getUserProperties();
  SpreadsheetApp.openById(ssID).appendRow([new Date(), contents, userProperties.getProperties()]);

  if(contents.message) {
    messageHandler(contents) //MessageHandler.js
  } 
  else if (contents.callback_query) {
    callbackQueryHandler(contents) //CallbackQueryHandler.js
  }
}

/*
https://api.telegram.org/bot977278898:AAG31w4hnGjVnstLN6xBXS-PMsaeaIfZabc
*/
