import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '@/layouts/MainLayout'

const Login = () => {

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  return (
    <>
      <Head>
        <title>FarmFriend</title>
      </Head>
      <MainLayout>
        <div className="flex flex-row items-center justify-between w-full max-w-6xl h-full space-x-20">
          <div className="flex flex-row items-center w-full">
            <Image
              src={'/images/farmfriend-logo.png'}
              width={500}
              height={500}
              className="-mt-10 w-[20rem] h-[20rem] rounded-full object-cover"
              quality={100}
              alt="Profile"
              blurDataURL={'/images/farmfriend-logo.png'}
              placeholder="blur"
            />
            <div className="flex flex-col w-full space-y-3">
              <h3 className="text-lg text-olive">Growing Stronger Together: Supporting Agriculture for a Sustainable Future.</h3>
              <button className="flex flex-row items-center justify-center w-[18rem] px-5 py-3 space-x-3 rounded-xl bg-yellow-green transition ease-in-out duration-200 hover:bg-opacity-50">
                <span className="text-sm">Download the app for Android</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center w-full max-w-sm space-y-5">
            <h2 className="font-bold text-2xl text-olive">Welcome Back!</h2>
            <div className="flex flex-col w-full space-y-2">
              <label htmlFor="email" className="ml-3 text-sm text-neutral-400">Email</label>
              <input
                id="email"
                type="email"
                className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                value={email}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label htmlFor="password" className="ml-3 text-sm text-neutral-400">Password</label>
              <input
                id="password"
                type="password"
                className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                value={password}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
              />
            </div>
            <button
              className="outline-none w-full px-3 py-2 rounded-full text-white bg-olive transition ease-in-out duration-200 hover:bg-opacity-50"
            >
              Log in
            </button>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default Login