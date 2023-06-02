import { callSendAPI } from '../../services/chatbot/chatbotService'

const getReserver = (req, res) => {
  const senderId = req.params.id
  res.render('reserve.ejs', {
    senderId,
  })
}

const postReserve = async (req, res) => {
  try {
    console.log('Hello from server')
    const { psid, customerName, email, phoneNumber } = req.body
    if (!customerName) customerName = 'Tên được để trống'

    const response1 = {
      text: `--- Thông tin khách hàng đặt khám chữa bệnh ---
      \nCustomer name: ${customerName}
      \nEmail: ${email}
      \nPhone number: ${phoneNumber}`,
    }
    await callSendAPI(psid, response1)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ status: 'failed', message: 'Error with post reserve' })
  }
  res.status(200).json({ status: 'success', message: 'Successfully reserved' })
}

export { getReserver, postReserve }
