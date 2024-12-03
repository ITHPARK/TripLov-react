import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelList from '@pages/HotelList'
import Hotel from '@pages/Hotel'
import Test from '@pages/Test'
import My from '@pages/My'
import SigninPage from '@pages/SigninPage'
import AuthGuard from '@components/auth/AuthGuard'
import Navbar from '@components/shared/Navbar'
import useLoadKakao from '@hooks/useLoadKakao'
import PrivateRoute from '@components/auth/PrivateRoute'
import SettingsPage from '@pages/settings'
import Like from '@pages/settings/Like'

function App() {
    useLoadKakao()

    return (
        <BrowserRouter>
            <AuthGuard>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HotelList />}></Route>
                    <Route path="/test" element={<Test />}></Route>
                    <Route path="/hotel/:id" element={<Hotel />}></Route>
                    <Route path="/my" element={<My />}></Route>
                    <Route path="/signin" element={<SigninPage />}></Route>
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                <SettingsPage />
                            </PrivateRoute>
                        }
                    ></Route>
                    <Route
                        path="/settings/like"
                        element={
                            <PrivateRoute>
                                <Like />
                            </PrivateRoute>
                        }
                    ></Route>
                </Routes>
            </AuthGuard>
        </BrowserRouter>
    )
}

export default App
