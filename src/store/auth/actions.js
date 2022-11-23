import axios from "axios"

let timer;

export default {
  async auth (context, payload) {
    const mode = payload.mode;
    let url = 'http://localhost:5000/users/login';

    if (mode === 'signup') {
      url = 'http://localhost:5000/users/register';
    }

    try {
      const res = await axios.post(url, {
        email: payload.email,
        password: payload.password
      })

      const { id, token, expiresIn } = res.data;
      const expiresInMilliSeconds = expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresInMilliSeconds;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(() => {
        context.dispatch('autoLogout')
      }, expiresInMilliSeconds);

      context.commit('setUser', {
        token,
        userId: id
      });

    } catch (err) {
      console.log(err);
      const error = new Error(
        err.response.data.error || 'Failed to authenticate.'
      );
      throw error;
    }
  },

  tryLogin (context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token, userId,
      })
    }
  },

  async login (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },

  async signup (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },

  logout (context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    })
  },

  autoLogout (context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
}