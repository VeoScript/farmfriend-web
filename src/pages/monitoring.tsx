import React from 'react'
import nookies from 'nookies'
import Head from 'next/head'
import Router from 'next/router'
import MainLayout from '@/layouts/MainLayout'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import CropsTable from '@/components/Monitoring/CropsTable'
import FarmersTable from '@/components/Monitoring/FarmersTable'
import LguNgoTable from '@/components/Monitoring/LguNgoTable'
import ReportsTable from '@/components/Monitoring/ReportsTable'
import RatesTable from '@/components/Monitoring/RatesTable'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useGetAccount } from '@/helpers/tanstack/queries/account'
import { useGetCountCrops } from '@/helpers/tanstack/queries/monitoring/counts/crops'
import { useGetCountFarmers } from '@/helpers/tanstack/queries/monitoring/counts/farmers'
import { useGetCountLguNgo } from '@/helpers/tanstack/queries/monitoring/counts/lgu-ngo'
import { useGetCountReports } from '@/helpers/tanstack/queries/monitoring/counts/reports'
import { useGetCountRates } from '@/helpers/tanstack/queries/monitoring/counts/rates'

interface IProps {
  cookies: any
}

const Monitoring: NextPage<IProps> = ({ cookies }) => {

  const { data: account, isLoading: isLoadingAccount, isError: isErrorAccount, error: errorAccount } = useGetAccount()
  const { data: countCrops, isLoading: isLoadingCountCrops, isError: isErrorCrops, error: errorCrops } = useGetCountCrops()
  const { data: countFarmers, isLoading: isLoadingCountFarmers, isError: isErrorFarmers, error: errorFarmers } = useGetCountFarmers()
  const { data: countLguNgo, isLoading: isLoadingCountLguNgo, isError: isErrorLguNgo, error: errorLguNgo } = useGetCountLguNgo()
  const { data: countReports, isLoading: isLoadingCountReports, isError: isErrorReports, error: errorReports } = useGetCountReports()
  const { data: countRate, isLoading: isLoadingCountRates, isError: isErrorRates, error: errorRates } = useGetCountRates()

  // check if the user is not logged in...
  React.useEffect(() => {
    if (!cookies['farmfriend_web']) {
      Router.replace('/login')
    }
  }, [cookies])

  if (isLoadingAccount) return <Loading />
  if (isErrorAccount) return <Error error={errorAccount.response?.data?.message} />
  if (isErrorCrops) return <Error error={errorCrops.response?.data?.message} />
  if (isErrorFarmers) return <Error error={errorFarmers.response?.data?.message} />
  if (isErrorLguNgo) return <Error error={errorLguNgo.response?.data?.message} />
  if (isErrorReports) return <Error error={errorReports.response?.data?.message} />
  if (isErrorRates) return <Error error={errorRates.response?.data?.message} />

  return (
    <>
      <Head>
        <title>FarmFriend (Monitoring)</title>
      </Head>
      <MainLayout account={account}>
        <div className="flex flex-col items-center w-full p-5 space-y-5">
          <div className="grid grid-flow-row-dense grid-cols-2 gap-4 w-full h-auto">
            <div className="col-span-2 flex flex-col items-center w-full h-full max-h-[30rem] overflow-y-auto">
              <div className="sticky top-0 flex flex-row items-center justify-between w-full p-3 border-x border-y border-slate-600 bg-olive-semi-light">
                <h3 className="font-bold text-lg text-white">Crops List</h3>
                <h3 className="font-bold text-sm text-yellow-green">{ isLoadingCountCrops ? 'Counting...' : `${countCrops} records` }</h3>
              </div>
              <CropsTable />
            </div>
            <div className="realtive flex flex-col items-center w-full h-full max-h-[30rem] overflow-y-auto">
              <div className="sticky top-0 flex flex-row items-center justify-between w-full p-3 border-x border-y border-slate-600 bg-olive-semi-light">
                <h3 className="font-bold text-lg text-white">Farmers List</h3>
                <h3 className="font-bold text-sm text-yellow-green">{ isLoadingCountFarmers ? 'Counting...' : `${countFarmers} records` }</h3>
              </div>
              <FarmersTable />
            </div>
            <div className="flex flex-col items-center w-full h-full max-h-[30rem] overflow-y-auto">
              <div className="sticky top-0 flex flex-row items-center justify-between w-full p-3 border-x border-y border-slate-600 bg-olive-semi-light">
                <h3 className="font-bold text-lg text-white">LGU/NGO List</h3>
                <h3 className="font-bold text-sm text-yellow-green">{ isLoadingCountLguNgo ? 'Counting...' : `${countLguNgo} records` }</h3>
              </div>
              <LguNgoTable />
            </div>
            <div className="flex flex-col items-center w-full h-full max-h-[30rem] overflow-y-auto">
              <div className="sticky top-0 flex flex-row items-center justify-between w-full p-3 border-x border-y border-slate-600 bg-olive-semi-light">
                <h3 className="font-bold text-lg text-white">Reports</h3>
                <h3 className="font-bold text-sm text-yellow-green">{ isLoadingCountReports ? 'Counting...' : `${countReports} records` }</h3>
              </div>
              <ReportsTable />
            </div>
            <div className="flex flex-col items-center w-full h-full max-h-[30rem] overflow-y-auto">
              <div className="sticky top-0 flex flex-row items-center justify-between w-full p-3 border-x border-y border-slate-600 bg-olive-semi-light">
                <h3 className="font-bold text-lg text-white">Rates</h3>
                <h3 className="font-bold text-sm text-yellow-green">{ isLoadingCountRates ? 'Counting...' : `${countRate} records` }</h3>
              </div>
              <RatesTable />
            </div>
          </div>
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

export default Monitoring