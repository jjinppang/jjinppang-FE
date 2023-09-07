import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Main from '../pages/Main'
import Signup from '../pages/Signup'
import EmailLogin from '../pages/EmailLogin'
import Redirection from '../socialLogin/Redirection'


function Router() {
    return (
        <BrowserRouter>
            {/* <Navbar clientRef={clientRef} /> */}
            <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/emailLogin" element={<EmailLogin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login/redirect" element={<Redirection />} />
            </Routes>
        </BrowserRouter>
    )


}

export default Router