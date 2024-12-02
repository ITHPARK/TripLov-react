import { useRecoilValue } from 'recoil'
import { userAtom } from '@store/atom/user'

const useUser = () => {
    //전역 유저상태를 반환
    return useRecoilValue(userAtom)
}

export default useUser
