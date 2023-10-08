import {
  ScrollContextProvider,
  ScrollWrapper,
} from '@/components/layout/ScrollWrapper'
import './styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const _description =
  'Uncode crafts exceptional websites tailored to your brand, blending cutting-edge tech with user-centric design. Elevate your online presence with us today!'

export const metadata: Metadata = {
  title: {
    default: 'UNCODE',
    template: '%s | UNCODE',
  },
  description: _description,
  generator: 'Next.js',
  applicationName: 'Uncode',
  referrer: 'origin-when-cross-origin',
  keywords: ['Web Development', 'React', 'Frontend'],
  authors: [{ name: 'Anupama Weerawardhana' }],
  creator: 'Anupama Weerawardhana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollContextProvider>
          <ScrollWrapper />
          {children}
        </ScrollContextProvider>
      </body>
    </html>
  )
}
