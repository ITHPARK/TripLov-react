import React, { useEffect } from 'react'
import Carousel from '@/components/hotel/Carousel'
import Content from '@/components/hotel/Content'
import Rooms from '@/components/hotel/Rooms'
import useHotel from '@components/hotel/hooks/useHotel'
import { useParams } from 'react-router-dom'
import Top from '@components/shared/Top'
import Map from '@components/hotel/Map'
import RecommendList from '@components/hotel/RecommendList'
import ActionButtons from '@components/hotel/ActionButtons'

const Hotel = () => {
    const { id } = useParams() as { id: string }

    const { data, isLoading } = useHotel({ id })

    if (data == null || isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
            {' '}
            <Top title={data.name} subTitle={data.comment} />
            <Carousel images={data.images} />
            <ActionButtons hotel={data} />
            <Content contents={data.contents} />
            <Rooms hotelId={data.id} />
            <Map location={data.location} />
            <RecommendList hotelIds={data.recommendHotelList} />
        </>
    )
}

export default Hotel
