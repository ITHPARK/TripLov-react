import React, { useState, useEffect, MouseEvent } from 'react'
import { HotelProps } from '@/models/hotel'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Tag from '@shared/Tag'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import { formatNumber } from '@/utils/formatNumber'
import { formatTime } from '@/utils/formatTime'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'

const HotelItem = ({
    hotel,
    isLike,
    onLike,
}: {
    hotel: HotelProps
    isLike: boolean
    onLike: ({
        hotel,
    }: {
        hotel: Pick<HotelProps, 'name' | 'mainImageUrl' | 'id'>
    }) => void
}) => {
    const [remaining, setRemaining] = useState(0)

    useEffect(() => {
        //이벤트가 없거나 이벤트는 있지만 기한이 없다면 그냥 리턴
        if (hotel.events == null || hotel.events.promoEndTime == null) {
            return
        }

        const promoEndTime = hotel.events.promoEndTime

        //실시간으로 1초씩 증가하게 해줄 것
        const interval = setInterval(() => {
            //이벤트 종료까지 남은 시간
            const remSec = differenceInMilliseconds(
                parseISO(promoEndTime),
                new Date(),
            )

            //시간 종료
            if (remSec < 0) {
                clearInterval(interval)
            }

            setRemaining(remSec)
        }, 1000)

        //컴포넌트 언마운트 시 interval 제거
        return () => clearInterval(interval)
    }, [hotel.events])

    const tagComponent = () => {
        if (hotel.events == null) {
            return null
        }

        const { name } = hotel.events

        //남은 ms 시간을 시 분 초 로 나누어 출력
        const promoText = remaining > 0 ? `- ${formatTime(remaining)} 남음` : ''

        return <Tag>{name.concat(promoText)}</Tag>
    }

    const handleLike = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        onLike({
            hotel: {
                name: hotel.name,
                id: hotel.id,
                mainImageUrl: hotel.mainImageUrl,
            },
        })
    }

    return (
        <Link to={`/hotel/${hotel.id}`}>
            <ListRow
                contents={
                    <Flex direction="column">
                        {tagComponent()}
                        <ListRow.Texts
                            title={hotel.name}
                            subTitle={hotel.comment}
                        />
                        <Spacing size={5} />
                        <Text
                            typography="t7"
                            color={'gray600'}
                        >{`${hotel.startRating}성급`}</Text>
                    </Flex>
                }
                right={
                    <Flex direction="column" align="center">
                        <div
                            css={css`
                                position: relative;
                            `}
                        >
                            <span css={imageHeart} onClick={handleLike}>
                                {isLike ? (
                                    <img
                                        src="https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png"
                                        alt="찜하기 이미지"
                                        width="100%"
                                        height="100%"
                                    />
                                ) : (
                                    <img
                                        src="https://cdn1.iconfinder.com/data/icons/bootstrap-vol-3/16/heart-64.png"
                                        alt="찜하기 이미지"
                                        width="100%"
                                        height="100%"
                                    />
                                )}
                            </span>
                            <img
                                src={hotel.mainImageUrl}
                                alt={hotel.name}
                                css={imageBox}
                            />
                        </div>

                        <Text typography="t6" bold={true}>
                            {formatNumber(hotel.price)}원
                        </Text>
                    </Flex>
                }
                style={ContainerStyles}
            />
        </Link>
    )
}

const ContainerStyles = css`
    align-items: flex-start;
`

const imageBox = css`
    width: 90px;
    height: 110px;
    border-radius: 5px;
    object-fit: cover;
`

const imageHeart = css`
    width: 18px;
    height: 18px;
    position: absolute;
    right: 5px;
    top: 5px;
`

export default HotelItem
