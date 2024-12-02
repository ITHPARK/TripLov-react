import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelList from '@pages/HotelList'
import Hotel from '@pages/Hotel'
import Test from '@pages/Test'

import useLoadKakao from '@hooks/useLoadKakao'

function App() {
    useLoadKakao()

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HotelList />}></Route>
                <Route path="/test" element={<Test />}></Route>
                <Route path="/hotel/:id" element={<Hotel />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
