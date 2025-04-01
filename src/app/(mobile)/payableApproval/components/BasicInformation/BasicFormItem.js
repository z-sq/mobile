const tdLabelClass =
  'h-10 h border-bor-gray border border-solid bg-fill-blue text-right pr-1'
const tdTextClass = 'h-10 border-bor-gray border border-solid pl-1'

const BasicFormItem = ({
  label,
  text,
  labelColSpan = 1,
  textColSpan = 1,
  labelStyle = {},
  textStyle = {}
}) => {
  return (
    <>
      <td
        className={tdLabelClass}
        style={{
          width: '20%',
          ...labelStyle
        }}
        colSpan={labelColSpan}
      >
        {label}
      </td>
      <td
        className={tdTextClass}
        style={{
          width: '30%',
          ...textStyle
        }}
        colSpan={textColSpan}
      >
        {typeof text === 'function' ? text() : text}
      </td>
    </>
  )
}

export default BasicFormItem
