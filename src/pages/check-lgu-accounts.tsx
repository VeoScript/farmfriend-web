import React from 'react'
import nookies from 'nookies'
import Head from 'next/head'
import Router from 'next/router'
import MainLayout from '@/layouts/MainLayout'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useGetAccount } from '@/helpers/tanstack/queries/account'
import UnverifiedAccountsTable from '@/components/UnverifiedAccountsTable'

interface IProps {
  cookies: any
}

const CheckLguAccounts: NextPage<IProps> = ({ cookies }) => {

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
        <title>FarmFriend (LGU Unverified Accounts)</title>
      </Head>
      <MainLayout account={account}>
        <div className="flex flex-col items-center w-full p-5 space-y-5">
          <UnverifiedAccountsTable />
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

export default CheckLguAccounts