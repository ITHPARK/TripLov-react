import React from 'react'
import Flex from './Flex'
import Text from './Text'
import { css } from '@emotion/react'
import Skeleton from './Skeleton'
import Spacing from './Spacing'
import { SerializedStyles } from '@emotion/react'

interface ListRowProps {
    left?: React.ReactNode
    contents: React.ReactNode
    right?: React.ReactNode
    withArrow?: boolean
    onClick?: () => void
    as?: 'div' | 'li'
    style?: SerializedStyles
}

const ListRow = ({
    as = 'li',
    left,
    contents,
    right,
    withArrow,
    onClick,
    style,
}: ListRowProps) => {
    return (
        <Flex as={as} css={listRowContainerStyles} onClick={onClick}>
            {left && <Flex css={listLeftStyles}>{left}</Flex>}
            <Flex css={listRowContentStyles}>{contents}</Flex>
            {right && <Flex>{right}</Flex>}
            {withArrow ? <IconArrowRight /> : null}
        </Flex>
    )
}

const listRowContainerStyles = css`
    padding: 8px 24px;
`

const listLeftStyles = css`
    margin-right: 14px;
`

const listRowContentStyles = css`
    flex: 1;
`

const ListRowTexts = ({
    title,
    subTitle,
}: {
    title: React.ReactNode
    subTitle: React.ReactNode
}) => {
    return (
        <Flex direction="column">
            <Text bold={true}>{title}</Text>
            <Text typography="t7">{subTitle}</Text>
        </Flex>
    )
}

//리스트 스켈레톤 UI
const ListRowSkeleton = () => {
    return (
        <Flex as="li" css={listRowContainerStyles} align="center">
            <Flex css={listLeftStyles}></Flex>
            <Flex css={listRowContentStyles}>
                <ListRow.Texts
                    title={
                        <>
                            <Skeleton width={67} height={23} />
                            <Spacing size={2} />
                        </>
                    }
                    subTitle={<Skeleton width={85} height={20} />}
                />
            </Flex>
            <IconArrowRight />
        </Flex>
    )
}

//화살표 아이콘
const IconArrowRight = () => {
    return (
        <svg
            viewBox="0 0 96 96"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
        >
            <title />

            <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
        </svg>
    )
}

ListRow.Texts = ListRowTexts //ListRow에 ListRowTexts 컴포넌트를 사용 (컴포넌트 합성)
ListRow.Skeleton = ListRowSkeleton
export default ListRow
