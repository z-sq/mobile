'use client'

import ApprovalCard from '@/components/ApprovalCard'

const ApprovalOpinion = ({ data = [] }) => {
  const list = []
  data.forEach((item) => {
    item.forEach((val) => {
      list.push(val)
    })
  })
  return (
    <div className="h-[100%] overflow-y-auto">
      {list.map((item, index) => (
        <ApprovalCard key={index} data={item} />
      ))}
    </div>
  )
}

export default ApprovalOpinion
