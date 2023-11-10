'use client'

import React, { FC, ReactNode } from 'react'
import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import CustomBackground from './webgl/CustomBackground'

const GlobalWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <GlobalCanvas
        style={{ pointerEvents: 'none' }}
        camera={{
          position: [0.0, 0.0, 10],
        }}
        // globalRender={false}
      >
        <ambientLight />
      </GlobalCanvas>
      {/* <CustomBackground /> */}
      <SmoothScrollbar />
      {children}
    </>
  )
}

export default GlobalWrapper
