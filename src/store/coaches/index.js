import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state () {
    return {
      lastFetch: null,
      coaches: [
        // {
        //   id: 'c1',
        //   firstName: 'Bleach',
        //   lastName: 'Chen',
        //   areas: ['frontend', 'backend', 'career'],
        //   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quam!',
        //   hourRate: 30
        // },
        // {
        //   id: 'c2',
        //   firstName: 'Claire',
        //   lastName: 'Chen',
        //   areas: ['frontend', 'backend'],
        //   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quam!',
        //   hourRate: 20
        // }
      ]
    }
  },
  actions,
  mutations,
  getters
}