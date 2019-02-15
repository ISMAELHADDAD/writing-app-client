import axios from 'axios';

class API {

  static async getDiscussion(id) {
    let res = await axios.get(`http://localhost:3000/discussions/${id}`);
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
