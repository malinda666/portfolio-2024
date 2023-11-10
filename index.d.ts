import { Object3DNode } from '@react-three/fiber'

declare module '@14islands/r3f-scroll-rig/powerups'
declare module '@react-three/fiber' {
  interface ThreeElements {
    customMaterial: Object3DNode<CustomElement, typeof CustomElement>
  }
}
