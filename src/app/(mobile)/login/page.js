'use client'

import Image from 'next/image'

import bgPic from '../../../../public/images/bg.jpg'
import logoPic from '../../../../public/images/logo.png'

import styles from './login.module.css'
import LoginWrapper from './loginWrapper'

export default function LoginPage() {
  return (
    <div className={styles.loginWrapper}>
      <div className="relative w-[100%]">
        <Image src={bgPic} alt="背景图片" className="w-[100%]" />
        <div className="absolute top-0 flex h-[100%] w-[100%] flex-col items-center justify-center">
          <Image src={logoPic} alt="Logo" className="w-[60%]" />
          <div className="mt-16px text-base text-white">采购电子商务平台</div>
        </div>
      </div>
      <div className="mt-48px px-40px flex flex-col items-center">
        <LoginWrapper />
      </div>
    </div>
  )
}
