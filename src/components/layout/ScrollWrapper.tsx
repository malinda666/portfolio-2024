'use client'

import Lenis from '@studio-freight/lenis'
import { useRouter } from 'next/router'
import {
  Context,
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'

type ScrollValues = {
  velocity: number
  animated: number
  target: number
}

interface ScrollContextProps {
  lenis: Lenis | null
  setLenis: Dispatch<SetStateAction<Lenis | null>>
  values: ScrollValues
  setValues: Dispatch<SetStateAction<ScrollValues>>
}

const ScrollContext = createContext<ScrollContextProps>({
  lenis: null,
  setLenis: () => {},
  values: {
    velocity: 0,
    animated: 0,
    target: 0,
  },
  setValues: () => {},
})

export const ScrollContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [values, setValues] = useState<ScrollValues>({
    velocity: 0,
    animated: 0,
    target: 0,
  })

  return (
    <ScrollContext.Provider
      value={{
        lenis,
        setLenis,
        values,
        setValues,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => useContext(ScrollContext)

export const ScrollWrapper: FC = () => {
  const scroll = useScroll()

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
      scroll.setLenis(lenis)
    }

    lenis.on('scroll', (ev: any) => {
      scroll.setValues({
        velocity: ev.velocity,
        target: ev.targetScroll,
        animated: ev.animatedScroll,
      })
    })

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      scroll.setLenis(null)
    }
  }, [])

  return <></>
}
