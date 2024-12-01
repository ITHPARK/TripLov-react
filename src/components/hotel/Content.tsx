import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'
import { typographyMap } from '@/styles/typography'

const Content = ({ contents }: { contents: string }) => {
    return (
        <Container>
            <ReactMarkdown>{contents}</ReactMarkdown>
        </Container>
    )
}

const Container = styled.div`
    padding: 24px;
    ${typographyMap.t6}

    h2 {
        ${typographyMap.t4}
        font-weight: bold;
        margin: 18px 0;
    }

    ul {
        padding-inline-start: 20px;
        margin: 18px 0;
    }

    li {
        list-style: disc;
    }

    p {
        margin: 18px 0;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }
`
export default Content
