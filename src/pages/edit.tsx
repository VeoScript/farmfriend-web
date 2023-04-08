import React from 'react'
import nookies from 'nookies'
import Head from 'next/head'
import Router from 'next/router'
import MainLayout from '@/layouts/MainLayout'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useGetAccount } from '@/helpers/tanstack/queries/account'
import { useEditAccountMutation } from '@/helpers/tanstack/mutations/edit'
import { useChangePasswordMutation } from '@/helpers/tanstack/mutations/change-password'

interface IProps {
  cookies: any
}

const Edit: NextPage<IProps> = ({ cookies }) => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  const [isLoadingChangePassword, setIsLoadingChangePassword] = React.useState<boolean>(false)
  const [errorChangePassword, setErrorChangePassword] = React.useState<string>('')
  const [firstName, setFirstName] = React.useState<string>('')
  const [lastName, setLastName] = React.useState<string>('')
  const [address, setAddress] = React.useState<string>('')
  const [contactNum, setContactNum] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')

  const [oldPassword, setOldPassword] = React.useState<string>('')
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [rePassword, setRepassword] = React.useState<string>('')

  const { data: account, isLoading: isLoadingAccount, isError: isErrorAccount, error: errorAccount } = useGetAccount()

  const editAccountMutation = useEditAccountMutation()
  const changePasswordMutation = useChangePasswordMutation()

  // check if the user is not logged in...
  React.useEffect(() => {
    if (!cookies['farmfriend_web']) {
      Router.replace('/login')
    }
  }, [cookies])

  React.useEffect(() => {
    setFirstName(account?.first_name)
    setLastName(account?.last_name)
    setAddress(account?.address)
    setContactNum(account?.contact_num)
    setEmail(account?.email)
  }, [account])

  const handleEditAccount = async (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (firstName === '') return setError('First name is required')
    if (lastName === '') return setError('Last name is required')
    if (address === '') return setError('Address is required')
    if (contactNum === '') return setError('Contact no. is required')
    if (email === '') return setError('Email is required')

    setIsLoading(true)
    
    await editAccountMutation.mutateAsync({
      first_name: firstName,
      last_name: lastName,
      address: address,
      contact_num: contactNum,
      email: email
    },
    {
      onError: (error: any) => {
        setIsLoading(false)
        setError(error.response?.data?.message)
      },
      onSuccess: () => {
        setIsLoading(false)
      }
    })
  }

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (oldPassword === '') return setErrorChangePassword('Old password is required')
    if (newPassword === '') return setErrorChangePassword('New password is required')
    if (rePassword === '') return setErrorChangePassword('Re-enter password is required')
    if (newPassword !== rePassword) return setErrorChangePassword('New password not matched')

    setIsLoadingChangePassword(true)
    
    await changePasswordMutation.mutateAsync({
      new_password: newPassword,
      old_password: oldPassword
    },
    {
      onError: (error: any) => {
        setIsLoadingChangePassword(false)
        setErrorChangePassword(error.response?.data?.message)
      },
      onSuccess: () => {
        setIsLoadingChangePassword(false)
      }
    })
  }

  if (isLoadingAccount) return <Loading />
  if (isErrorAccount) return <Error error={errorAccount.response?.data?.message} />

  return (
    <>
      <Head>
        <title>FarmFriend (Edit)</title>
      </Head>
      <MainLayout account={account}>
        <div className="flex flex-row items-start justify-between w-full max-w-5xl py-10 space-x-10">
          <div className="flex flex-col items-start w-full space-y-5">
            <h3 className="ml-3 font-bold text-xl text-olive">Account Information</h3>
            {error && (
              <div className="flex flex-row items-center justify-center w-full p-3 rounded-xl bg-red-500 bg-opacity-50">
                <h3 className="font-thin text-sm text-white">{ error }</h3>
              </div>
            )}
            <form onSubmit={handleEditAccount} className="flex flex-col items-center w-full space-y-5">
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="firstName" className="ml-3 text-sm text-neutral-400">First name</label>
                <input
                  id="firstName"
                  type="text"
                  disabled={isLoading}
                  className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                  value={firstName}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setFirstName(e.currentTarget.value)
                    setError('')
                  }}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="lastName" className="ml-3 text-sm text-neutral-400">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  disabled={isLoading}
                  className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                  value={lastName}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setLastName(e.currentTarget.value)
                    setError('')
                  }}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="address" className="ml-3 text-sm text-neutral-400">Address</label>
                <input
                  id="address"
                  type="text"
                  disabled={isLoading}
                  className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                  value={address}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setAddress(e.currentTarget.value)
                    setError('')
                  }}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="contactNum" className="ml-3 text-sm text-neutral-400">Contact No.</label>
                <input
                  id="contactNum"
                  type="text"
                  disabled={isLoading}
                  className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                  value={contactNum}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setContactNum(e.currentTarget.value)
                    setError('')
                  }}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="email" className="ml-3 text-sm text-neutral-400">Email</label>
                <input
                  id="email"
                  type="email"
                  disabled={isLoading}
                  className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                  value={email}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setEmail(e.currentTarget.value)
                    setError('')
                  }}
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className={`outline-none w-full px-3 py-2 rounded-full text-white bg-olive transition ease-in-out duration-200 hover:bg-opacity-50 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                onClick={handleEditAccount}
              >
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </form>
          </div>
          <div className="flex flex-col items-start w-full space-y-5">
            <h3 className="ml-3 font-bold text-xl text-olive">Change Password</h3>
            {errorChangePassword && (
              <div className="flex flex-row items-center justify-center w-full p-3 rounded-xl bg-red-500 bg-opacity-50">
                <h3 className="font-thin text-sm text-white">{ errorChangePassword }</h3>
              </div>
            )}
            <form onSubmit={handleChangePassword} className="flex flex-col items-center w-full space-y-5">
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="oldPassword" className="ml-3 text-sm text-neutral-400">Old password</label>
                <input
                  id="oldPassword"
                  type="password"
                  disabled={isLoadingChangePassword}
                  className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                  value={oldPassword}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setOldPassword(e.currentTarget.value)
                    setError('')
                  }}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="newPassword" className="ml-3 text-sm text-neutral-400">New password</label>
                <input
                  id="newPassword"
                  type="password"
                  disabled={isLoadingChangePassword}
                  className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                  value={newPassword}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setNewPassword(e.currentTarget.value)
                    setError('')
                  }}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="rePassword" className="ml-3 text-sm text-neutral-400">Re-enter password</label>
                <input
                  id="rePassword"
                  type="password"
                  disabled={isLoadingChangePassword}
                  className="outline-none w-full px-3 py-2 rounded-full bg-neutral-200"
                  value={rePassword}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setRepassword(e.currentTarget.value)
                    setError('')
                  }}
                />
              </div>
              <button
                disabled={isLoadingChangePassword}
                type="submit"
                className={`outline-none w-full px-3 py-2 rounded-full text-white bg-olive transition ease-in-out duration-200 hover:bg-opacity-50 ${isLoadingChangePassword ? 'opacity-50' : 'opacity-100'}`}
                onClick={handleChangePassword}
              >
                {isLoadingChangePassword ? 'Changing...' : 'Change'}
              </button>
            </form>
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

export default Edit