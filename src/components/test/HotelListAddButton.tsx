import React from 'react'
import Button from '@shared/Button'
import { store } from '@remote/firebase'
import { doc, collection, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'

import { HOTEL_NAMES, IMAGES, HOTEL, EVENTS, ROOMS } from '@/mock/data'

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const HotelListAddButton = () => {
  //여러 문서에 대해 한 번의 네트워크 요청으로 작업을 수행할 수 있다.
  const batch = writeBatch(store)

  const handleButtonClick = () => {
    //호텔 정보 만들기
    const hotel_data = HOTEL_NAMES.map((hotelName, idx) => {
      return {
        name: hotelName,
        mainImageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        images: IMAGES,
        price: random(130000, 200000),
        startRating: random(1, 5),
        ...HOTEL,
        ...(EVENTS[idx] != null && { events: EVENTS[idx] }),
      }
    })

    hotel_data.forEach((hotel) => {
      //호텔 컬렉션에 접근.
      const hotelDocRef = doc(collection(store, COLLECTIONS.HOTEL))

      //호텔 컬렉션에 해당 데이터를 저장.
      batch.set(hotelDocRef, hotel)

      //호텔 정보 안에 객실 정보 추가
      ROOMS.forEach((room) => {
        //호텔 컬렉션안에 문서를 추가하는 것이기 때문에 collection(store)대신 hotelDocRef를 넣어준다.
        const subRoomDocRef = doc(collection(hotelDocRef, COLLECTIONS.ROOMS))

        //객실 정보 추가
        batch.set(subRoomDocRef, room)
      })
    })

    //DB에 반영
    batch
      .commit()
      .then(() => {
        console.log('데이터 추가 성공')
      })
      .catch((error) => {
        console.log(error, '데이터 추가 실패')
      })
  }

  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>
}

export default HotelListAddButton
