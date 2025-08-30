import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './page/Login'
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter>
        {/* <Header /> */}

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Login />} />
          <Route path='/topics' element={<Login />} />
          <Route path='/progress' element={<Login />} />

        </Routes>
        {/* <Footer /> */}

      </BrowserRouter>


    </>
  )
}

export default App
