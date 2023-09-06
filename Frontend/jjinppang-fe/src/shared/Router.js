import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Main from '../pages/Main'
import Signup from '../pages/Signup'
import EmailLogin from '../pages/EmailLogin'

function App() {
    return (
        <Router>
            {/* <Navbar clientRef={clientRef} /> */}
            <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/emailLogin" element={<EmailLogin />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    )
}

export default App
