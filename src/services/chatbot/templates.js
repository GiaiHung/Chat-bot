import {
  GET_STARTED_IMAGE_URL,
  GUIDANCE_VIDEO_URL,
  MEDICAL_PRODUCT_URL,
} from '../../constants/images'
import { menuLinks } from '../../constants/images'
require('dotenv').config()

const sendGetStartedTemplate = (username) => {
  const response = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: `Xin chào ${username} đến với Booing Care`,
            subtitle: 'Dưới đây là các lựa chọn của phòng khám',
            image_url: GET_STARTED_IMAGE_URL,
            buttons: [
              {
                type: 'postback',
                title: 'Menu Chính',
                payload: 'MAIN_MENU',
              },
              {
                type: 'postback',
                title: 'Sản phẩm y tế',
                payload: 'MEDICAL_PRODUCT',
              },
              {
                type: 'web_url',
                url: `${process.env.URL_WEB_VIEW_RESERVE}`,
                title: 'Reserve an appointment',
                webview_height_ratio: 'tall',
                messenger_extensions: true,
              },
              {
                type: 'postback',
                title: 'Hướng dẫn sử dụng bot',
                payload: 'GUIDANCE',
              },
            ],
          },
        ],
      },
    },
  }

  return response
}

const sendMainMenuTemplate = () => {
  const response = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: `Bác sĩ nổi bật của chúng tôi`,
            subtitle:
              'Bác sĩ được liệt kê trong danh sách sẽ là những người nổi bật nhất, được đào tạo chuyên sâu hàng đầu ở Việt Nam',
            image_url:
              'https://www.aamc.org/sites/default/files/styles/scale_and_crop_1200_x_666/public/Dill%20VP%20on%20workforce%201200x666.jpg?itok=qOIr1hst',
            buttons: [
              {
                type: 'web_url',
                title: 'Xem bác sĩ',
                url: menuLinks.doctor,
                webview_height_ratio: 'full',
              },
            ],
          },
          {
            title: `Phòng khám`,
            subtitle:
              'Chúng tôi hân hạnh mang đến cho bạn những tiện ích và dịch vụ y tế tốt nhất',
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8gbcQh_BubeehblBJdqrmzGtgohpjVKTrmg&usqp=CAU',
            buttons: [
              {
                type: 'web_url',
                title: 'Xem phòng khám',
                url: menuLinks.clinic,
                webview_height_ratio: 'full',
              },
            ],
          },
          {
            title: `Chuyên khoa`,
            subtitle: 'Chuyên khoa đa dạng và phong phú đầy đủ mọi lĩnh vực',
            image_url:
              'https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg',
            buttons: [
              {
                type: 'web_url',
                title: 'Xem chuyên khoa',
                url: menuLinks.specialty,
                webview_height_ratio: 'full',
              },
            ],
          },
        ],
      },
    },
  }

  return response
}

const sendGuidanceTemplate1 = () => {
  const response = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: `Hướng dẫn sử dụng bot`,
            subtitle:
              'Xin chào! Tôi là chat bot Booking Care. Tôi có thể giúp được gì cho bạn? Click vào các nút dưới đây để xem thêm chi tiết',
            image_url:
              'https://www.callcentrehelper.com/images/stories/2020/10/chat-bot-head-set-760.jpg',
            buttons: [
              {
                type: 'web_url',
                title: 'Xem bác sĩ',
                url: menuLinks.doctor,
                webview_height_ratio: 'full',
              },
              {
                type: 'web_url',
                title: 'Xem phòng khám',
                url: menuLinks.clinic,
                webview_height_ratio: 'full',
              },
              {
                type: 'web_url',
                title: 'Xem chuyên khoa',
                url: menuLinks.specialty,
                webview_height_ratio: 'full',
              },
            ],
          },
        ],
      },
    },
  }

  return response
}

const sendGuidanceTemplate2 = () => {
  const response = {
    attachment: {
      type: 'video',
      payload: {
        url: GUIDANCE_VIDEO_URL,
        is_reusable: true,
      },
    },
  }

  return response
}

const sendMedicalProductTemplate1 = () => {
  const response = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Booking Care luôn cố gắng cung cấp cho bạn thiết bị y tế tốt và hiện đại nhất với trang thiết bị được nhập khẩu trực tiếp từ Mỹ đạt tiêu chuẩn quốc tế và đã được kiểm định chất lượng nghiêm ngặt',
        buttons: [
          {
            type: 'web_url',
            title: 'Xem thiết bị y tế',
            url: menuLinks.medical_product,
            webview_height_ratio: 'full',
          },
          {
            type: 'postback',
            title: 'Quay trở lại menu chính',
            payload: 'RETURN_HOME_SCREEN',
          },
        ],
      },
    },
  }

  return response
}

const sendMedicalProductTemplate2 = () => {
  const response = {
    attachment: {
      type: 'image',
      payload: {
        url: MEDICAL_PRODUCT_URL,
        is_reusable: true,
      },
    },
  }

  return response
}

const sendReserveTemplate = () => {
  const response = {
    attachment: {
      type: 'image',
      payload: {
        url: MEDICAL_PRODUCT_URL,
        is_reusable: true,
      },
    },
  }

  return response
}

export {
  sendGetStartedTemplate,
  sendMainMenuTemplate,
  sendGuidanceTemplate1,
  sendGuidanceTemplate2,
  sendMedicalProductTemplate1,
  sendMedicalProductTemplate2,
}
