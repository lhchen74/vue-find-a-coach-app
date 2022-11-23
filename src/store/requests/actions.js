import axios from 'axios';

export default {
  async contactCoach (context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };

    try {
      const result = await axios.post('http://localhost:5000/requests', newRequest)
      newRequest.id = result.id;
      context.commit('addRequest', newRequest);
    } catch (err) {
      const error = new Error(
        err.response.data.error || 'Failed to fetch'
      );
      throw error;
    }
  },

  async fetchRequests (context) {
    const { coachId, token } = context.rootGetters;

    try {
      const res = await axios.get('http://localhost:5000/requests/' + coachId, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      context.commit('setRequests', res.data.requests);
    } catch (err) {
      console.log(err);
      const error = new Error(
        err.response.data.error || err.response.data || 'Failed to send request.'
      );
      throw error;
    }
  }
}