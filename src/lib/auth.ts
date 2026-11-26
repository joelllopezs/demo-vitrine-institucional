// Autenticação SIMULADA no frontend, apenas para demonstração. Não é segurança real.
const KEY = 'via-mineira:admin'
export const isLogged = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}
export const login = (user: string, pass: string) => {
  if (user.trim() === 'admin' && pass === '123456') {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    return true
  }
  return false
}
export const logout = () => {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
