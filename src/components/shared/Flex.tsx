import { CSSProperties } from 'react'
import styled from '@emotion/styled'

//flexbox 타입
interface FlexProps {
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  direction?: CSSProperties['flexDirection']
  gap?: CSSProperties['gap']
}

//flex
const Flex = styled.div<FlexProps>(({ align, justify, direction, gap }) => ({
  display: 'flex',
  alignItems: align,
  justifyContent: justify,
  flexDirection: direction,
  gap: gap,
}))

export default Flex
