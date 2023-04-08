import React from 'react'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-olive-light">
      <Image
        src={'/images/farmfriend-logo.png'}
        width={500}
        height={500}
        className="flex w-[15rem] h-[15rem] rounded-full object-cover"
        quality={100}
        alt="Profile"
        blurDataURL={'/images/farmfriend-logo.png'}
        placeholder="blur"
      />
      <div className="flex flex-col items-center w-full space-y-2">
        <h1 className="font-bold text-2xl">Loading...</h1>
        <h3 className="text-base">Great things take time!</h3>
      </div>
    </div>
  )
}

export default Loading