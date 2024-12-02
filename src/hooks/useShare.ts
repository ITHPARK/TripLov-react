import React, { useCallback } from 'react'

interface ShareProps {
    title: string
    description: string
    imageUrl: string
    buttonLabel: string
}

const useShare = () => {
    const hanleShare = useCallback(
        ({ title, description, imageUrl, buttonLabel }: ShareProps) => {
            //카카오 공유하기에 데이터를 전달
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title,
                    description,
                    imageUrl,
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                buttons: [
                    {
                        title: buttonLabel,
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    },
                ],
            })
        },
        [],
    )

    return hanleShare
}

export default useShare
