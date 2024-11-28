import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelList from '@pages/HotelList'
import Test from '@pages/Test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
