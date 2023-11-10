/* eslint-disable jsx-a11y/alt-text */

'use client'

import React, { useRef, Suspense, FC, MutableRefObject } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { Box, Image, MeshDistortMaterial } from '@react-three/drei'
import './CustomMaterial'
import {
  ScrollScene,
  UseCanvas,
  useImageAsTexture,
} from '@14islands/r3f-scroll-rig'

const BG = () => {
  const el = useRef<any>()
  const img = useRef<any>()

  return (
    <>
      <div className="fixed inset-0 invisible -z-10" ref={el}>
        <img
          src="/images/gradient.jpg"
          ref={img}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <UseCanvas>
        <ScrollScene track={el} debug={false}>
          {(props) => (
            <Suspense fallback={<LoadingIndicator {...props} />}>
              <BackgroundImage imgRef={img} {...props} />
            </Suspense>
          )}
        </ScrollScene>
      </UseCanvas>
    </>
  )
}

const BackgroundImage: FC<{ imgRef: any }> = ({ imgRef, ...props }) => {
  const texture = useImageAsTexture(imgRef)
  const material = useRef() as any
  //   const viewport = useThree((s) => s.viewport)
  //   useFrame((_, delta) => {
  //     if (bg.current) bg.current.rotation.z -= delta * 0.05
  //   })
  return (
    <mesh {...props}>
      <planeGeometry attach="args" args={[1, 1, 32, 32]} />
      {/* <MeshDistortMaterial
        transparent
        map={texture}
        radius={0.99}
        distort={0.2}
        speed={3}
      /> */}

      <customMaterial
        ref={material}
        attach="material"
        transparent
        color=""
        map={texture}
      />
    </mesh>
    // <Image ref={ref} texture={texture} transparent {...props} />
  )
}

const LoadingIndicator: FC<{ scale: any }> = ({ scale }) => {
  const box = useRef() as any
  useFrame((_, delta) => {
    box.current.rotation.x = box.current.rotation.y += delta * Math.PI
  })
  return (
    <Box ref={box} scale={scale.xy.min() * 0.25}>
      <meshNormalMaterial />
    </Box>
  )
}

export default BG
