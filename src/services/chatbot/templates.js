import { GET_STARTED_IMAGE_URL } from '../../constants/images'

const sendGetStartedTemplate = () => {
  const response = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'Xin chào bạn đến với Booing Care',
            subtitle: 'Dưới đây là các lựa chọn của phòng khám',
            image_url: GET_STARTED_IMAGE_URL,
            buttons: [
              {
                type: 'postback',
                title: 'Đặt khám',
                payload: 'BOOKING',
              },
              {
                type: 'postback',
                title: 'Tra cứu thông tin',
                payload: 'INFORMATION',
              },
              {
                type: 'postback',
                title: 'Sản phẩm y tế',
                payload: 'MEDICAL_PRODUCT',
              },
            ],
          },
        ],
      },
    },
  }

  return response
}

export { sendGetStartedTemplate }
