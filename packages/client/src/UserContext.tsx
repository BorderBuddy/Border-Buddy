import React, { createContext, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { User } from './models/models'

export interface UserContextProps {
    user: User | undefined
    setCurrUser: (user: User | undefined) => void
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)

type UserProviderProps = {
    children: React.ReactNode
  }
export const UserProvider = ({children} : UserProviderProps) => {
  const [user, setUser] = useState<User>()

  const setCurrUser = async (user: User | undefined) => {
    setUser(user)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setCurrUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserConsumer = UserContext.Consumer
