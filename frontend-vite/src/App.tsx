import { useState } from 'react'
import { Routes, Route, Router, BrowserRouter } from "react-router"
import ChatPage from "./ChatPage"
import LoginPage from './LoginPage'
import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<LoginPage/>}></Route>
        <Route path={'/chat'} element={<ChatPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
