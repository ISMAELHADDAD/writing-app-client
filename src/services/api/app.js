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

  static async sendArgument(token, discussionId, object) {
    let headers = { 'Authorization': token }
    let res = await axios.post(`${ENDPOINT}/discussions/${discussionId}/arguments`, object, {headers: headers});
    return res.data;
  }

  static async sendAgreement(token, discussionId, object) {
    let headers = { 'Authorization': token }
    let res = await axios.post(`${ENDPOINT}/discussions/${discussionId}/agreements`, object, {headers: headers});
    return res.data;
  }

  static async acceptAgreement(token, discussionId, agreementId, object) {
    let headers = { 'Authorization': token }
    let res = await axios.put(`${ENDPOINT}/discussions/${discussionId}/agreements/${agreementId}`, object, {headers: headers});
    return res.data;
  }

  static async rejectAgreement(token, discussionId, agreementId, object) {
    let headers = { 'Authorization': token }
    let res = await axios.put(`${ENDPOINT}/discussions/${discussionId}/agreements/${agreementId}`, object, {headers: headers});
    return res.data;
  }

  static async varifyGoogleTokenId(object) {
    let res = await axios.post(`${ENDPOINT}/tokensignin`, object);
    return res.data;
  }

  static async inviteToParticipate(token, discussionId, object) {
    let headers = { 'Authorization': token }
    let res = await axios.post(`${ENDPOINT}/discussions/${discussionId}/invite`, object, {headers: headers});
    return res.data;
  }

  static async verifyInvitation(token, discussionId, object) {
    let headers = { 'Authorization': token }
    let res = await axios.put(`${ENDPOINT}/discussions/${discussionId}/verify_invitation`, object, {headers: headers});
    return res.data;
  }

  static async assignAvatar(token, discussionId, avatarId, object) {
    let headers = { 'Authorization': token }
    let res = await axios.put(`${ENDPOINT}/discussions/${discussionId}/avatar/${avatarId}/assign`, object, {headers: headers});
    return res.data;
  }

  static async getMyDiscussions(page, id) {
    let res = await axios.get(`${ENDPOINT}/discussions?page=${page}&user_id=${id}`);
    return res.data;
  }

  static async createNewDiscussion(token, object) {
    let headers = { 'Authorization': token }
    let res = await axios.post(`${ENDPOINT}/discussions`, object, {headers: headers});
    return res.data;
  }

  static async deleteDiscussion(token, discussionId) {
    let headers = { 'Authorization': token }
    let res = await axios.delete(`${ENDPOINT}/discussions/${discussionId}`, {headers: headers});
    return res.data;
  }

  static async getPublicDiscussions(page) {
    let res = await axios.get(`${ENDPOINT}/discussions?page=${page}`);
    return res.data;
  }

}

export default API
