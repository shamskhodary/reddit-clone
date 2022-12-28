import {
  createContext, ReactElement, useContext, useEffect, useMemo, useState,
} from 'react'
import { IUser } from '../interfaces'
import IAuthContextProp from '../interfaces/props/IAuthContextProp'
import ApiService from '../services/ApiService'
import JwtService from '../services/JwtService'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }: IAuthContextProp):ReactElement => {
  const [user, setUser] = useState<IUser|null>(null)

  const signup = async (val:object):Promise<{isLogged: boolean, error:any}> => {
    try {
      const response = await ApiService.post('/api/v1/auth/signup', val)

      if (response.status === 200) {
        setUser(response.data.user)
        JwtService.setToken(response.data.token)
        ApiService.setHeader()
      }

      return { isLogged: true, error: null }
    } catch (error) {
      return { isLogged: false, error }
    }
  }

  const signin = async (val:object):Promise<{isLogged: boolean, error:any}> => {
    try {
      const response = await ApiService.post('/api/v1/auth/signin', val)

      if (response.status === 200) {
        setUser(response.data.user)
        JwtService.setToken(response.data.token)
        ApiService.setHeader()
      }

      return { isLogged: true, error: null }
    } catch (error) {
      return { isLogged: false, error }
    }
  }

  const signout = ():void => {
    JwtService.clearToken()
    ApiService.setHeader()
    setUser(null)
  }

  useEffect(() => {
    const isAuthenticated = async ():Promise<void> => {
      try {
        const userInfo = await ApiService.get('/api/v1/users/me')
        if (userInfo.status === 200) {
          setUser(userInfo.data)
        }
      } catch (err:any) {
        setUser(null)
      }
    }
    isAuthenticated()
  }, [])

  const values = useMemo(() => ({
    user,
    signup,
    signout,
    signin,
    setUser,
  }), [user])

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = ():any => useContext(AuthContext)
