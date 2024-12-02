import React from 'react'
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { HotelProps } from '@/models/hotel'
import useShare from '@/hooks/useShare'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ActionButtons = ({ hotel }: { hotel: HotelProps }) => {
    const share = useShare()

    const { name, comment, mainImageUrl } = hotel

    return (
        <Flex justify="space-between" css={ContainerStyles}>
            <Button
                label="찜하기"
                iconUrl={
                    'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-64.png'
                }
                onClick={() => {}}
            />
            <Button
                label="공유하기"
                iconUrl={
                    'https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-64.png'
                }
                onClick={() => {
                    share({
                        title: name,
                        description: comment,
                        imageUrl: mainImageUrl,
                        buttonLabel: '앱에서 보기',
                    })
                }}
            />
            <CopyToClipboard
                text={window.location.href}
                onCopy={() => {
                    alert('링크가 복사되었습니다.')
                }}
            >
                <Button
                    label="링크복사"
                    iconUrl={
                        'https://cdn0.iconfinder.com/data/icons/evericons-24px-vol-1/24/clipboard-64.png'
                    }
                    onClick={() => {}}
                />
            </CopyToClipboard>
        </Flex>
    )
}

const Button = ({
    label,
    iconUrl,
    onClick,
}: {
    label: string
    iconUrl: string
    onClick: () => void
}) => {
    return (
        <Flex direction="column" align="center" onClick={onClick}>
            <img src={iconUrl} alt="아이콘" width={30} height={30} />
            <Spacing size={6} />
            <Text>{label}</Text>
        </Flex>
    )
}

const ContainerStyles = css`
    padding: 24px;
    cursor: pointer;

    & = {
        flex: 1;
    }
`

export default ActionButtons
