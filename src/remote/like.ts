import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    setDoc,
    limit,
    doc,
    deleteDoc,
    writeBatch,
} from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import { LikeProps } from '@models/like'
import { HotelProps } from '@models/hotel'

//유저의 찜한 목록을 가져오는 함수
export const getLikes = async (userId: string) => {
    //LIKES 컬렉션을 참조하여 파라미터로 받은 userId값과 같은 데이터만 추출
    const likesQuery = query(
        collection(store, COLLECTIONS.LIKE),

        //해당 유저의 찜 목록만 가져오는 조건
        where('userId', '==', userId),

        // 데이터 오름차순 정렬
        orderBy('order', 'asc'),
    )

    const snapshot = await getDocs(likesQuery)

    return snapshot.docs.map(
        (hotel) =>
            ({
                id: hotel.id,
                ...hotel.data(),
            }) as LikeProps,
    )
}

//찜하기 눌렀을 때 삭제 또는 찜하기 추가
export const toggleLike = async ({
    userId,
    hotel,
}: {
    userId: string
    hotel: Pick<HotelProps, 'name' | 'id' | 'mainImageUrl'>
}) => {
    //찜 취소 또는 추가할 데이터를 가져온다.
    const findLikeQuery = query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        where('hotelId', '==', hotel.id),
    )

    //찜 취소나 추가 작업을 할 데이터
    const findSnapshot = await getDocs(findLikeQuery)

    // 이미 찜한 데이터가 store에 존재한다면
    if (findSnapshot.docs.length > 0) {
        //찜 작업을 할 요소를 타겟
        const removeTarget = findSnapshot.docs[0]

        //작업 할 데이터의 순서를 가져온다.
        const removeTargetOrder = removeTarget.data().order

        //작업할 데이터의 순서보다 높은 모든 데이터를 구해준다. (찜이 취소됨에 따라 값이 삭제된다면 순서를 -1씩 해줘야 하기 때문)
        const updateTargetSnapshot = await getDocs(
            query(
                collection(store, COLLECTIONS.LIKE),
                where('userId', '==', userId),
                where('order', '>', removeTargetOrder),
            ),
        )

        // 작업 할 데이터를 제외한 데이터가 없다면
        if (updateTargetSnapshot.empty) {
            //그냥 삭제한다.
            //(ref)는 문서 객체 즉, 해당 문서 참조를 제공
            return deleteDoc(removeTarget.ref)
        } else {
            //여러 데이터를 한번에 처리하기 위해서 사용
            const batch = writeBatch(store)

            //작업할 데이터를 제외한 데이터 순서를 -1씩 해준다.
            updateTargetSnapshot.forEach((doc) => {
                batch.update(doc.ref, { order: doc.data().order - 1 })
            })

            //완료된 작업을 업데이트
            await batch.commit()

            //작업 할 데이터를 store에서 삭제
            return deleteDoc(removeTarget.ref)
        }
    } else {
        //찜한 목록에 없을 때

        //유저가 찜한 다른 숙소의 순서를 가져온다.
        const lastLikeQuery = query(
            collection(store, COLLECTIONS.LIKE),
            where('userId', '==', userId),
            orderBy('order', 'desc'),
            limit(1),
        )

        const lastLikeSnapshot = await getDocs(lastLikeQuery)

        //찜한 목록이 하나도 없다면 순서를 0으로 설정
        const lastOrder = lastLikeSnapshot.empty
            ? 0
            : lastLikeSnapshot.docs[0].data().order //아니면 마지막 요소의 순서로 설정

        //마지막 요소에서 +1를 한다.
        const newLike = {
            order: lastOrder + 1,
            hotelId: hotel.id,
            hotelName: hotel.name,
            hotelMainImageUrl: hotel.mainImageUrl,
            userId,
        }

        //데이터 추가
        await setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike)
    }
}
