const options = {
  //url: 'http://localhost:3000',
  url: 'http://api.good.nomoredomains.xyz',
}

class Api {
  constructor(options) {
    this._url = options.url
    this._me = '/users/me'
    this._ava ='/users/me/avatar'
    this._cards = '/cards'
    this._likes = '/likes'
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  getUserInfo() {
    return fetch(this._url+this._me, {
      headers: {
        authorization: 'Bearer '+localStorage.jwt
      }
    })
    .then(
      (res) => {
        return this._getResponseData(res)
      }
    )
  }

  getCardsFromServer() {
    return fetch(this._url+this._cards, {
        headers: {
          authorization: 'Bearer '+localStorage.jwt
        }
    })
    .then((res) => {
        return this._getResponseData(res)
    })
  }

  changeAvatar(link) {
    return fetch(this._url+this._ava, {
      method: 'PATCH',
      headers: {
        authorization: 'Bearer '+localStorage.jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.link
      })
    })
    .then((res) => this._getResponseData(res))
  }

  loadProfile(obj) {
    return fetch(this._url+this._me, {
      method: 'PATCH',
      headers: {
        authorization: 'Bearer '+localStorage.jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      })
    }).then(
      (res) => this._getResponseData(res)
    )
  }

  loadNewCard(obj) {
    return fetch(this._url+this._cards, {
      method: 'POST',
      headers: {
        authorization: 'Bearer '+localStorage.jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: obj.name,
        link: obj.link,
      })
    }).then(
      (res) => this._getResponseData(res)
    )
  }

  delCard(id) {
    return fetch(this._url+this._cards+'/'+id, {
      method: 'DELETE',
      headers: {
          authorization: 'Bearer '+localStorage.jwt
        }
      }).then(
        (res) => this._getResponseData(res)
      )
  }

  changeLikeCardStatus(id, method) {
    return fetch(this._url+this._cards+'/'+id+this._likes, {
      method: method,
      headers: {
        authorization: 'Bearer '+localStorage.jwt
      }
    })
    .then(
      (res) => this._getResponseData(res)
    )

    .then( (res) => {
      return res.data
    })
  }
}

const api = new Api(options)
export default api
