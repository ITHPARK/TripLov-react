import {
    query,
    getDocs,
    collection,
    QueryDocumentSnapshot,
    limit,
    startAfter,
    DocumentData,
} from 'firebase/firestore'
import { store } from '@remote/firebase'

import { COLLECTIONS } from '@constants'
import { HotelProps } from '@models/hotel'

export const getHotels = async (
    //pageParam은 firebase에서 가져온 데이터 중에 마직막 문서만 해당하니 QueryDocumentSnapshot 클래스로 설정해줘야한다.
    pageParams?: QueryDocumentSnapshot<DocumentData>,
) => {
    //pageParams에 따른 호텔 데이터 처리
    const hotelQuery =
        pageParams == null
            ? //pageParams가 없다면 첫번째 요소부터 10개를 가져온다.
              query(collection(store, COLLECTIONS.HOTEL), limit(10))
            : //pageParams가 있다면 pageParams를 시작점으로 10개를 가져온다.
              query(
                  collection(store, COLLECTIONS.HOTEL),
                  startAfter(pageParams),
                  limit(10),
              )
    //조건에 충족하는 데이터를 모두 가져온다.
    const hotelData = await getDocs(hotelQuery)

    //query를 실행하고 나온 자료를 객체 배열로 만들어준다.
    const items = hotelData.docs.map(
        (hotel) =>
            ({
                id: hotel.id,
                ...hotel.data(),
            }) as HotelProps,
    )

    //가져온 전체 문서중 마지막 요소
    const lastVisible = hotelData.docs[hotelData.docs.length - 1]

    return {
        items: items,
        lastVisible: lastVisible,
    }
}
