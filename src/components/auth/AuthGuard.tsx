import React, { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { userAtom } from '@store/atom/user'
import { useSetRecoilState } from 'recoil'

function AuthGuard({ children }: { children: React.ReactNode }) {
    const [init, setInit] = useState(false)

    const setUser = useSetRecoilState(userAtom)

    //현재 유저정보를 추적한다. (유저정보의 유무랑은 별개로 인증상태를 초기화 하는 것)
    onAuthStateChanged(auth, (user) => {
        if (user == null) {
            //유저 정보가 없다면 전역 상태 null
            setUser(null)
        } else {
            //유저 정보가 있다면 전역 상태에 기입
            setUser({
                uid: user.uid,
                email: user.email ?? '',
                displayName: user.displayName ?? '',
                photoURL: user.photoURL ?? '',
            })
        }

        //위 과정이 끝났다면 인증상태가 초기화 된것이다.
        setInit(true)
    })

    //인증 상태가 초기화 되지 않은 상태
    if (init === false) {
        return null
    }

    return <>{children}</>
}

export default AuthGuard
