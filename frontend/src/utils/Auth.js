export const BASE_URL = 'http://localhost:3000'

export const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Auth-Ошибка: ${res.status}`)
  }
  return res.json()
}

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: data.password,
      email: data.identifier,
    })
  })
  .then((res) => {
    return getResponseData(res)
  })
}

export const regg = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': data.password,
      'email': data.identifier
    })
  })
  .then((res) => getResponseData(res))
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => getResponseData(res))
}
