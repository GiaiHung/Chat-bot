import request from 'request'
import { callSendAPI } from './chatbotService'
import {
  sendGetStartedTemplate,
  sendGuidanceTemplate1,
  sendGuidanceTemplate2,
  sendMainMenuTemplate,
  sendMedicalProductTemplate1,
  sendMedicalProductTemplate2,
} from './templates'
import { GIPHY_IMAGE_URL } from '../../constants/images'
require('dotenv').config()

const access_token = process.env.ACCESS_TOKEN

// GET STARTED
const handleGetStarted = async (sender_psid) => {
  try {
    const username = await getUserProfile(sender_psid)
    // const response = sendGetStartedTemplate(username, sender_psid)
    const responseWithHello = {
      text: `Chào mừng ${username} đến với Booking Care. Tại đây chúng tôi cung cấp cho bạn những tiện ích về y tế tốt nhất!`,
    }
    const responseWithGiphy = {
      attachment: {
        type: 'image',
        payload: {
          url: GIPHY_IMAGE_URL,
          is_reusable: true,
        },
      },
    }
    const responseWithQuickReply = {
      text: 'Dưới đây là các lựa chọn của phòng khám',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Menu Chính',
          payload: 'MAIN_MENU',
        },
        {
          content_type: 'text',
          title: 'HD sử dụng bot',
          payload: 'GUIDANCE',
        },
      ],
    }

    // Send generic template message
    // await callSendAPI(sender_psid, response)
    await callSendAPI(sender_psid, responseWithHello)
    await callSendAPI(sender_psid, responseWithGiphy)
    await callSendAPI(sender_psid, responseWithQuickReply)
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
          let username = `${body.first_name} ${body.last_name}`
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

// RESERVE
// const handleReserve = async (sender_psid) => {
//   try {
//     // Generic
//     const response1 = sendGuidanceTemplate1(sender_psid)

//     // Send generic template message
//     await callSendAPI(sender_psid, response1)
//   } catch (error) {
//     console.log(error)
//   }
// }

// GUIDANCE
const handleSendGuidance = async (sender_psid) => {
  try {
    // Generic
    const response1 = sendGuidanceTemplate1(sender_psid)

    // Video
    // const response2 = sendGuidanceTemplate2()

    // Send generic template message
    await callSendAPI(sender_psid, response1)
    // await callSendAPI(sender_psid, response2)
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
  handleReserve,
  handleSendGuidance,
  handleSendMedicalProduct,
  getUserProfile,
}
