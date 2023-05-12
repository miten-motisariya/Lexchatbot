'use strict';
const responses = require('./responseFormat.js')
const { createOrder, checkValidCrust, checkValidTopping } = require('./dbOprations.js')

module.exports.handler = async (event) => {
  const sessionState = event.sessionState
  const intent = sessionState.intent

  let response = responses.delegate(sessionState.sessionAttributes, intent)
  switch (event.invocationLabel) {
    case 'QtyValidation':
      const qty = intent.slots.QtyPizza.value.originalValue
      if (isNaN(qty) || parseInt(qty) < 1 || parseInt(qty) > 10) {
        response = responses.elicit_slot(sessionState.sessionAttributes, intent, 'QtyPizza', 'Please enter valid input in number of Pizza')
      }
      break;
    case 'pickupOrderTime':
        response = responses.delegate(sessionState.sessionAttributes, intent)
      break;
    case 'PizzaToppingValidate':
      const topping = intent.slots.PizzaTopping.value.originalValue
      if (!checkValidTopping(topping)) {
        response = responses.elicit_slot(sessionState.sessionAttributes, intent, 'PizzaTopping', 'Please enter valid input in Pizza Toppings')
      }
    break;
    case 'PizzaCrustValidate':
      const crust = intent.slots.PizzaCrust.value.interpretedValue
      if (!checkValidCrust(crust)) {
        response = responses.elicit_slot(sessionState.sessionAttributes, intent, 'PizzaCrust', 'Please enter valid input in Pizza Crust')
      }
      break;
    case 'orderConfirm':
      const ordercreate = await createOrder({
        Name: intent.slots.Name.value.interpretedValue,
        City: intent.slots.City.value.interpretedValue,
        Type: intent.slots.PizzaType.value.interpretedValue,
        Size: intent.slots.PizzaSize.value.interpretedValue,
        Crust: intent.slots.PizzaCrust.value.interpretedValue,
        Topping: intent.slots.PizzaTopping.value.interpretedValue,
        Qty: intent.slots.QtyPizza.value.interpretedValue,
        PickUpTime: intent.slots.PickUpTime.value.interpretedValue
      })
      response = responses.close(sessionState.sessionAttributes, intent, ordercreate)
      break;
    default:
      response = responses.delegate(sessionState.sessionAttributes, intent)
      break;
  }
  return response
};