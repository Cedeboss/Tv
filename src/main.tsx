import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ImageAnimated from './pages/ImageAnimated'
import ImageFixed from './pages/ImageFixed'
import 'bootstrap/dist/css/bootstrap.min.css'
import Player from './pages/Player'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/player/:id' element={<Player />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/image-fixe' element={<ImageFixed />} />
        <Route path='/images-animees' element={<ImageAnimated />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
