'use client'

import { useRouter } from 'next/navigation'

import Logout from '@/components/Logout'
import PopoverWfm from '@/components/PopoverWfm'
import { BASE_PATH } from '@/config/app'

const Title = ({
  title = '标题',
  onBack,
  isShowBack = true,
  rightIcon = '',
  callback
}) => {
  const router = useRouter()

  const goBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }
  return (
    <div className="pl-12px pr-6px h-40px bg-fill-blue1 flex w-[100%] items-center text-base text-white">
      <div className="mr-4px flex flex-1 items-center">
        <div
          className="h-16px w-16px bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${BASE_PATH}/images/left-arrow.png')`,
            display: isShowBack ? 'block' : 'none'
          }}
          onClick={goBack}
        />
      </div>
      <div className="flex-2 flex items-center justify-center">{title}</div>
      <div className="flex flex-1 justify-end">
        {rightIcon === '1' && <Logout />}
        {rightIcon === '2' && (
          <PopoverWfm
            image={`url('${BASE_PATH}/images/menu.png')`}
            styles={{ height: '22px', width: '24px' }}
            callback={callback}
          />
        )}
      </div>
    </div>
  )
}

export default Title
