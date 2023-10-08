import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}
