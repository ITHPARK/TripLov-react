import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import reportWebVitals from './reportWebVitals'

import { Global } from '@emotion/react'
import globalStyles from '@/styles/globalStyles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { AlertContextProvider } from '@contexts/AlertContext'

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0, //쿼리가 실패했을 떄 재시도할 횟수
        },
    },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Global styles={globalStyles} />
        <RecoilRoot>
            <QueryClientProvider client={client}>
                <AlertContextProvider>
                    <App />
                </AlertContextProvider>
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>,
)

reportWebVitals()
