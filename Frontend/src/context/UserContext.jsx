import React, { createContext } from 'react'

export const UserContextData = createContext()

const UserContext = ({children}) => {
   
    const [user, setUser] = React.useState({
        email:"",
        fullname:{
            firstname:"",
            lastname:""
        }
    })
  return (
    <div>
        <UserContextData.Provider value={{user}}>
            {children}
        </UserContextData.Provider>
    </div>
  )
}

export default UserContext