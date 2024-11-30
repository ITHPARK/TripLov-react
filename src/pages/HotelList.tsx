import { useEffect } from 'react'
import useHotels from '@components/hotelList/hooks/useHotel'

const HotelList = () => {
    const { data: hotels } = useHotels()

    useEffect(() => {
        console.log(hotels)
    }, [hotels])

    return <div>hotelLIst</div>
}

export default HotelList
