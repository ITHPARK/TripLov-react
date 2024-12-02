import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelList from '@pages/HotelList'
import Hotel from '@pages/Hotel'
import Test from '@pages/Test'
import My from '@pages/My'
import SigninPage from '@pages/SigninPage'
import AuthGuard from '@components/auth/AuthGuard'
import Navbar from '@components/shared/Navbar'
import useLoadKakao from '@hooks/useLoadKakao'

function App() {
    useLoadKakao()

    return (
        <BrowserRouter>
            <AuthGuard>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HotelList />}></Route>
                    <Route path="/test" element={<Test />}></Route>
                    <Route path="/hotel/:id" element={<My />}></Route>
                    <Route path="/my" element={<Hotel />}></Route>
                    <Route path="/signin" element={<SigninPage />}></Route>
                </Routes>
            </AuthGuard>
        </BrowserRouter>
    )
}

export default App
