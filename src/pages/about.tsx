import React from 'react'
import Head from 'next/head'
import MainLayout from '@/layouts/MainLayout'

const About = () => {
  return (
    <>
      <Head>
        <title>FarmFriend (About Us)</title>
      </Head>
      <MainLayout>
        <div className="flex flex-col items-center w-full py-10 space-y-5">
          <h1>About Page</h1>
        </div>
      </MainLayout>
    </>
  )
}

export default About