import React from 'react'
import useGoogleSignin from '@hooks/useGoogleSignin'
import Flex from '@components/shared/Flex'
import Spacing from '@components/shared/Spacing'
import Button from '@components/shared/Button'

const SigninPage = () => {
    const { signin } = useGoogleSignin()

    return (
        <Flex direction="column" align="center" style={{ padding: '24px' }}>
            <Spacing size={100} />
            <img
                src="https://cdn2.iconfinder.com/data/icons/line-drawn-social-media/30/send-64.png"
                alt="이미지"
                width={120}
                height={120}
            />
            <Spacing size={60} />
            <Button onClick={signin}>
                <Flex>
                    <img
                        src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-64.png"
                        alt="구글로고"
                        width={20}
                        height={20}
                    />
                    <Spacing direction="horizontal" size={4} />
                    Google 로그인
                </Flex>
            </Button>
        </Flex>
    )
}

export default SigninPage
