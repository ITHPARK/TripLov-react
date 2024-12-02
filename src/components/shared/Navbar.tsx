import { Link, useLocation } from 'react-router-dom'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import { colors } from '@styles/colorPalette'
import { css } from '@emotion/react'
import { useCallback } from 'react'
import useUser from '@hooks/auth/useUser'

const Navbar = () => {
    const location = useLocation()

    const user = useUser()

    const handleLogOut = useCallback(() => {
        // signOut(auth)
    }, [])

    const showSignButton = // signup signin 경로가 아닐때만 버튼 보여주기
        ['/signup', '/signin'].includes(location.pathname) === false

    const renderButton = useCallback(() => {
        if (user != null) {
            // 유저 정보가 있을 때.

            return (
                <Link to="/my">
                    <img
                        src={
                            user.photoURL ??
                            'https://cdn2.iconfinder.com/data/icons/squircle-ui/32/Avatar-64.png'
                        }
                        alt="유저이미지"
                        width={40}
                        height={40}
                        style={{ borderRadius: '50%' }}
                    />
                </Link>
            )
        }

        if (showSignButton) {
            return (
                <Link to="/signin">
                    <Button>로그인/회원가입</Button>
                </Link>
            )
        }

        return null
    }, [user, showSignButton, handleLogOut])

    return (
        <Flex
            justify="space-between"
            align="center"
            css={NavbarContainerStyles}
        >
            <Link
                to="/"
                css={css`
                    font-size: 18px;
                    font-weight: 700;
                    font-style: italic;
                    color: #1a237e;
                    letter-spacing: -0.03em;
                `}
            >
                TripLove
            </Link>
            {renderButton()}
        </Flex>
    )
}

const NavbarContainerStyles = css`
    padding: 10px 24px;
    position: sticky;
    left: 0;
    top: 0;
    background-color: ${colors.white};
    z-index: 9;
    border-bottom: 1px solid ${colors.gray};
`

export default Navbar
