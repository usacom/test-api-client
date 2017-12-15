import MicroEvent from '../lib/microevent';
import { isEmpty } from '../lib/util';
const ERROR_HTTP = 'HTTPError';

function BandAPI(baseUrl, storage) {
  let _session = {
    access_token: null
  };
  this.request = (method, path, params = {}) => {
    let url = baseUrl + path;
    if (method == 'GET' && !isEmpty(params)) {
      const query = encodeQuery(params);
      url = url + '?' + query;
    }
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    if (_session.access_token != null) {
      headers['Authorization'] = 'Bearer ' + _session.access_token;
    }
    const reqInit = {
      method,
      headers,
    };
    if (method == 'POST' || method == 'PUT') {
      reqInit.body = JSON.stringify(params);
    }
    console.log(method, url, _session, reqInit);
    return fetch(url, reqInit)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(checkError);
  };

  let _save_session = (session) => {
    if (session.access_token != null) {
      storage.setItem('access_token', session.access_token);
      storage.setItem('refresh_token', session.refresh_token);
      _session.access_token = session.access_token;
    }
  };

  let _load_session = () => {
    _session.access_token = storage.getItem('access_token');
  };

  let session_open = async ({login, password}) => {
    let session = await this.request('POST', '/oauth/token', {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'RU6BRQVBNugYJ4AN3maWyf6cgENePDCm9U84IUVr',
      username: login,
      password: password
    });
    console.log(session);
    _save_session(session);
    return session;
  };

  let session_check = async () => {
    if (_session.token) {
      try {
        await this.request('GET', '/api/user');
        return true
      } catch (e) {
        return false
      }
    }
    return false
  };

  this.user = {
    register: (nickname, email, password) => {
      return this.request('POST', '/api/register', {nickname, email, password});
    },
    profile: user_id => {
      if (user_id == null) {
        return this.request('GET', '/api/user');
      } else {
        return this.request('GET', '/api/profile/' + user_id);
      }
    },
    login: (login, password) => {
      return session_open({login, password})
    },
    logOut: () => {
      storage.clear();
    },
    getSession: () => {
      return _session.access_token
    },
    updateProfile: async (profile) => {
      let parms = {};
      if(profile.name != null){parms.name = profile.name}
      if(profile.last_name != null){parms.last_name = profile.last_name}
      if(profile.phone != null){parms.phone = profile.phone}
      if(profile.birthday != null){parms.birthday = profile.birthday}
      if(profile.gender != null){parms.gender = profile.gender}
      if(profile.job != null){parms.job = profile.job}
      if(profile.length != null){parms.length = profile.length}
      if(profile.weight != null){parms.weight = profile.weight}
      return await this.request('PUT', '/api/update', parms);
    },
    uploadAvatar: async (data)=>{
      return await this.request('POST', '/api/file/upload/avatar', data);
    },
  };
  this.friends = {
    list: () => {
      return this.request('GET', '/api/friend/list');
    },
    search: async (data) => {
      return await this.request('GET', '/api/search', data)
    },
    subscribes: async (type, numberPage) => {
      return await this.request('GET', '/api/friend/subscribes', { type, numberPage })
    },
    queryFriends: async (data) => {
      return await this.request('GET', '/api/friend/queryFriends', data)
    },
    sendRequest: async (data) => {
      return await this.request('POST', '/api/friend/sendRequest', data)
    },
    acceptRequest: async (id) => {
      return await this.request('PUT', '/api/friend/acceptRequest', {id})
    },
    denyRequest: async (id) => {
      return await this.request('PUT', '/api/friend/denyRequest', {id})
    },
    removeFriend: async (id) => {
      return await this.request('POST', '/api/friend/removeFriend', {id: id})
    },
  };
  this.messages = {
    list: async () => {
      return await this.request('GET', '/api/messages/list')
    },
    listUsers: async (id) => {
      return await this.request('GET', '/api/messages/users/'+id)
    },
    showDialog: async (id, params) => {
      return await this.request('GET', '/api/messages/show/'+id, params)
    },
    sendMessage: async (id, message) => {
      return await this.request('PUT', '/api/messages/show/'+id, {message})
    },
    openPrivate: (id) => {
      return this.request('POST', '/api/messages/openPrivate', {id})
    },
    newDialog: async (params) => {
      return await this.request('POST', '/api/messages/newDialog', params)
    },
    addUser: async (id, params) => {
      return await this.request('POST', '/api/messages/addUser/'+id, params)
    },
    leaveDialog: async (id) => {
      return await this.request('DELETE', '/api/messages/leaveDialog/'+id)
    },
    returnDialog: async (id) => {
      return await this.request('PUT', '/api/messages/returnDialog/'+id)
    },


  };


  _load_session();
  console.log('session loaded', _session)
}

MicroEvent.mixin(BandAPI);

function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(ERROR_HTTP);
    error.response = response;
    throw error;
  }
}

function parseJSON (response) {
  return response.json();
}

function checkError (response) {
  if (response.error) {
    const error = new Error(response.error_msg);
    error.name = response.error;
    console.error(error);
    throw error;
  }
  return response;
}

function encodeQuery (params) {
  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .sort()
    .filter(k => params[k])
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
  return query;
}

export default BandAPI
