exports.elicit_slot = (session_attributes, intent, slot_to_elicit, message) => {
    return {
      "sessionState": {
        // "activeContexts": [{
        //   "name": "intentContext",
        //   "contextAttributes": active_contexts,
        //   "timeToLive": {
        //     "timeToLiveInSeconds": 600,
        //     "turnsToLive": 1
        //   }
        // }],
        "sessionAttributes": session_attributes,
        "dialogAction": {
          "type": "ElicitSlot",
          "slotToElicit": slot_to_elicit
        },
        "intent": intent
      },
      "messages": [{"contentType": "PlainText", "content": message}]
    };
}
  
exports.confirm_intent = (active_contexts, session_attributes, intent, message) => {
    return {
      "sessionState": {
        "activeContexts": [active_contexts],
        "sessionAttributes": session_attributes,
        "dialogAction": {
          "type": "ConfirmIntent"
        },
        "intent": intent
      }
    };
}
  
  
exports.close = (session_attributes, intent, message) => {
    return {
        'sessionState': {
            // 'activeContexts':[{
            //     'name': 'intentContext',
            //     'contextAttributes': active_contexts,
            //     'timeToLive': {
            //         'timeToLiveInSeconds': 600,
            //         'turnsToLive': 1
            //     }
            // }],
            'sessionAttributes': session_attributes,
            'dialogAction': {
                'type': 'Close',
            },
            'intent': intent,
        },
        'messages': [{'contentType': 'PlainText', 'content': message}]
    };
}
  
exports.delegate = (session_attributes, intent, message) => {
    return {
      "sessionState": {
        // "activeContexts": [{
        //   "name": "intentContext",
        //   "contextAttributes": active_contexts,
        //   "timeToLive": {
        //     "timeToLiveInSeconds": 600,
        //     "turnsToLive": 1
        //   }
        // }],
        "sessionAttributes": session_attributes,
        "dialogAction": {
          "type": "Delegate"
        },
        "intent": intent
      },
      // "messages": [{
      //   "contentType": "PlainText",
      //   "content": message
      // }]
    };
}
  
exports.initial_message = (intent_name) => {
    return {
      "sessionState": {
        "dialogAction": {
          "type": "ElicitSlot",
          "slotToElicit": intent_name === "BookHotel" ? "Location" : "PickUpCity"
        },
        "intent": {
          "confirmationState": "None",
          "name": intent_name,
          "state": "InProgress"
        }
      }
    };
}