import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

class API {

  static async getDiscussion(id) {
    let res = await axios.get(`${ENDPOINT}/discussions/${id}`);
    return res.data;
  }

  static async getDiscussionArguments(id) {
    let res = await axios.get(`${ENDPOINT}/discussions/${id}/arguments`);
    return res.data;
  }

  static async getDiscussionAgreements(id) {
    let res = await axios.get(`${ENDPOINT}/discussions/${id}/agreements`);
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

  static async getMyDiscussions(token, page, id) {
    let headers = { 'Authorization': token }
    let res = await axios.get(`${ENDPOINT}/discussions?page=${page}&user_id=${id}`, {headers: headers});
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

  static async forkDiscussion(token, discussionId) {
    let headers = { 'Authorization': token }
    let res = await axios.put(`${ENDPOINT}/discussions/${discussionId}/fork`, null, {headers: headers});
    return res.data;
  }

  static async getComments(discussionId, argumentId) {
    let comments = [
      {
        id: 1,
        user: {
          id: 1,
          name: 'Matt',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'
        },
        text: 'How artistic!',
        date: '2019-04-24T09:20:13.409Z'
      },
      {
        id: 2,
        user: {
          id: 2,
          name: 'Elliot Fu',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
        },
        text: 'This has been very useful for my research. Thanks as well!',
        date: '2019-04-24T09:20:30.409Z'
      },
      {
        id: 3,
        user: {
          id: 3,
          name: 'Joe Henderson',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
        },
        text: 'Dude, this is awesome. Thanks so much :)',
        date: '2019-04-24T09:20:45.409Z'
      },
      {
        id: 4,
        user: {
          id: 2,
          name: 'Elliot Fu',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
        },
        text: 'This has been very useful for my research. Thanks as well!',
        date: '2019-04-24T09:20:30.409Z'
      },
      {
        id: 5,
        user: {
          id: 3,
          name: 'Joe Henderson',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
        },
        text: 'Dude, this is awesome. Thanks so much :)',
        date: '2019-04-24T09:20:45.409Z'
      },
      {
        id: 6,
        user: {
          id: 2,
          name: 'Elliot Fu',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
        },
        text: 'This has been very useful for my research. Thanks as well!',
        date: '2019-04-24T09:20:30.409Z'
      },
      {
        id: 7,
        user: {
          id: 3,
          name: 'Joe Henderson',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
        },
        text: 'Dude, this is awesome. Thanks so much :)',
        date: '2019-04-24T09:20:45.409Z'
      },
      {
        id: 8,
        user: {
          id: 2,
          name: 'Elliot Fu',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
        },
        text: 'This has been very useful for my research. Thanks as well!',
        date: '2019-04-24T09:20:30.409Z'
      },
      {
        id: 9,
        user: {
          id: 3,
          name: 'Joe Henderson',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
        },
        text: 'Dude, this is awesome. Thanks so much :)',
        date: '2019-04-24T09:20:45.409Z'
      },
      {
        id: 10,
        user: {
          id: 2,
          name: 'Elliot Fu',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
        },
        text: 'This has been very useful for my research. Thanks as well!',
        date: '2019-04-24T09:20:30.409Z'
      },
      {
        id: 11,
        user: {
          id: 3,
          name: 'Joe Henderson',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
        },
        text: 'Dude, this is awesome. Thanks so much :)',
        date: '2019-04-24T09:20:45.409Z'
      },
      {
        id: 12,
        user: {
          id: 2,
          name: 'Elliot Fu',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
        },
        text: 'This has been very useful for my research. Thanks as well!',
        date: '2019-04-24T09:20:30.409Z'
      },
      {
        id: 13,
        user: {
          id: 3,
          name: 'Joe Henderson',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
        },
        text: 'Dude, this is awesome. Thanks so much :)',
        date: '2019-04-24T09:20:45.409Z'
      },
      {
        id: 14,
        user: {
          id: 2,
          name: 'Elliot Fu',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
        },
        text: 'This has been very useful for my research. Thanks as well! earch. Thanks as well! earch. Thanks as well!  earch. Thanks as well!  earch. Thanks as well! earch. Thanks as well! earch. Thanks as well! earch. Thanks as well! ',
        date: '2019-04-24T09:20:30.409Z'
      },
      {
        id: 15,
        user: {
          id: 3,
          name: 'Joe Henderson',
          imageUrl: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
        },
        text: 'Dude, this is awesome. Thanks so much :)',
        date: '2019-04-24T09:20:45.409Z'
      }
    ]
    return comments;
  }

  static async sendComment(token, discussionId, argumentId, object) {
    let comment = {
      id: Math.floor((Math.random() * 100) + 1),
      user: {
        id: 1,
        name: 'Matt',
        imageUrl: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'
      },
      text: object.text,
      date: '2019-04-24T09:20:13.409Z'
    }
    return comment;
  }

}

export default API
