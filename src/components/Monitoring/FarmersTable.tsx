import React from 'react'
import Image from 'next/image'
import { useGetMonitoringFarmers } from '@/helpers/tanstack/queries/monitoring/farmers'

const FarmersTable = () => {

  const { data: farmers, isLoading } = useGetMonitoringFarmers()

  return (
    <>
      {isLoading
        ? <div className="flex flex-row items-center justify-center w-full h-full p-5 border-b border-x border-slate-900">
            <h2 className="text-xl text-olive">Loading...</h2>
          </div>
        : <table className="w-full border-collapse border-b border-x border-slate-500 text-olive text-sm">
            <thead>
              <tr>
                <th className="border-b border-x border-slate-600 p-3">Image</th>
                <th className="border-b border-x border-slate-600 p-3">Name</th>
                <th className="border-b border-x border-slate-600 p-3">Address</th>
                <th className="border-b border-x border-slate-600 p-3">Contact No.</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer: { id: string, image: string, first_name: string, last_name: string, address: string, contact_num: string }) => (
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
                  <td className="border border-slate-700 p-3">{ farmer.first_name + ' ' + farmer.last_name }</td>
                  <td className="border border-slate-700 p-3">{ farmer.address }</td>
                  <td className="border border-slate-700 p-3">{ farmer.contact_num }</td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </>
  )
}

export default FarmersTable