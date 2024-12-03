import React from 'react'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const SettingsPage = () => {
    return (
        <>
            <ul>
                <li>
                    <Link to="/settings/like">
                        <ListRow
                            as="div"
                            contents={
                                <ListRow.Texts
                                    title={'찜한 숙소'}
                                    subTitle="찜한 숙소를 확인해보세요"
                                />
                            }
                            right={
                                <img
                                    src={
                                        'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-right-64.png'
                                    }
                                    alt="화살표 이미지"
                                    width={30}
                                    css={css`
                                        object-fit: contain;
                                    `}
                                />
                            }
                        />
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default SettingsPage
