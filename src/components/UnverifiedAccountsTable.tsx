import React from 'react'
import Image from 'next/image'
import emailJS from '@emailjs/browser'
import { useGetUnverifiedAccounts } from '@/helpers/tanstack/queries/unveried-accounts'
import { useVerifyAccountMutation } from '@/helpers/tanstack/mutations/verify-account'

interface AcceptVerifyAccountModalProps {
  accountName: string
  accountEmail: string
  userId: string
  isOpen: boolean
  onClose: (value: boolean) => void
}

const UnverifiedAccountsTable = () => {

  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [userId, setUserId] = React.useState<string>('')

  const { data: unverifiedAccounts, isLoading } = useGetUnverifiedAccounts()

  return (
    <>
      {isLoading
        ? <div className="flex flex-row items-center justify-center w-full h-full p-5 border-b border-x border-slate-900">
            <h2 className="text-xl text-olive">Loading...</h2>
          </div>
        : <table className="w-full border-collapse border border-slate-500 text-olive text-sm">
            <thead>
              <tr>
                <th className="border-b border-x border-slate-600 p-3">Image</th>
                <th className="border-b border-x border-slate-600 p-3">Account Type</th>
                <th className="border-b border-x border-slate-600 p-3">Name</th>
                <th className="border-b border-x border-slate-600 p-3">Address</th>
                <th className="border-b border-x border-slate-600 p-3">Contact No.</th>
                <th className="border-b border-x border-slate-600 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {unverifiedAccounts.map((farmer: { id: string, image: string, account_type: string, first_name: string, last_name: string, address: string, email: string, contact_num: string }) => (
                <tr key={farmer.id}>
                  <td className="border border-slate-700 w-[5rem]">
                    {farmer.image
                      ? <Image
                          src={farmer.image}
                          width={500}
                          height={500}
                          className="w-[5rem] h-[5rem] object-cover"
                          quality={100}
                          alt="Profile"
                          blurDataURL={farmer.image}
                          placeholder="blur"
                        />
                      : <div className="flex flex-row items-center justify-center w-[5rem] h-[5rem] object-cover bg-neutral-200">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-neutral-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        </div>
                    }
                  </td>
                  <td className="border border-slate-700 p-3">{ farmer.account_type?.replace(/_/g, "/") }</td>
                  <td className="border border-slate-700 p-3">{ farmer.first_name + ' ' + farmer.last_name }</td>
                  <td className="border border-slate-700 p-3">{ farmer.address }</td>
                  <td className="border border-slate-700 p-3">{ farmer.contact_num }</td>
                  <td className="border border-slate-700 p-3">
                    <div className="flex flex-row items-center justify-center w-full">
                      <button
                        type="button"
                        className="px-3 py-1 rounded-xl text-sm transition ease-in-out duration-200 bg-yellow-green hover:opacity-50"
                        onClick={() => {
                          setIsOpenModal(true)
                          setName(farmer.first_name + ' ' + farmer.last_name)
                          setEmail(farmer.email)
                          setUserId(farmer.id)
                        }}
                      >
                        Verify
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      }
      <AcceptVerifyAccountModal
        accountName={name}
        accountEmail={email}
        userId={userId}
        isOpen={isOpenModal}
        onClose={setIsOpenModal}
      />
    </>
  )
}

const AcceptVerifyAccountModal: React.FC<AcceptVerifyAccountModalProps> = ({ accountName, accountEmail, userId, isOpen, onClose }) => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const verifyAccountMutation = useVerifyAccountMutation()

  const verifyAccountHandle = async () => {
    setIsLoading(true)
    await verifyAccountMutation.mutateAsync({ userId }, {
      onError: () => {
        setIsLoading(false)
      },
      onSuccess: async () => {
        const to_name = accountName
        const user_email = accountEmail
        const message = "Your account is successfully verfied by FarmFriend Administrator. Thanks for using this app."

        const mail = await emailJS.send(
          String(process.env.EMAILJS_SERVICE_ID),
          String(process.env.EMAILJS_TEMPLATE_ID),
          { to_name, user_email, message },
          String(process.env.EMAILJS_PUBLIC_KEY)
        )

        if (mail) {
          setIsLoading(false)
          onClose(false)
        } else {
          setIsLoading(false)
        }
      }
    })
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <button
        type="button"
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => onClose(false)}
      />
      <div className="flex flex-col w-full max-w-xl h-full md:h-auto bg-white p-0 md:p-5 z-10">
        <div className="flex justify-end p-3 md:p-0">
          <button
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.4 24L0 21.6L9.6 12L0 2.4L2.4 0L12 9.6L21.6 0L24 2.4L14.4 12L24 21.6L21.6 24L12 14.4L2.4 24Z"
                fill="#ED7D31"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center w-full mt-10 space-y-10">
          <p className="text-center">Are you sure you want to verify this LGU/NGO account named {accountName}?</p>
          <div className="flex flex-row items-center justify-end w-full space-x-2">
            <button
              disabled={isLoading}
              type="button"
              className={`px-3 py-1 rounded-xl text-sm transition ease-in-out duration-200 bg-yellow-green hover:opacity-50 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
              onClick={verifyAccountHandle}
            >
              {isLoading ? 'Verifying...' : "Proceed"}
            </button>
            <button
              type="button"
              className="px-3 py-1 rounded-xl text-sm transition ease-in-out duration-200 text-white bg-neutral-500 hover:opacity-50"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnverifiedAccountsTable