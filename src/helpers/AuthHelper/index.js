
export function checkIfExpired(expiresAt) {// false if expired or not registered
  if(expiresAt !== '')
    return !(new Date(expiresAt) > new Date())
  return true
}
