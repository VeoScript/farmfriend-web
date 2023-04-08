import React from 'react'
import nookies from 'nookies'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/layouts/MainLayout'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useGetAccount } from '@/helpers/tanstack/queries/account'

interface IProps {
  cookies: any
}

const About: NextPage<IProps> = ({ cookies }) => {

  const { data: account, isLoading: isLoadingAccount, isError: isErrorAccount, error: errorAccount } = useGetAccount()

  // check if the user is not logged in...
  React.useEffect(() => {
    if (!cookies['farmfriend_web']) {
      Router.replace('/login')
    }
  }, [cookies])

  if (isLoadingAccount) return <Loading />
  if (isErrorAccount) return <Error error={errorAccount.response?.data?.message} />

  return (
    <>
      <Head>
        <title>FarmFriend (About Us)</title>
      </Head>
      <MainLayout account={account}>
        <div className="flex flex-col items-center w-full py-10 space-y-5">
          <h1>About Page</h1>
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

export default About