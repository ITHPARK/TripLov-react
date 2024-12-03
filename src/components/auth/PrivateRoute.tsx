import useUser from '@/hooks/auth/useUser'
import React from 'react'
import { Navigate } from 'react-router-dom'

//로그인이 꼭 필요한 페이지에 접근을 위한 컴포넌트
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useUser()

    //유저정보가 없다면 로그인 페이지로 이동
    if (user == null) {
        return <Navigate to="/signin" replace={true} />
    }

    return <>{children}</>
}

export default PrivateRoute
