import axios from 'axios';

export default {
  async registerCoach (context, data) {

    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      areas: data.areas,
      hourRate: data.rate,
    }


    const token = context.rootGetters.token;

    await axios.post('http://localhost:5000/coaches', {
      ...coachData,
      areas: coachData.areas.join(","),
    }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    context.commit('registerCoach', coachData);
  },

  async loadCoaches (context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    try {
      const { data: { coaches } } = await axios.get('http://localhost:5000/coaches')
      coaches.map(coach => {
        coach.areas = coach.areas.split(',')
      });
      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');
    } catch (err) {
      console.log(err.response);
      const error = new Error(
        err.response.data.error || 'Failed to fetch'
      );
      throw error;
    }

  }
}