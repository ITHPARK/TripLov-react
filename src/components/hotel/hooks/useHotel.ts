import { useQuery } from '@tanstack/react-query'
import { getHotel } from '@remote/hotel'

//useQuery를 실행한 값을 반환
const useHotel = ({ id }: { id: string }) => {
    return useQuery({
        queryKey: ['hotel', id],
        queryFn: () => getHotel(id),
    })
}

export default useHotel
