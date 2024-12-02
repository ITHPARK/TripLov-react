import Button from '@shared/Button'
import { writeBatch, collection, getDocs } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'

const RecommendHotelButton = () => {
    //각 숙소 데이터에 추천 숙소를 추가하는 함수
    const handleClickRecommend = async () => {
        const batch = writeBatch(store)
        ///숙소 데이터를 가져온다.
        const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))

        snapshot.docs.forEach((hotel) => {
            //추천 숙소
            const recommendArr = []

            //각 데이터를 순회
            for (let data of snapshot.docs) {
                //추천 숙소의 개수가 5개라면
                if (recommendArr.length === 5) {
                    //반복문을 멈춘다.
                    break
                }

                //forEach롤 순회하는 숙소 데이터의 id와 다르다면
                if (data.id !== hotel.id) {
                    recommendArr.push(data.id)
                }
            }

            //호텔 데이터에 추천 호텔리스트를 업데이트한다.
            batch.update(hotel.ref, {
                recommendHotelList: recommendArr,
            })
        })

        await batch.commit()

        alert('추천 호텔 업데이트 완료')
    }

    return (
        <Button onClick={handleClickRecommend}>추천호텔 데이터 추가하기</Button>
    )
}

export default RecommendHotelButton
