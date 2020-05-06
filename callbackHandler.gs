function callbackQueryHandler(contents) {
  var queryID = contents.callback_query.id;
  var id = contents.callback_query.from.id;
  var messageID = contents.callback_query.message.message_id;
  var messageText = contents.callback_query.message.text;
  var querydata = contents.callback_query.data
  var userProperties = PropertiesService.getUserProperties();
  
  var locations = createDict('Locations');
  var birds = createDict('Types of Birds')
 
  if (querydata == 'Western') {
    editMessage(id, messageID, 'Select Location of Birds:', westkeyboard);
  }
  else if (querydata == 'Eastern') {
    editMessage(id, messageID, 'Select Location of Birds:', eastkeyboard);
  }
  
  for (var location in locations) {
    if (querydata == locations[location]) {
      userProperties.setProperty('location', location);
      editMessage(id, messageID, 'Select type of Bird/Birds at ' + location + ':', birdkeyboard);
    }
  }
  
  for (var bird in birds) {
    if (querydata == birds[bird]) {
      userProperties.setProperty('type', bird);
      editMessage(id, messageID, 'Input number of ' + bird + 's at ' + userProperties.getProperty('location') + ':');
    }
  }
  
  if (querydata == 'OTH') {
    userProperties.setProperty('OTH', 'OTH');
    editMessage(id, messageID, 'Input type of bird spotted: ')
  }
  
  if (querydata == 'Continue') {
    addtosheet(userProperties.getProperty('location'), userProperties.getProperty('num'), userProperties.getProperty('type'), userProperties.getProperty('name'));
    userProperties.deleteAllProperties();
    editMessage(id, messageID, 'Select Location of Birds:', eastkeyboard)
  }
  
  else if (querydata == 'Done') {
    
    addtosheet(userProperties.getProperty('location'), userProperties.getProperty('num'), userProperties.getProperty('type'), userProperties.getProperty('name'));
    inspComplete()
    editMessage(id, messageID, 'The birds have been recorded. We can sleep easy now, soldier.');
    // sendAnimation(id, 'CgADBAADIQIAAp0QFFFjPwIpKiso2xYE'); Pug in chicken basket
    userProperties.deleteAllProperties() 
  }
      
}

var birdkeyboard = {
  "inline_keyboard": [
    [{
      text : 'Brahminy Kite',
      callback_data : 'BK'
    },
     {
       text : 'Mynah',
       callback_data : 'MYN'
     },
    {
      text : 'Egret',
      callback_data : 'EGR'
    }],
    [{
      text : 'Swallow',
      callback_data : 'SWA'
    },
     {
       text : 'Sparrow',
       callback_data : 'SPA'
     },
    {
      text : 'Crow',
      callback_data : 'CRO'
    }],
    [{
      text : 'Kingfisher',
      callback_data : 'KF'
    },
     {
       text : "Richard's Pipt",
       callback_data : 'RP'
     },
    {
      text : 'Others',
      callback_data : 'OTH'
    }]
    ]
}

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

var westkeyboard = {
  "inline_keyboard": [
    [{
      text : 'N of W1',
      callback_data : 'NW1'
    },
     {
       text : 'W1 - W2',
       callback_data : 'W12'
     },
    {
      text : 'W2 - W3',
      callback_data : 'W23'
    },
     {
       text : 'W3 - W4',
       callback_data : 'W34'
     }],
    [{
      text : 'W4 - W5',
      callback_data : 'W45'
    },
     {
       text : 'W5 - W6',
       callback_data : 'W56'
     },
    {
      text : 'S of W6',
      callback_data : 'SW6'
    }],
     [{
       text : 'Eastern',
       callback_data : 'Eastern'
     }]
    ]
}

