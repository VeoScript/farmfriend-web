import React from 'react'
import Image from 'next/image'
import { useGetMonitoringCrops } from '@/helpers/tanstack/queries/monitoring/crops'

const CropsTable = () => {

  const { data: crops, isLoading } = useGetMonitoringCrops()

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
                <th className="border-b border-x border-slate-600 p-3">Temperature</th>
                <th className="border-b border-x border-slate-600 p-3">Maximum Temperature</th>
                <th className="border-b border-x border-slate-600 p-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop: { id: string, image: string, name: string, temperature: string, max_temperature: string, description: string }) => (
                <tr key={crop.id}>
                  <td className="border border-slate-700 w-[5rem]">
                    <Image
                      src={crop.image}
                      width={500}
                      height={500}
                      className="w-[5rem] h-[5rem] object-cover"
                      quality={100}
                      alt="Profile"
                      blurDataURL={crop.image}
                      placeholder="blur"
                    />
                  </td>
                  <td className="border border-slate-700 p-3">{ crop.name }</td>
                  <td className="border border-slate-700 p-3">{ crop.temperature }</td>
                  <td className="border border-slate-700 p-3">{ crop.max_temperature }</td>
                  <td className="border border-slate-700 p-3">{ crop.description }</td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </>
  )
}

export default CropsTable