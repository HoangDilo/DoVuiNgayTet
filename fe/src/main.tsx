import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.scss'
import Root from './Root.tsx'
import Login from './Login/Login.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Root />}
    >
      <Route
        index
        element={<App />}
      />
      <Route path='/abc' element={<div>abc</div>}/>
      <Route path='/login' element={<Login />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
