import React from 'react'
import Image from 'next/image'

interface IProps {
  error?: string
}

type ErrorProps = (props: IProps) => JSX.Element

const Error: ErrorProps = ({ error }) => {
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <div className="flex flex-col items-center w-full space-y-2">
        <h1 className="font-bold text-2xl">{ error ? error : 'Opps! There is an error.' }</h1>
        {!error && (
          <h3 className="text-base">We're trying to fix this ASAP.</h3>
        )}
      </div>
    </div>
  )
}

export default Error