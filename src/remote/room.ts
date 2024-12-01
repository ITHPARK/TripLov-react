import { doc, collection, getDocs } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { roomProps } from '@models/room'

export const getRooms = async (hotelId: string) => {
    //doc으로 store의 하나의 호텔 정보에 접근. 해당 호텔에 ROOMS 컬렉션에 젒근해서 모든 객실 데이터를 가져온다.
    const snapshot = await getDocs(
        collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOMS),
    )

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as roomProps),
    }))
}
