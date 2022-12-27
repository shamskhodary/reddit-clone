import {
  createContext, ReactElement, useContext, useEffect, useMemo, useState,
} from 'react'
import IAuthContextProp from '../interfaces/props/IAuthContextProp'
import ApiService from '../services/ApiService'
import JwtService from '../services/JwtService'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }: IAuthContextProp):ReactElement => {
  const [user, setUser] = useState({})
  const [error, setError] = useState<string|null>('')

  const signup = async (val:object):Promise<{isLogged: boolean, error:any}> => {
    try {
      const response = await ApiService.post('/api/v1/auth/signup', val)
      if (response.status === 200) {
        JwtService.setToken(response.data.token)
        ApiService.setHeader()
      }
      return { isLogged: true, error: null }
    } catch (err) {
      return { isLogged: false, error }
    }
  }

  const signout = ():void => {
    JwtService.clearToken()
    ApiService.setHeader()
    setUser({})
    setError(null)
  }

  useEffect(() => {
    const isAuthenticated = async ():Promise<void> => {
      try {
        const userInfo = await ApiService.get('/api/v1/users/me')
        if (userInfo.status === 200) {
          setUser(userInfo.data)
        }
      } catch (err:any) {
        setError(err.message)
      }
    }
    isAuthenticated()
  }, [])

  const values = useMemo(() => ({
    user,
    signup,
    signout,
  }), [user])

  return (
    <AuthContext.Provider value={values}>
      {error && <p>{error}</p>}
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = ():any => useContext(AuthContext)
