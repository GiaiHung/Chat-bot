import moment from 'moment'
const { GoogleSpreadsheet } = require('google-spreadsheet')

const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(
  new RegExp('\\\\n', 'g'),
  '\n'
)
const CLIENT_EMAIL = process.env.CLIENT_EMAIL
const SHEET_ID = process.env.SHEET_ID

let getGoogleSheet = async (data) => {
  try {
    const { customerName, facebookName, email, phoneNumber } = data
    let currentDate = new Date()

    const format = 'HH:mm DD/MM/YYYY'

    let formatedDate = moment(currentDate).format(format)

    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(SHEET_ID)

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    })

    await doc.loadInfo() // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0] // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    // append rows
    await sheet.addRow({
      'Tên Facebook': facebookName,
      'Người dùng email': email,
      'Số điện thoại': `'` + phoneNumber,
      'Thời gian': formatedDate,
      'Tên khách hàng': customerName,
    })
  } catch (e) {
    console.log(e)
  }
}

export { getGoogleSheet }
