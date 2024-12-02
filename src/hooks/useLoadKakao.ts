import { useEffect } from 'react'

declare global {
    //모든 파일에서 접근 가능한 전역 타입을 정의

    interface Window {
        Kakao: any
    }
}

const useLoadKakao = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
        script.async = true

        document.head.appendChild(script)

        script.onload = () => {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY)
                console.log('Kakao SDK initialized:', window.Kakao)
            }
        }

        return () => {
            // Clean up script if needed
            document.head.removeChild(script)
        }
    }, [])
}

export default useLoadKakao
