import React from 'react'
import nookies from 'nookies'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/layouts/MainLayout'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useGetAccount } from '@/helpers/tanstack/queries/account'
import { useTriggerAutomatedPushNotificationMutation } from '@/helpers/tanstack/mutations/automated-push-notification'

interface IProps {
  cookies: any
}

const Profile: NextPage<IProps> = ({ cookies }) => {

  const { data: account, isLoading: isLoadingAccount, isError: isErrorAccount, error: errorAccount } = useGetAccount()

  const triggerAutomatedPushNotificationMutation = useTriggerAutomatedPushNotificationMutation()

  // check if the user is not logged in...
  React.useEffect(() => {
    if (!cookies['farmfriend_web']) {
      Router.replace('/login')
    }
  }, [cookies])

  React.useEffect(() => {
    const defaultTimeOptions = '10:00:00'
    const getTimeOptions = localStorage.getItem("TIME_OPTION") ?? defaultTimeOptions
    
    const interval = setInterval(async () => {
      const currentTime = moment().format('HH:mm:ss')

      console.log(currentTime + "==" + getTimeOptions)

      if (currentTime == getTimeOptions) {
        await triggerAutomatedPushNotificationMutation.mutateAsync({
          currentTemp: '26',
          currentAverageTemp: '29'
        })
      }
      
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoadingAccount) return <Loading />
  if (isErrorAccount) return <Error error={errorAccount.response?.data?.message} />

  return (
    <>
      <Head>
        <title>FarmFriend (Home)</title>
      </Head>
      <MainLayout account={account}>
        <div className="flex flex-col items-center w-full py-10 space-y-5">
          <div className="flex flex-col items-center w-full">
            {account.image
              ? <Link href={account.image} target="_blank">
                  <Image
                    src={`${account.image}`}
                    width={500}
                    height={500}
                    className="w-[18rem] h-[18rem] rounded-full object-cover border-[1rem] border-yellow-green bg-neutral-200"
                    quality={100}
                    alt="Profile"
                    blurDataURL={`${account.image}`}
                    placeholder="blur"
                  />
                </Link>
              : <div className="flex flex-row items-center justify-center w-[18rem] h-[18rem] rounded-full object-cover border-[1rem] border-yellow-green bg-neutral-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[10rem] h-[10rem] text-neutral-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
            }
          </div>
          <div className="flex flex-col items-center w-full space-y-2">
            <h1 className="font-bold text-2xl text-olive-dark">{ account.first_name + ' ' + account.last_name }</h1>
            <h3 className="font-bold text-lg text-olive">{ account.account_type }</h3>
            <h3 className="text-base text-olive">{ account.address }</h3>
          </div>
          <Link
            href="/edit"
            className="w-[10rem] px-3 py-2 rounded-full text-center text-white bg-olive transition ease-in-out duration-200 hover:bg-opacity-50"
          >
            Edit Account
          </Link>
        </div>
      </MainLayout>
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies  = nookies.get(ctx)
  return {
    props: {
      cookies
    }
  }
}

export default Profile