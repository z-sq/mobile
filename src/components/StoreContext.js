'use client'
import React, { createContext, ReactNode } from 'react'

import { RootStore } from '@/stores/index'

export const StoreContext = createContext(RootStore)

export const StoreWrapper = ({ children }) => {
  return (
    <StoreContext.Provider value={RootStore}>{children}</StoreContext.Provider>
  )
}
