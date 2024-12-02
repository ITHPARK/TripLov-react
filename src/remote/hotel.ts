import {
    query,
    getDocs,
    collection,
    QueryDocumentSnapshot,
    limit,
    startAfter,
    DocumentData,
    getDoc,
    doc,
    where,
    documentId,
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

//id 값에 따른 호텔 정보를 가져오는 함수
export const getHotel = async (id: string) => {
    //doc = 1개의 문서만 가져오는 함수doc(db, 컬렉션이름, 값)
    const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id))
    return {
        ...(snapshot.data() as HotelProps),
        //위 데이터에 이미 id가 있기때문에 id를 덮어씌워준다.
        id,
    }
}

//추천 호텔의 정보를 가져오는 함수
export const getRecommendHotels = async (hotelIds: string[]) => {
    const recommendQuery = query(
        collection(store, COLLECTIONS.HOTEL),

        //documentId는 문서의 id값만 가져온다.
        //id값을 가져와서 hotelIds 추천 리스트에 포함되는 id의 문서만 가져오게하는 조건
        where(documentId(), 'in', hotelIds),
    )

    const snapshot = await getDocs(recommendQuery)

    return snapshot.docs.map((hotel) => ({
        ...(hotel.data() as HotelProps),
    }))
}
