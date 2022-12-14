import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: {
    userId: null,
    token: null,
    didAutoLogout: false
  },
  actions,
  mutations,
  getters
}