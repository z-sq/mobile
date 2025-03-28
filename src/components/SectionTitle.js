'use client'

// border-b-[#e5e7eb]
const SectionTitle = ({ title }) => {
  return (
    <div className="section-title w-full border-b border-dotted border-gray">
      <div className="section-title-text flex items-center py-1">
        <div className="w-[2px] h-3 bg-blue mr-1"></div>
        <span className='text-[12px] font-light text-black'>{title}</span>
      </div>
    </div>
  )
}

export default SectionTitle
