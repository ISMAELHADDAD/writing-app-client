import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

class API {

  static async getDiscussion(id) {
    let res = await axios.get(`${ENDPOINT}/discussions/${id}`);
    return res.data;
  }

  static async getUserById(id){
    let res = await axios.get(`${ENDPOINT}/users/${id}`);
    return res.data;
  }

  static async sendArgument(discussionId, object) {
    let res = await axios.post(`${ENDPOINT}/discussions/${discussionId}/arguments`, object);
    return res.data;
  }

  static async sendAgreement(discussionId, object) {
    let res = await axios.post(`${ENDPOINT}/discussions/${discussionId}/agreements`, object);
    return res.data;
  }

  static async acceptAgreement(discussionId, agreementId, object) {
    let res = await axios.put(`${ENDPOINT}/discussions/${discussionId}/agreements/${agreementId}`, object);
    return res.data;
  }

  static async rejectAgreement(discussionId, agreementId, object) {
    let res = await axios.put(`${ENDPOINT}/discussions/${discussionId}/agreements/${agreementId}`, object);
    return res.data;
  }

  static async varifyGoogleTokenId(object) {
    let res = await axios.post(`${ENDPOINT}/tokensignin`, object);
    return res.data;
  }
}

export default API
