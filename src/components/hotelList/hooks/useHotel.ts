import { useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getHotels } from '@remote/hotel'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

const useHotel = () => {
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage = false,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ['hotels'],
        //pageParam은 firebase에서 가져온 데이터 중에 마직막 문서만 해당하니 QueryDocumentSnapshot 클래스로 설정해줘야한다.
        //DocumentData는 pageParams에 전달될 데이터를 명시적으로 지정하면 그에 맞춰진다.
        queryFn: ({
            pageParam,
        }: {
            pageParam?: QueryDocumentSnapshot<DocumentData>
        }) => getHotels(pageParam),
        getNextPageParam: (lastPage) => lastPage.lastVisible,
        initialPageParam: undefined,
    })
    const loadMore = useCallback(() => {
        //다음 페이지가 없거나 데이터를 가져오는중이면 아무 작업을안한다.
        if (hasNextPage === false && isFetching) {
            return
        }
        //아니라면 다음 페이지를 가져온다.
        fetchNextPage()
    }, [fetchNextPage, hasNextPage, isFetching])
    const flatData = data?.pages.map(({ items }) => items).flat()
    return { data: flatData, isLoading, hasNextPage, loadMore }
}

export default useHotel
