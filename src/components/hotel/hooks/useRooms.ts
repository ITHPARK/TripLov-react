import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getRooms } from '@remote/room'
import { onSnapshot, collection, doc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import { roomProps } from '@models/room'

const useRooms = (hotelId: string) => {
    //쿼리 클라이언트에 접근
    const client = useQueryClient()

    useEffect(() => {
        //onSnapshot를 활요하여 실시간으로 데이터변경 감지
        onSnapshot(
            //Room 컬렉션에 접근
            collection(
                doc(store, COLLECTIONS.HOTEL, hotelId),
                COLLECTIONS.ROOMS,
            ),

            //변경된 데이터를 감지하고 snapshot을 리턴
            (snapshot) => {
                //변경된 객실 데이터를 다시 배열로 만든다.
                const newRooms = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as roomProps),
                }))

                //변경된 데이터를 같은 캐싱된 쿼리 데이터에 업데이트한다.
                client.setQueryData(['room', hotelId], newRooms)
            },
        )
    }, [hotelId, client])

    return useQuery({
        queryKey: ['room', hotelId],
        queryFn: () => getRooms(hotelId),
    })
}

export default useRooms
