import { GET_STARTED_IMAGE_URL } from '../../constants/images'
import { menuLinks } from '../../constants/images'

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

export { sendGetStartedTemplate, sendMainMenuTemplate }