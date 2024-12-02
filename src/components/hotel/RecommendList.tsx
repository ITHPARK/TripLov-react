import React, { useState, useEffect } from 'react'
import useRecommendList from './hooks/useRecommendList'
import ListRow from '@shared/ListRow'
import Top from '@shared/Top'
import { css } from '@emotion/react'
import Button from '@shared/Button'
import { formatNumber } from '@/utils/formatNumber'
import { HotelProps } from '@models/hotel'

const RecommendList = ({ hotelIds }: { hotelIds: string[] }) => {
    const { data, isFetching } = useRecommendList({ hotelIds })
    const [showMore, setShowMore] = useState(false)
    const [sliceList, setSliceList] = useState<HotelProps[] | null>()

    useEffect(() => {
        if (data != null) {
            const sliceData =
                data.length > 3 && showMore ? data : data.slice(0, 3)

            setSliceList(sliceData)
        }
    }, [showMore, data])

    if (isFetching) {
        return <div>Loading...</div>
    }

    //데이터가 3개 이상이면 3개만 출력한다.
    // const sliceList = data!.length < 3 && showMore ? data : data?.slice(0, 3)

    return (
        <div>
            <Top title="추천 숙소" subTitle="추천 숙소" />
            <ul>
                {sliceList?.map((hotel, index) => {
                    return (
                        <>
                            <ListRow
                                key={index}
                                left={
                                    <img
                                        src={hotel.mainImageUrl}
                                        alt={hotel.name}
                                        css={recommendImageStyles}
                                    />
                                }
                                contents={
                                    <ListRow.Texts
                                        title={hotel.name}
                                        subTitle={`${formatNumber(hotel.price)}원`}
                                    />
                                }
                            />
                        </>
                    )
                })}
            </ul>
            {data!.length > 3 && showMore === false ? (
                <div style={{ marginTop: '16px ', padding: '0 24px' }}>
                    <Button
                        onClick={() => setShowMore(true)}
                        full={true}
                        transparent={true}
                    >
                        더 보기
                    </Button>
                </div>
            ) : null}
        </div>
    )
}

const recommendImageStyles = css`
    width: 90px;
    height: 110px;
    object-fit: cover;
    border-radius: 5px;
`

export default RecommendList
