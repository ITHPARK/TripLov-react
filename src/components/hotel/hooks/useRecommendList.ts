import { useQuery } from '@tanstack/react-query'
import { getRecommendHotels } from '@remote/hotel'

const useRecommendList = ({ hotelIds }: { hotelIds: string[] }) => {
    return useQuery({
        //호텔 ID를 JSON 문자열로 반환하여 키값으로 사용
        queryKey: ['recommendList', JSON.stringify(hotelIds)],
        queryFn: () => getRecommendHotels(hotelIds),
        enabled: hotelIds.length > 0, //추천 호텔이 있을 때 쿼리 실행
    })
}

export default useRecommendList
