import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'
import { forwardRef } from 'react'
import Flex from './Flex'
import Text from './Text'
import { SelectHTMLAttributes } from 'react'

export interface Option {
    label: string
    value: string | number | undefined
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    //select 요소에 사용할 수 있는 모든 기본 속성들을 포함
    label?: string
    options: Option[]
    placeholder?: string
}

const BaseSelect = styled.select`
    padding: 0 16px;
    height: 52px;
    background-color: ${colors.gray};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    -webkit-appearance: none; /* for chrome */
    -moz-appearance: none; /*for firefox*/
    appearance: none;

    outline: none;

    &:required:invalid {
        color: #c0c4c7;
    }
`
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    { label, options, value, placeholder, ...props },
    ref,
) {
    //forwardRef 자식 컴포넌트에 DOM ref를 전달하기 위해서 사용
    return (
        <Flex direction="column" css={{ marginBottom: '18px' }}>
            {label ? (
                <Text
                    typography="t7"
                    color="black"
                    display="inline-block"
                    style={{ marginBottom: 6 }}
                    bold={true}
                >
                    {label}
                </Text>
            ) : null}
            <BaseSelect ref={ref} required={true} value={value} {...props}>
                <option disabled={true} hidden={true} value="">
                    {placeholder}
                </option>
                {options.map(({ label, value }) => (
                    <option key={label} value={value}>
                        {label}
                    </option>
                ))}
            </BaseSelect>
        </Flex>
    )
})

export default Select
