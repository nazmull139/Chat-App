import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { apiClient } from './lib/api-client'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/Profile'
import { useAppStore } from './store'
import { AUTH_ROUTES } from './utils/constants'

const PrivateRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth"/>
}
const AuthRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat"/> : children 
}

const App = () => {

   const {userInfo, setUserInfo} = useAppStore();
    const[loading , setLoading] = useState(true);


  useEffect(()=>{
    const getUserData = async () =>{
      try {
          const response = await apiClient.get(`${AUTH_ROUTES}/user-info`,{
            withCredentials:true,
          });
          if(response.status === 200 && response.data.id){
            setUserInfo(response.data);
          }else{
            setUserInfo(undefined)
          }
          console.log("Appjsx",response)
      } catch (error) {
        setUserInfo(undefined)
      } finally {
        setLoading(false)
      }

    }
    if(!userInfo){
      getUserData();
    }else{
      setLoading(false)
    }
   

     

  },[userInfo,setUserInfo])


if(loading){
  return <div>Loading......</div>
}

  return (
<BrowserRouter>
    <Routes>
      <Route 
        path='/auth' 
        element={
        <AuthRoute>
          <Auth/>
          </AuthRoute>
        }>

        </Route>

      <Route 
      path='/chat' 
      element={
      <PrivateRoute>
        <Chat/>
        </PrivateRoute>
      }>

      </Route>

      <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
      <Route path='*' element={<Navigate to='/auth'/>}></Route>
    </Routes>

</BrowserRouter>
  )
}

export default App