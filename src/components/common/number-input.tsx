import { NumericFormat } from 'react-number-format'
import { Input, InputProps } from '../ui/shadcnui/input'

export type NumberInputProps = {
  value: string
  allowNegative?: boolean
  defaultValue?: number | string
  onChange: (value: string) => void
} & Omit<InputProps, 'onChange' | 'value' | 'type'>

export const NumberInput = (props: NumberInputProps) => {
  const { onChange, value, allowNegative, ...rest } = props

  return (
    <NumericFormat
      value={value}
      customInput={Input}
      thousandSeparator=","
      allowNegative={allowNegative}
      onValueChange={(values) => onChange(values.value)}
      {...rest}
    />
  )
}
