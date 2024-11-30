import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import reportWebVitals from './reportWebVitals'

import { Global } from '@emotion/react'
import globalStyles from '@/styles/globalStyles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
        <QueryClientProvider client={client}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
