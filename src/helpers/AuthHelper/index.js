
export function checkIfExpired(expires_at) {// false if expired or not registered
  if(expires_at !== '')
    return !(new Date(expires_at) > new Date())
  return true
}
