import React, { useEffect } from 'react'
import Carousel from '@/components/hotel/Carousel'
import useHotel from '@components/hotel/hooks/useHotel'
import { useParams } from 'react-router-dom'
import Top from '@components/shared/Top'

const Hotel = () => {
    const { id } = useParams() as { id: string }

    const { data, isLoading } = useHotel({ id })

    useEffect(() => {
        if (data != null) {
            console.log(data.name)
        }
    }, [data])

    if (data == null || isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
            {' '}
            <Top title={data.name} subTitle={data.comment} />
            <Carousel images={data.images} />
        </>
    )
}

export default Hotel