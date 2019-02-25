import axios from 'axios';

class API {

  static async getDiscussion(id) {
    //let res = await axios.get(`https://ideashub-api.herokuapp.com/discussions/${id}`);
    let res = await axios.get(`http://localhost:3000/discussions/${id}`);
    return res.data;
  }

  static getUserById(id){
    return {
      id: 1,
      name: 'user1234'
    }
  }

  static async sendArgument(discussionId, object) {
    let res = await axios.post(`http://localhost:3000/discussions/${discussionId}/arguments`, object);
    return res.data;
  }
}

export default API
