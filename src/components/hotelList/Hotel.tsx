import React from 'react'
import { HotelProps } from '@/models/hotel'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import { formatNumber } from '@utils/util'

const Hotel = ({ hotel }: { hotel: HotelProps }) => {
    return (
        <ListRow
            contents={
                <Flex direction="column">
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
                    <img
                        src={hotel.mainImageUrl}
                        alt={hotel.name}
                        css={imageBox}
                    />
                    <Text typography="t6" bold={true}>
                        {formatNumber(hotel.price)}원
                    </Text>
                </Flex>
            }
            style={ContainerStyles}
        />
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

export default Hotel
