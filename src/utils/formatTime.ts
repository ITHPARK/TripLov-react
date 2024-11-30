export const formatTime = (ms: number) => {
    //ms는 현재 날짜부터 마감날짜까지 남은 시간을 ms한 값

    //분
    const minute = 60 * 1000
    //시간
    const hour = 60 * minute
    //일
    const day = 24 * hour

    //일 수만 저장
    const days = Math.floor(ms / day)

    //핫딜 종료
    if (days < 0) {
        return ''
    }

    //전체 밀리초에서 "일"을 빼는거 ex)4일 5시간이면 4일을 뺀다 결과는 5시간 이 남게된다.
    const remHour = Math.floor((ms - days * day) / hour)

    //첫번째에서 시간까지 빼서 분만 남긴다.
    const remMimute = Math.floor((ms - days * day - remHour * hour) / minute)

    //두번째에서 분 빼고 초만 남긴다.
    const remSec = Math.floor(
        (ms - days * day - remHour * hour - remMimute * minute) / 1000,
    )

    const HH = `${remHour}`.padStart(2, '0')
    const MM = `${remMimute}`.padStart(2, '0')
    const SS = `${remSec}`.padStart(2, '0')

    return days > 0 ? `${days}일 ${HH}:${MM}:${SS}` : `${HH}:${MM}:${SS}`
}
