const validForm = (userData) => {
  if (Object.values(userData).includes(null)) {
    return false
  }
  return true
}

export default validForm