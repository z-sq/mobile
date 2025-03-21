import './globals.css'
import 'antd-mobile/es/global'
import { StoreWrapper } from '@/components/StoreContext'

export const viewport = {
  width: 'device-width',
  initialScale: '1.0',
  minimumScale: '1.0',
  maximumScale: '1.0',
  userScalable: 'no'
}

export const metadata = {
  title: '中国机械科学研究总院集团采购电子商务平台',
  description: '中国机械科学研究总院集团采购电子商务平台'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreWrapper>{children}</StoreWrapper>
      </body>
    </html>
  )
}
