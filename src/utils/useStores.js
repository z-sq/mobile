import { useContext } from 'react'

import { StoreContext } from '@/components/StoreContext'

export const useStores = () => {
  return useContext(StoreContext)
}
