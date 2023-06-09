import React from 'react'
import nookies from 'nookies'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import MainLayout from '@/layouts/MainLayout'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useGetAccount } from '@/helpers/tanstack/queries/account'

interface IProps {
  cookies: any
}

const Options: NextPage<IProps> = ({ cookies }) => {

  const [hour, setHour] = React.useState<string>('10')
  const [minute, setMinute] = React.useState<string>('00')
  const [second, setSecond] = React.useState<string>('00')

  const [currentTime, setCurrentTime] = React.useState<string>(moment().format('HH:mm:ss'))

  const { data: account, isLoading: isLoadingAccount, isError: isErrorAccount, error: errorAccount } = useGetAccount()

  // check if the user is not logged in...
  React.useEffect(() => {
    if (!cookies['farmfriend_web']) {
      Router.replace('/login')
    }
  }, [cookies])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoadingAccount) return <Loading />
  if (isErrorAccount) return <Error error={errorAccount.response?.data?.message} />

  const onSaveOptions = (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const timeOptions = `${hour}:${minute}:${second}`

   localStorage.setItem("TIME_OPTION", timeOptions)

   Router.push('/')
  }

  return (
    <>
      <Head>
        <title>FarmFriend (Options Us)</title>
      </Head>
      <MainLayout account={account}>
        <div className="flex flex-col items-center justify-center w-full h-full p-10 space-y-10">
          <h1 className="font-bold text-2xl text-olive-dark">PUSH NOTIFICATION OPTIONS</h1>
          <h2 className="font-bold text-5xl text-olive">{ currentTime }</h2>
          <h3 className="font-normal text-lg text-olive">Set time to trigger Mobile Auto-generated Push Notification</h3>
          <form onSubmit={onSaveOptions} className="flex flex-col items-center justify-center w-full max-w-md space-y-2">
            <div className="flex flex-row items-center justify-center w-full space-x-3">
              <div className="flex flex-col items-center w-full space-y-2">
                <label htmlFor="hour" className="ml-3 text-sm text-neutral-400">Hour</label>
                <select
                  id="hour"
                  className="outline-none w-full px-5 py-2 rounded-full bg-neutral-200"
                  value={hour}
                  onChange={(e: React.FormEvent<HTMLSelectElement>) => setHour(e.currentTarget.value)}
                >
                  {Array.from({ length: 24 }, (_, index) => index).map((number) => (
                    <option key={number} value={number.toString().padStart(2, '0')}>{number.toString().padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-center w-full space-y-2">
                <label htmlFor="minute" className="ml-3 text-sm text-neutral-400">Minute</label>
                <select
                  id="minute"
                  className="outline-none w-full px-5 py-2 rounded-full bg-neutral-200"
                  value={minute}
                  onChange={(e: React.FormEvent<HTMLSelectElement>) => setMinute(e.currentTarget.value)}
                >
                  {Array.from({ length: 60 }, (_, index) => index).map((number) => (
                    <option key={number} value={number.toString().padStart(2, '0')}>{number.toString().padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-center w-full space-y-2">
                <label htmlFor="second" className="ml-3 text-sm text-neutral-400">Second</label>
                <select
                  id="second"
                  className="outline-none w-full px-5 py-2 rounded-full bg-neutral-200"
                  value={second}
                  onChange={(e: React.FormEvent<HTMLSelectElement>) => setSecond(e.currentTarget.value)}
                >
                  {Array.from({ length: 60 }, (_, index) => index).map((number) => (
                    <option key={number} value={number.toString().padStart(2, '0')}>{number.toString().padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="outline-none w-full px-3 py-2 rounded-full text-white bg-olive transition ease-in-out duration-200 hover:bg-opacity-50"
              onClick={onSaveOptions}
            >
              Save
            </button>
          </form>
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

export default Options