import React, { createContext, useState } from 'react'
import { User } from './models/models'

export interface UserContextProps {
    user: User | {}
    setCurrUser: (user: User) => void
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)

type UserProviderProps = {
    children: React.ReactNode
  }
export const UserProvider = ({children} : UserProviderProps) => {
  const [user, setUser] = useState<User>()

  const setCurrUser = async (user: User) => {
    // console.log(`The user passed in is: ${user}`)
    setUser(user)
  }

  return (
    <UserContext.Provider
      value={{
        user: user || {},
        setCurrUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserConsumer = UserContext.Consumer
