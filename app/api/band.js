const ERROR_HTTP = 'HTTPError';
function BandAPI (baseUrl, storage) {
  let _session = {
    access_token: null
  };

  this.request = (method, path, params = {}) => {
    let url = baseUrl + path;
    if (method == 'GET' && !isEmpty(params)) {
      let query = encodeQuery(params);
      url = url + '?' + query;
    }
    let headers = {
      'method': method,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    if(_session.access_token != null){headers['Authorization'] = 'Bearer '+ _session.access_token;}
    let options = {method: method, url: url, headers: headers, json: true};
    if(method == 'POST' || method == 'PUT'){options['body'] = params}
    return new Promise(resolve=>{
      request(options, function(error, res) {
        console.log(res);
        if(!error){
          if(res.statusCode>=200 && res.statusCode<300){
            resolve(res.body);
          }else {
            new Error (ERROR_HTTP);
            resolve();
          }
        }else {
          new Error (error);
          resolve();
        }
      });
    });
  };

  let _save_session = (session) => {
    if(session.access_token != null){
      storage.setItem('access_token',  session.access_token);
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
    profile: async user_id => {
      if(user_id == null){
        return await this.request('GET', '/api/user');
      }else {
        return await this.request('GET', '/api/profile/'+user_id);
      }
    },
    login: (login, password) => {return session_open({login, password})},
    getSession: () => {return _session.access_token},
    updateProfile: async (profile)=>{
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
    }
  };
  this.friends = {
    list: async()=>{return await this.request('GET', '/api/friend/list')},
    search: async(data)=>{return await this.request('GET', '/api/search', data)},
  }

  _load_session()
  console.log('session loaded', _session)
}

function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(ERROR_HTTP)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

function checkError (response) {
  if (response.error) {
    let error = new Error(response.error_msg)
    error.name = response.error
    console.error(error)
    throw error
  }
  return response.result
}

function encodeQuery (params) {
  const esc = encodeURIComponent
  const query = Object.keys(params)
    .sort()
    .filter(k => params[k])
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
  return query
}

function isEmpty (obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export default BandAPI
