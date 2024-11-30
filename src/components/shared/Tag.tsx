import styled from '@emotion/styled'
import { colors, Colors } from '@styles/colorPalette'

interface TagProps {
    color?: string
    backgroundColor?: string
}

const Tag = styled.span<TagProps>(
    ({ color = colors.white, backgroundColor = colors.blue }) => ({
        padding: '4px 5px',
        fontSize: '11px',
        fontWeight: 'bold',
        color: color in colors ? colors[color as Colors] : color,
        textAlign: 'center',
        backgroundColor:
            backgroundColor in colors
                ? colors[backgroundColor as Colors]
                : backgroundColor,
        borderRadius: '2px',
    }),
)
export default Tag
