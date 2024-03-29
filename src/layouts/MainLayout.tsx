import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { useLogoutMutation } from '@/helpers/tanstack/mutations/auth'
import { useTriggerAutomatedPushNotificationMutation } from '@/helpers/tanstack/mutations/automated-push-notification'

interface IProps {
  account?: any
  children: React.ReactNode
}

type MainLayoutProps = (props: IProps) => JSX.Element

const MainLayout: MainLayoutProps = ({ account, children }) => {

  const router = useRouter()

  const logoutMutation = useLogoutMutation()
  const triggerAutomatedPushNotificationMutation = useTriggerAutomatedPushNotificationMutation()

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
  }

  React.useEffect(() => {
    const defaultTimeOptions = '10:00:00'
    const getTimeOptions = localStorage.getItem("TIME_OPTION") ?? defaultTimeOptions
    
    const interval = setInterval(async () => {
      const currentTime = moment().format('HH:mm:ss')

      console.log(currentTime + "==" + getTimeOptions)

      if (currentTime == getTimeOptions) {
        await triggerAutomatedPushNotificationMutation.mutateAsync({
          currentTemp: '30',
          currentAverageTemp: '35'
        })
      }
      
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full md:h-screen overflow-y-auto md:overflow-hidden font-poppins">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
          {account && (
            <>
              <Link href="/" className={`px-3 py-1 rounded-xl text-sm transition ease-in-out duration-200 ${ router.pathname === '/' ? 'bg-green-200' : 'bg-yellow-green' } hover:bg-opacity-50`}>
                Profile
              </Link>
              <Link href="/monitoring" className={`px-3 py-1 rounded-xl text-sm transition ease-in-out duration-200 ${ router.pathname === '/monitoring' ? 'bg-green-200' : 'bg-yellow-green' } hover:bg-opacity-50`}>
                Monitoring
              </Link>
              <Link href="/check-lgu-accounts" className={`px-3 py-1 rounded-xl text-sm transition ease-in-out duration-200 ${ router.pathname === '/check-lgu-accounts' ? 'bg-green-200' : 'bg-yellow-green' } hover:bg-opacity-50`}>
                LGU Account Requests
              </Link>
              <Link href="/options" className={`px-3 py-1 rounded-xl text-sm transition ease-in-out duration-200 ${ router.pathname === '/options' ? 'bg-green-200' : 'bg-yellow-green' } hover:bg-opacity-50`}>
                Options
              </Link>
            </>
          )}
          <button
            type="button"
            className="px-3 py-1 rounded-xl text-sm bg-yellow-green transition ease-in-out duration-200 hover:bg-opacity-50"
            onClick={() => {
              if (router.pathname === '/about') {
                router.back()
              } else {
                router.push('/about')
              }
            }}
          >
            {router.pathname === '/about' ? 'Back' : 'About Us'}
          </button>
          {account && (
            <button 
              type="button"
              className="px-3 py-1 outline-none rounded-xl text-sm bg-yellow-green transition ease-in-out duration-200 hover:bg-opacity-50"
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-full overflow-hidden md:overflow-x-hidden md:overflow-y-auto">
        { children }
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full px-10 py-5 space-y-3 md:space-y-0 overflow-hidden text-white border-t border-green-600 bg-olive-light">
        <div className="flex flex-col items-start w-full">
          <h2 className="font-bold text-xl text-yellow-green">FARMFRIEND</h2>
          <h6 className="font-light text-xs">2022 © FARMFRIEND</h6>
          <h6 className="font-light text-xs">All rights reserved.</h6>
        </div>
        <div className="flex flex-col items-start md:items-center w-full">
          <div className="flex flex-col">
            <Link href="https://www.da.gov.ph/" target="_blank" className="text-sm hover:underline">
              Department of Agriculture
            </Link>
            <Link href="https://www.denr.gov.ph/" target="_blank" className="text-sm hover:underline">
              Department of Environment
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end w-full">
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