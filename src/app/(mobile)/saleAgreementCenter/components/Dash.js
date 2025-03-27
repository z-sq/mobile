// 一个自定义样式的虚线组件
import React from 'react';
const Dash = ({
    borderStyle='dashed',
    borderColor='bor-gray2',
    borderWidth='h-px',
    marginY=4,
    className=''
}) => {
    return (
        <div className={`dash w-full h-px border-t border-${borderStyle} border-${borderColor} my-${marginY} ${className}`}>
          
        </div>
    )
}
export default Dash