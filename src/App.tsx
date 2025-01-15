import { createContext, Dispatch, useReducer } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import User from './components/User'
import { RouterProvider } from 'react-router'
import { router } from './router'
import UserName from './components/UserName'

type action = {
  type: string,
  data: User
}
type userContxtType = [User, Dispatch<action>]
export const UserContext = createContext<userContxtType>([{} as User, () => { }])


const userReducer = (state: User, action: action) => {
  switch (action.type) {
    case 'LOGIN':
      state.password = state.password != action.data.password ? action.data.password : state.password
      state.email = state.email != action.data.email ? action.data.email : state.email
      state.firstName=state.firstName!=action.data.email?action.data.email:state.email
      return state
    case 'UPDATE':

      state.firstName = action.data.firstName ?? state.firstName
      state.lastName = action.data.lastName ?? state.lastName
      state.address = action.data.address ?? state.address
      state.email = action.data.email ?? state.email
      state.password = action.data.password ?? state.password
      state.phoneNumber = action.data.phoneNumber ?? state.phoneNumber

      return state
    default:
      return state

  }
}

function App() {

  const [user, userDispatch] = useReducer(userReducer, {} as User)
  return (
    <>
      <UserContext.Provider value={[user, userDispatch]}>
        <HomePage />
      </UserContext.Provider>
      <RouterProvider router={router} />
    </>
  )
}

export default App
