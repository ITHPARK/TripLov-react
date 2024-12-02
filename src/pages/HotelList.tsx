import { useEffect, Fragment } from 'react'
import useHotels from '@components/hotelList/hooks/useHotel'
import Top from '@shared/Top'
import Spacing from '@shared/Spacing'
import HotelItem from '@/components/hotelList/HotelItem'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { css } from '@emotion/react'

const HotelList = () => {
    const lastHotelRef = useIntersectionObserver(() => {
        if (!isLoading && hasNextPage) {
            loadMore()
        }
    })

    /*
    hotels : 호텔 데이터 배열
    isLoading : 로딩중인지 확인
    hasNextPage : 다음 데이터가 있는지
    loadMore : 다음 데이터 로딩 함수
     */
    const { data: hotels, isLoading, hasNextPage, loadMore } = useHotels()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Top title={'인기 호텔'} subTitle={'호텔부터 펜션까지 최저가'} />

            <ul
                css={css`
                    position: relative;
                `}
            >
                {hotels?.map((hotel, index) => {
                    const isLast = index === hotels.length - 1
                    return (
                        <Fragment>
                            <HotelItem hotel={hotel} key={index} />
                            <Spacing
                                size={7}
                                backgroundColor={'gray100'}
                            ></Spacing>
                            {isLast && (
                                <div
                                    ref={lastHotelRef}
                                    style={{
                                        height: '150px',
                                        position: 'absolute',
                                        bottom: 0,
                                    }}
                                />
                            )}
                        </Fragment>
                    )
                })}
            </ul>
        </div>
    )
}

export default HotelList
