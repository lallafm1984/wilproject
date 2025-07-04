import Main from './components/Main/index.js'
import Head from 'next/head'
import Header from './components/Header.js'
import Footer from './components/Footer.js'

export default function Home() {
  return (
    <div className='min-h-screen'>
    <Head>
      <title>W.I.L - Luxury Fashion</title>
      <meta name="description" content="Luxury Fashion Brand W.I.L" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Main />
    <Footer />

    </div>
  )
}