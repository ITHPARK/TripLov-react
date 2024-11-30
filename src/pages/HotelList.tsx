import { useEffect, Fragment } from 'react'
import useHotels from '@components/hotelList/hooks/useHotel'
import Top from '@shared/Top'
import Spacing from '@shared/Spacing'
import Hotel from '@/components/hotelList/Hotel'
import InfiniteScroll from 'react-infinite-scroller'

const HotelList = () => {
    /*
    hotels : 호텔 데이터 배열
    isLoading : 로딩중인지 확인
    hasNextPage : 다음 데이터가 있는지
    loadMore : 다음 데이터 로딩 함수
     */
    const { data: hotels, isLoading, hasNextPage, loadMore } = useHotels()

    useEffect(() => {
        console.log(hotels)
    }, [hotels])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Top title={'인기 호텔'} subTitle={'호텔부터 펜션까지 최저가'} />

            <InfiniteScroll
                pageStart={0}
                hasMore={hasNextPage}
                loader={<>LOading...</>}
                loadMore={loadMore}
            >
                <ul>
                    {hotels?.map((hotel) => {
                        console.log(hotel)
                        return (
                            <Fragment>
                                <Hotel hotel={hotel} />
                                <Spacing
                                    size={7}
                                    backgroundColor={'gray100'}
                                ></Spacing>
                            </Fragment>
                        )
                    })}
                </ul>
            </InfiniteScroll>
        </div>
    )
}

export default HotelList
