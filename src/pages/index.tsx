import React from 'react'
import nookies from 'nookies'
import MainLayout from '@/layouts/MainLayout'
import { GetServerSidePropsContext, NextPage } from 'next'

interface IProps {
  cookies: any
}

const Home: NextPage<IProps> = ({ cookies }) => {

  return (
    <MainLayout cookies={cookies}>
      <div>Home</div>
    </MainLayout>
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

export default Home