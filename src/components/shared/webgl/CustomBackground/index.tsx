import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'

import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'
import {
  ScrollScene,
  UseCanvas,
  useImageAsTexture,
} from '@14islands/r3f-scroll-rig'
import { Color, Vector2 } from 'three'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

const CustomBackground = () => {
  const mesh = useRef() as any
  const el = useRef<any>()
  const img = useRef<any>()

  return (
    <>
      <div className="relative aspect-square" ref={el}>
        <img
          src="https://source.unsplash.com/random/1600x1000/?abstract"
          ref={img}
          alt="background"
          className="w-full h-full object-contain invisible"
        />
      </div>
      <UseCanvas>
        <ScrollScene track={el}>
          {/* {(props) => <WebGLImage {...props} imgRef={img} />} */}
          {(props) => (
            <BackgroundScene imgRef={img} meshRef={mesh} {...props} />
          )}
        </ScrollScene>
      </UseCanvas>
    </>
  )
}

function WebGLImage({ imgRef, ...props }: { imgRef: any }) {
  // Load texture from the <img/> and suspend until its ready
  const texture = useImageAsTexture(imgRef)
  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <MeshDistortMaterial
        transparent
        map={texture}
        radius={0.99}
        distort={0.2}
        speed={3}
      />
    </mesh>
  )
}

const BackgroundScene: FC<{
  meshRef: any
  imgRef: any
}> = ({ meshRef, imgRef, ...props }) => {
  const mousePosition = useRef({ x: 0, y: 0 })

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mousePosition.current = { x: e.pageX, y: e.pageY }
  }, [])

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_res: {
        value: new Vector2(
          imgRef.current?.offsetWidth,
          imgRef.current?.offsetHeight
        ),
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: {
        value: new Color('#000'),
      },
      u_colorA: { value: new Color('#FF3131') },
      u_colorB: { value: new Color('#FF914D') },
    }),
    []
  )

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, false)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition, false)
    }
  }, [updateMousePosition])

  useFrame((state) => {
    const { clock } = state
    meshRef.current.material.uniforms.u_time.value =
      clock.getElapsedTime() * 0.125
    meshRef.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    )
  })

  return (
    <mesh ref={meshRef} {...props}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  )
}

export default CustomBackground
