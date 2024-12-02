import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { useCallback } from 'react'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'

const useGoogleSignin = () => {
    const navigate = useNavigate()

    //로그인 함수
    const signin = useCallback(async () => {
        //로그인 제공자 생성
        const provider = new GoogleAuthProvider()

        try {
            //signInWithPopup로 팝업창 통해 구글 계정 로그인 시도
            const { user } = await signInWithPopup(auth, provider)

            //유저가 로그인했을 때 store에 이미 정보가 있다면
            const userSnapshop = await getDoc(
                doc(collection(store, COLLECTIONS.USERS), user.uid),
            )

            if (userSnapshop.exists()) {
                //이미 store에 유저정보가 있다면 홈으로 리다이렉트
                navigate('/')
            } else {
                //없다면 스토어에 데이터 추가
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoUrl: user.photoURL,
                }

                //users컬렉션 문서의 id를 정해준다.
                const userRef = doc(
                    collection(store, COLLECTIONS.USERS),
                    user.uid,
                )

                //유저 정보를 store에 추가하는 함수
                await setDoc(userRef, userData)

                //로그인 성공, 홈으로 이동
                navigate('/')
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                //유저가 팝업을 그냥 닫았을 때
                if (error.code == 'auth/popup-closed-by-user') {
                    return //아무 동작하지 않는다.
                }
            }

            throw new Error('로그인에 실패했습니다.')
        }
    }, [navigate])

    //로그아웃 함수
    const signout = useCallback(() => {
        signOut(auth)
    }, [])

    return { signin, signout }
}

export default useGoogleSignin
