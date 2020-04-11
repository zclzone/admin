import Cookies from 'js-cookie'

const TokenKey = 'U-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, { expires: new Date(new Date().getTime() + 30 * 60 * 1000) })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getLang () {
  return Cookies.get('Lang')
}

export function setLang (lang) {
  return Cookies.set('Lang', lang)
}

export function removeLang () {
  return Cookies.remove('Lang')
}