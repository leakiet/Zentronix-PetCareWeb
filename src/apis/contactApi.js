import axios from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
let url = `${API_ROOT}/apis/v1/contact`
const contactApi = {
  // Send contact form
  sendContactForm: async (contactData) => {
    const response = await axios.post(`${url}/send`, contactData)
    return response.data
  }
}

export default contactApi
