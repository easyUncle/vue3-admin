const TOKEN_KEY = 'Admin-Token'
export const setToken = value => {
  if (typeof value === 'object') {
    JSON.stringify(value)
  }
  localStorage.setItem(TOKEN_KEY, value)
}

export const getToken = () => {
  let data = localStorage.getItem(TOKEN_KEY)
  try {
    data = JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
  return data
}

export const removeToken = () => {
  localStorage.setToken(TOKEN_KEY)
}
