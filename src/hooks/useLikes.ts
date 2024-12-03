import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Navigate, useNavigate } from 'react-router-dom'

import { getLikes, toggleLike } from '@remote/like'
import useUser from '@hooks/auth/useUser'
import { HotelProps } from '@models/hotel'
import { useAlertContext } from '@contexts/AlertContext'

const useLikes = () => {
    //현재 로그인한 유저의 정보를 가져온다.
    const user = useUser()
    const { open } = useAlertContext()
    const navigate = useNavigate()
    const client = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['likes'],
        queryFn: () => getLikes(user?.uid as string),
        //유저의 정보가 있을 때만 쿼리실행
        enabled: user != null,
    })

    //찜하기 상타를 바꾸는것
    const mutation = useMutation({
        mutationFn: ({
            hotel,
        }: {
            hotel: Pick<HotelProps, 'name' | 'id' | 'mainImageUrl'>
        }) => {
            if (user == null) {
                throw new Error('로그인필요')
            }

            //찜하기 상태 수정
            return toggleLike({ hotel, userId: user.uid })
        },
        onMutate: () => {
            client.invalidateQueries({
                queryKey: ['likes'],
            })
        },
        onError: (e: Error) => {
            //로그인이 안된 경우 알럿 출력
            if (e.message === '로그인 필요') {
                open({
                    title: '로그인이 필요한 기능입니다.',
                    onButtonClick: () => {
                        navigate('/signin')
                    },
                })

                return
            }

            //일반 에러 출력
            open({
                title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해 주세요',
                onButtonClick: () => {},
            })
        },
    })

    //mutation의 요청을 실제로 행하는 함수인 mutate만 전달한다.
    return { data, isLoading, mutate: mutation.mutate }
}

export default useLikes
