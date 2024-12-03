import {
    useState,
    useEffect,
    useCallback,
    ComponentProps,
    createContext,
    useMemo,
    useContext,
} from 'react'
import { createPortal } from 'react-dom'

import Alert from '@shared/Alert'

type AlertProps = ComponentProps<typeof Alert> //Alert 컴포넌트에서 사용하는 타입을 가져온다.

type AlertOptions = Omit<AlertProps, 'open'> //Alert 컴포넌트에서 가져온 타입에 Omit으로 open이란 타입을 추가한다.

//open의  매개변수 타입과, 반환값 설정
interface AlertContextValue {
    open: (options: AlertOptions) => void
}
//컨텍스트 생성
const Context = createContext<AlertContextValue | undefined>(undefined)

//기본적으로 알럿창이 가지는 기본값
const defaultValue: AlertProps = {
    open: false, //열림 여부
    title: null, //알럿 타이틀
    description: null, //알럿 코멘트
    onButtonClick: () => {}, //버튼 눌렀을 때 콜백
}

export const AlertContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [alertState, setAlertState] = useState(defaultValue)

    //알럿을 띄울 포탈 설정
    const $portal_root = document.getElementById('root-portal')

    const close = useCallback(() => {
        //알럿 닫기 (기본값으로 변경)
        setAlertState(defaultValue)
    }, [])

    const open = useCallback(
        //옵션과 콜백을 인자로 받는다.
        ({ onButtonClick, ...options }: AlertOptions) => {
            setAlertState({
                ...options,
                //버튼을눌렀을 때 알럿이 닫히도록 close 함수 추가
                onButtonClick: () => {
                    close()
                    onButtonClick()
                },
                open: true,
            })
        },
        [close],
    )

    //open의 값을 메모이제이션 (useCallback으로는 함수만 저장 useMemo로 모든 파라미터의 값을 다 저장)
    const values = useMemo(() => ({ open }), [open])

    return (
        <Context.Provider value={values}>
            {children}
            {$portal_root != null
                ? //포탈에 알럿 생성
                  createPortal(<Alert {...alertState} />, $portal_root)
                : null}
        </Context.Provider>
    )
}

export const useAlertContext = () => {
    //Provider에서 제공하는 valuse가 있는지 확인
    const values = useContext(Context)

    if (values == null) {
        throw new Error('AlerContext 내부에서 사용해 주세요')
    }

    return values
}

export default AlertContextProvider
