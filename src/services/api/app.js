import axios from 'axios';

class API {

  static async getDiscussion(id) {
    let res = await axios.get(`https://ideashub-api.herokuapp.com/discussions/${id}`);
    return res.data;
  }

  static getUserById(id){
    return {
      id: 1,
      name: 'user1234'
    }
  }
}

export default API
