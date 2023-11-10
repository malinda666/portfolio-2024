import Hero from '@/components/views/home/Hero'

export default function Home() {
  return (
    <>
      <section className="grid">
        <Hero />
      </section>
      <section className="grid bg-transparent">
        <div className="text-9xl">Hello</div>
      </section>
      <section className="grid bg-transparent">
        <div className="text-9xl">Hello</div>
      </section>
    </>
  )
}
