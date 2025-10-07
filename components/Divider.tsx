import React from 'react'


interface Props {
    dashed?:boolean
}
const Divider:React.FC<Props> = ({dashed}) => {
    return (
        <div className={`w-full ${dashed ? "border-t border-dashed":"border-t"} my-2`}></div>
    )
}

export default Divider