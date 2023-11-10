import { FC, use, useRef } from 'react'
import { useImageAsTexture } from '@14islands/r3f-scroll-rig'
import { Image } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { clamp } from 'three/src/math/MathUtils.js'

const WebGLImage: FC<{
  imgRef: any
  scrollState: any
  dir: any
}> = ({ imgRef, scrollState, dir, ...props }) => {
  const ref = useRef() as any

  const texture = useImageAsTexture(imgRef)

  useFrame(({ clock }) => {
    // visibility is 0 when image enters viewport and 1 when fully visible
    ref.current.material.grayscale = clamp(
      1 - scrollState.visibility ** 3,
      0,
      1
    )
    // progress is 0 when image enters viewport and 1 when image has exited
    ref.current.material.zoom = 1 + scrollState.progress * 0.66
    // viewport is 0 when image enters and 1 when image reach top of screen
    ref.current.material.opacity = clamp(scrollState.viewport * 3, 0, 1)
  })

  return <Image ref={ref} texture={texture} transparent {...props} />
}

export default WebGLImage
