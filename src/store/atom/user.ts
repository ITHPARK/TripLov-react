import { atom } from 'recoil'
import { UserProps } from '@models/user'

export const userAtom = atom<UserProps | null>({
    key: 'auth/user',
    default: null,
})
