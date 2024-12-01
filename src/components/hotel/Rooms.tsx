import React, { useEffect } from 'react'
import useRooms from './hooks/useRooms'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Tag from '@shared/Tag'
import Spacing from '@shared/Spacing'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import ListRow from '../shared/ListRow'
import { formatNumber } from '@/utils/formatNumber'
import Button from '../shared/Button'

const Rooms = ({ hotelId }: { hotelId: string }) => {
    const { data } = useRooms(hotelId)

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <Container>
            <Header justify="space-between" align="center">
                <Text bold={true} typography="t4">
                    객실정보
                </Text>
                <Text typography="t6" color="gray600">
                    1박, 세금 포함
                </Text>
            </Header>
            {data?.map((room) => {
                const promoEnd = room.avaliableCount === 1
                const noRoom = room.avaliableCount === 0

                return (
                    <ListRow
                        left={
                            <img
                                src={room.imageUrl}
                                alt={room.roomName}
                                css={imageStyles}
                            />
                        }
                        contents={
                            <ListRow.Texts
                                title={
                                    <Flex>
                                        <Text>{room.roomName}</Text>

                                        {promoEnd ? (
                                            <>
                                                <Spacing
                                                    size={6}
                                                    direction="horizontal"
                                                />
                                                <Tag backgroundColor="red">
                                                    마감임박
                                                </Tag>
                                            </>
                                        ) : null}
                                    </Flex>
                                }
                                subTitle={`${formatNumber(room.price)}원/`.concat(
                                    room.refundable ? '환불가능' : '환불불가',
                                )}
                            />
                        }
                        right={
                            <Button size="medium" disabled={noRoom}>
                                {noRoom ? '매진' : '선택'}
                            </Button>
                        }
                    />
                )
            })}
        </Container>
    )
}

const Container = styled.div`
    margin: 48px 0;
`

const Header = styled(Flex)`
    padding: 0 24px;
    margin-bottom: 20px;
`

const imageStyles = css`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
`

export default Rooms
