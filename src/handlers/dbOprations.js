const AWS = require("aws-sdk");
const { v4 : uuid } = require('uuid');
const { generateOrderId, checker } = require('./utils.js')

const docClient = new AWS.DynamoDB.DocumentClient();

const createOrder = async (data) => {
    const orderId = generateOrderId()
    const orderData = data
    orderData.orderId = orderId
    orderData.id = uuid()
    console.log("🚀 ~ file: dbOprations.js:12 ~ createOrder ~ orderData:", orderData)
    try {
      await docClient.put({ TableName: "pizzaOrder-lexBot", Item: orderData }).promise();
      return `Your order successfully created. and your order id is ${orderId}`;
    } catch (e) {
      console.log("🚀 ~ file: orderPizzaBot.js:47 ~ module.exports.handler= ~ e:", e);
      return `Failed to save data in DynamoDB`;
    }
}

const checkValidCrust = (pizzaCrust) => {
    const crusts = ['Thin', 'Thick']
    return crusts.includes(pizzaCrust)
}

const checkValidTopping = (pizzaTopping) => {
    const pizzaToppings = pizzaTopping.split(",");
    const toppings = ['Jalapeno', 'Mushrooms', 'Black Olives', 'Corns', 'Onion', 'Pepperoni']
    return checker(toppings, pizzaToppings)
}


module.exports = {
    createOrder,
    checkValidTopping,
    checkValidCrust
}