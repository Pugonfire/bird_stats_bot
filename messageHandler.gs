function messageHandler(contents) {
  
  
  var id = contents.message.from.id;
  var name = contents.message.from.first_name + " " + contents.message.from.last_name;
  var messageID = contents.message.message_id;
  var text = contents.message.text;
  var textSplit = text.split(' ');
  var userProperties = PropertiesService.getUserProperties();
  
  if (textSplit[0] == commands.quit) {
    userProperties.deleteAllProperties();
    sendText(id, "An abrupt end to your inspection. All unsaved birds will perish. \n Please do not use the options above or you will wreck havoc");
    inspComplete()
    sendAnimation(id, 'CgADBQADGQEAArc9gFQRlbw3Ydo1pxYE') //Pug lookback
  }
  
  if (textSplit[0] == commands.view) {
    userProperties.deleteAllProperties();
    sendText(id, "Ensure the inspection is completed before viewing the recorded bird stats \n Link: https://tinyurl.com/wq8s493");
  }
  
  else if (textSplit[0] == commands.start) {
    userProperties.deleteAllProperties();
    userProperties.setProperty('name', name);
    sendText(id, "Inspection started. Select Location of Birds:", eastkeyboard)
  }
  
  else if (textSplit[0] == commands.goback) {
    userProperties.deleteAllProperties();
    userProperties.setProperty('name', name);
    sendText(id, "Inspection started. Select Location of Birds:", eastkeyboard)
  }
  
  else if (userProperties.getProperty('OTH')) {
    userProperties.deleteProperty('OTH');
    userProperties.setProperty('type', text);
    sendText(id, 'Input number of ' + text + 's at ' + userProperties.getProperty('location') + ':')
  }
  
  else if (userProperties.getProperty('type')) {
    userProperties.setProperty('num', text);
    sendText(id, text + " x " + userProperties.getProperty('type') + " spotted at " + userProperties.getProperty('location'), cfmkeyboard);
  }
  
  else {
    sendText(id, "I don't understand")
  }
  
}



var commands = {
  start:'/start',
  goback: '/goback',
  quit: '/forcequit',
  view: '/view'
}

// 4 * 3 is the maximum
var eastkeyboard = {
  "inline_keyboard": [
    [{
      text : 'N of E2',
      callback_data : 'NE2'
    },
     {
       text : 'E2 - E3',
       callback_data : 'E23'
     },
    {
      text : 'E3 - E4',
      callback_data : 'E34'
    },
     {
       text : 'E4 - E5',
       callback_data : 'E45'
     }],
    [{
      text : 'E5 - E6',
      callback_data : 'E56'
    },
     {
       text : 'E6 - E7',
       callback_data : 'E67'
     },
    {
      text : 'S of E7',
      callback_data : 'SE7'
    }],
     [{
       text : 'Western',
       callback_data : 'Western'
     }]
    ]
}

var cfmkeyboard = {
  "inline_keyboard": [
    [{
      text : 'Save & Continue Inspection',
      callback_data : 'Continue'
    }],
     [{
       text : 'Save & End Inspection',
       callback_data : 'Done'
     }]
    ]
}

