import Container from "@mui/material/Container"
import { Routes, Route } from "react-router-dom"
import { Header } from "./components"
import { Home, FullPost, Registration, AddPost, Login } from "./pages"
import {useDispatch,useSelector} from "react-redux"
import React from "react"
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth"

function App() {
  const distpatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(()=>{
    distpatch(fetchAuthMe())
  },[])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/posts/:id' element={<FullPost />}></Route>
          <Route path='/posts/:id/edit' element={<AddPost />}></Route>
          <Route path='/add-post' element={<AddPost /> }></Route>
          <Route path='/login' element={<Login /> }></Route>
          <Route path='/register' element={<Registration />}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default App
