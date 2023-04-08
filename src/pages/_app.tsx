import '@/styles/tailwind.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '700']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --poppins-font: ${poppins.style.fontFamily}
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  )
}
