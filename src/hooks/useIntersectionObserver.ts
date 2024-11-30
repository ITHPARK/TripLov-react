import { useEffect, useRef } from 'react'

const useIntersectionObserver = (
    onIntersect: () => void,
    options?: IntersectionObserverInit,
) => {
    //추적할 html 요소
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        //html 요소가 없다면 종료
        if (!observerRef.current) return

        //브라우저의 API로, DOM 요소가 뷰포트와 교차할 때 트리거 된다.
        const observer = new IntersectionObserver(
            (entries) => {
                //entries는 관찰된 요소들이 배열로 전달
                entries.forEach((entry) => {
                    //isIntersecting는 뷰포트에 요소가 나오고 있음을 의미한다.
                    if (entry.isIntersecting) {
                        //콜백 함수 실행
                        onIntersect()

                        //entry.target은 ref요소
                        console.log(entry.target)
                    }
                })
            },
            //threshold는 요소가 뷰표트에 얼만큼 노출 되었는지를 의미한다. 0.9면 뷰포트에 90퍼 이상 나왔을 때 콜백을 실행
            { threshold: 0.9 },
        )

        //html 요소
        const currentTarget = observerRef.current

        //추적하는 html요소가 있을 때 observe를 호출하여 해당요소를 관찰을 시작한다.
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        //컴포넌트가 종료되면 관찰을 종료한다.
        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [onIntersect, options])

    return observerRef
}

export default useIntersectionObserver
