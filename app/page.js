import Head from 'next/head'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className='bg-rose-50/80 min-h-screen'>
      <Head>
        <title>W.I.L - Luxury Fashion</title>
        <meta name="description" content="Luxury Fashion Brand W.I.L" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Main />
      <Footer/>
    </div>
  )
}