import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
  cookies: any
  children: React.ReactNode
}

type MainLayoutProps = (props: IProps) => JSX.Element

const MainLayout: MainLayoutProps = ({ cookies, children }) => {

  // check if the user is already logged in...
  React.useEffect(() => {
    if (cookies['farmfriend']) {
      Router.replace('/')
    } else {
      Router.replace('/login')
    }
  }, [cookies])

  return (
    <div className="relative flex flex-col w-full h-screen overflow-hidden font-poppins">
      <div className="flex flex-row items-center justify-between w-full px-5 py-1 border-b border-green-600 bg-olive-light">
        <Link href="/" className="flex flex-row items-center w-full">
          <Image
            src={'/images/farmfriend-logo.png'}
            width={500}
            height={500}
            className="flex w-[4rem] h-[4rem] rounded-full object-cover"
            quality={100}
            alt="Profile"
            blurDataURL={'/images/farmfriend-logo.png'}
            placeholder="blur"
          />
          <h2 className="font-bold text-base text-yellow-green uppercase">FarmFriend</h2>
        </Link>
        <div className="flex flex-row items-center justify-end w-full space-x-2">
          <Link href="/" className="px-3 py-1 rounded-xl text-sm bg-yellow-green transition ease-in-out duration-200 hover:bg-opacity-50">
            Home
          </Link>
          <Link href="/" className="px-3 py-1 rounded-xl text-sm bg-yellow-green transition ease-in-out duration-200 hover:bg-opacity-50">
            Profile
          </Link>
          <Link href="/" className="px-3 py-1 rounded-xl text-sm bg-yellow-green transition ease-in-out duration-200 hover:bg-opacity-50">
            About Us
          </Link>
          <Link href="/" className="px-3 py-1 rounded-xl text-sm bg-yellow-green transition ease-in-out duration-200 hover:bg-opacity-50">
            Log out
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-full overflow-auto">
        { children }
      </div>
      <div className="flex flex-row items-center justify-between w-full px-10 py-5 overflow-hidden text-white border-t border-green-600 bg-olive-light">
        <div className="flex flex-col items-start w-full">
          <h2 className="font-bold text-xl text-yellow-green">FARMFRIEND</h2>
          <h6 className="font-light text-xs">2022 © FARMFRIEND</h6>
          <h6 className="font-light text-xs">All rights reserved.</h6>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col">
            <Link href="https://www.da.gov.ph/" target="_blank" className="text-sm hover:underline">
              Department of Agriculture
            </Link>
            <Link href="https://www.denr.gov.ph/" target="_blank" className="text-sm hover:underline">
              Department of Environment
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-end w-full">
          <Link href="/" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/" className="text-sm hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainLayout