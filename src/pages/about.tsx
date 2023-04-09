import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import MainLayout from '@/layouts/MainLayout'

const About = () => {
  return (
    <>
      <Head>
        <title>FarmFriend (About Us)</title>
      </Head>
      <MainLayout>
        <div className="flex flex-col items-center justify-center w-full h-full p-10 space-y-5">
          <h1 className="font-bold text-2xl text-olive-dark">THE TEAM</h1>
          <p className="w-full max-w-xl font-light text-sm text-center">
            {`"Teamwork makes the dream work! When we work together, we can achieve so much more than we could ever accomplish alone.
            By combining our strengths, supporting each other through our weaknesses, and celebrating our successes as a team, we can reach new heights and conquer any challenge that comes our way.
            So let's roll up our sleeves, put our heads together, and show the world what we're capable of when we work as one!"`}
          </p>
          <div className="flex flex-row items-center w-full space-x-5">
            <div className="flex flex-col items-center w-full p-5 shadow-xl rounded-xl border border-olive-semi-light bg-yellow-green bg-opacity-50">
              <Image
                src={'/images/farmfriend-logo.png'}
                width={500}
                height={500}
                className="flex w-[10rem] h-[10rem] rounded-full object-cover bg-yellow-green bg-opacity-50"
                quality={100}
                alt="Profile"
                blurDataURL={'/images/farmfriend-logo.png'}
                placeholder="blur"
              />
              <div className="flex flex-col items-center w-full space-y-1">
                <h1 className="font-bold text-xl text-olive">Gayle Marie Dela Torre</h1>
                <h2 className="font-bold text-base text-olive">BSIT - 4</h2>
                <h3 className="text-sm text-olive">Project Manager</h3>
              </div>
            </div>
            <div className="flex flex-col items-center w-full p-5 shadow-xl rounded-xl border border-olive-semi-light bg-yellow-green bg-opacity-50">
              <Image
                src={'/images/farmfriend-logo.png'}
                width={500}
                height={500}
                className="flex w-[10rem] h-[10rem] rounded-full object-cover bg-yellow-green bg-opacity-50"
                quality={100}
                alt="Profile"
                blurDataURL={'/images/farmfriend-logo.png'}
                placeholder="blur"
              />
              <div className="flex flex-col items-center w-full space-y-1">
                <h1 className="font-bold text-xl text-olive">Joyce Mae Catubig</h1>
                <h2 className="font-bold text-base text-olive">BSIT - 4</h2>
                <h3 className="text-sm text-olive">Writer</h3>
              </div>
            </div>
            <div className="flex flex-col items-center w-full p-5 shadow-xl rounded-xl border border-olive-semi-light bg-yellow-green bg-opacity-50">
              <Image
                src={'/images/farmfriend-logo.png'}
                width={500}
                height={500}
                className="flex w-[10rem] h-[10rem] rounded-full object-cover bg-yellow-green bg-opacity-50"
                quality={100}
                alt="Profile"
                blurDataURL={'/images/farmfriend-logo.png'}
                placeholder="blur"
              />
              <div className="flex flex-col items-center w-full space-y-1">
                <h1 className="font-bold text-xl text-olive">Mark James Miquiabas</h1>
                <h2 className="font-bold text-base text-olive">BSIT - 4</h2>
                <h3 className="text-sm text-olive">Hacker</h3>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default About