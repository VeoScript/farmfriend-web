import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@/styles/tailwind.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '700']
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3 // retry to refetch the data from api if the internet is slow or no internet connection.
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <style jsx global>
        {`
          :root {
            --poppins-font: ${poppins.style.fontFamily}
          }
        `}
      </style>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
