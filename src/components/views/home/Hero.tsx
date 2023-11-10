'use client'

import React, { FC, MutableRefObject, useEffect, useRef } from 'react'
import SplitType from 'split-type'
import gsap from 'gsap'
import { UseCanvas, ScrollScene } from '@14islands/r3f-scroll-rig'

import Arrow from '@/components/shared/Arrow'
import WebGLImage from '@/components/shared/webgl/Image'
import CustomBackground from '@/components/shared/webgl/CustomBackground'

const Hero = () => {
  const el = useRef<any>()

  useEffect(() => {
    const { chars } = new SplitType('#js--title', { types: 'chars' })
    const subtitle = document.querySelector('#js--subtitle')
    gsap
      .timeline({
        defaults: {
          ease: 'power4.out',
          stagger: { amount: 0.1, from: 'end' },
        },

        delay: 1,
      })
      .from(
        chars,
        {
          //   opacity: 0,
          //   y: '40%',
          rotateX: '90deg',
          duration: 1.2,
        },
        0
      )
      .fromTo(
        subtitle,
        { opacity: 0, y: '50%' },
        {
          opacity: 1,
          y: '0%',
          duration: 1,
        },
        0
      )
  }, [])

  return (
    <>
      <div className="grid-full flex flex-center">
        <CustomBackground />
        <h1 className="grid place-items-center">
          <div
            className="text-bigger font-uncutB tracking-tighter"
            id="js--title"
          >
            ANPM
          </div>
          <div className="text-small" id="js--subtitle">
            Frontend Developer based in Sri Lanka.
          </div>
        </h1>
        <div className="absolute bottom-0 mb-4 stroke-white text-5xl">
          <Arrow />
        </div>
      </div>
    </>
  )
}

export default Hero
