import request from 'request'
import { callSendAPI } from './chatbotService'
import {
  sendGetStartedTemplate,
  sendGuidanceTemplate,
  sendMainMenuTemplate,
  sendMedicalProductTemplate1,
  sendMedicalProductTemplate2,
} from './templates'
require('dotenv').config()

const access_token = process.env.ACCESS_TOKEN

// GET STARTED
const handleGetStarted = async (sender_psid) => {
  try {
    const username = await getUserProfile(sender_psid)
    const response = sendGetStartedTemplate(username)

    // Send generic template message
    await callSendAPI(sender_psid, response)
  } catch (error) {
    console.log(error)
  }
}

const getUserProfile = (sender_psid) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${access_token}`,
        method: 'GET',
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body)
          let username = `${body.last_name} ${body.first_name}`
          resolve(username)
        } else {
          console.error('Unable to send message:' + err)
          reject(err)
        }
      }
    )
  })
}

// MAIN MENU
const handleMainMenu = async (sender_psid) => {
  try {
    const response = sendMainMenuTemplate()

    // Send generic template message
    await callSendAPI(sender_psid, response)
  } catch (error) {
    console.log(error)
  }
}

// GUIDANCE
const handleSendGuidance = async (sender_psid) => {
  try {
    const response = sendGuidanceTemplate()

    // Send generic template message
    await callSendAPI(sender_psid, response)
  } catch (error) {
    console.log(error)
  }
}

// MEDICAL PRODUCT
const handleSendMedicalProduct = async (sender_psid) => {
  try {
    // Image
    const response1 = sendMedicalProductTemplate1()

    // Text and buttons
    const response2 = sendMedicalProductTemplate2()

    // Send generic template message
    await callSendAPI(sender_psid, response1)
    await callSendAPI(sender_psid, response2)
  } catch (error) {
    console.log(error)
  }
}

export {
  handleGetStarted,
  handleMainMenu,
  handleSendGuidance,
  handleSendMedicalProduct,
}
