import Head from 'next/head'
import Header from './components/Header2'
import Main from './components/Main/index'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className='bg-brand-light/80 min-h-screen'>
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