import React from 'react'
import moment from 'moment'
import { useGetMonitoringReports } from '@/helpers/tanstack/queries/monitoring/reports'

const ReportsTable = () => {

  const { data: reports, isLoading } = useGetMonitoringReports()

  return (
    <>
      {isLoading
        ? <div className="flex flex-row items-center justify-center w-full h-full p-5 border-b border-x border-slate-900">
            <h2 className="text-xl text-olive">Loading...</h2>
          </div>
        : <table className="w-full border-collapse border-b border-x border-slate-500 text-olive text-sm">
            <thead>
              <tr>
                <th className="border-b border-x border-slate-600 p-3">Created by</th>
                <th className="border-b border-x border-slate-600 p-3">Concern/Feedback</th>
                <th className="border-b border-x border-slate-600 p-3">Created at</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report: { id: string, type: string, description: string, created_at: string }) => (
                <tr key={report.id}>
                  <td className="border border-slate-700 p-3">{ report.type }</td>
                  <td className="border border-slate-700 p-3">{ report.description }</td>
                  <td className="border border-slate-700 p-3">{ moment(report.created_at).format('LLL') }</td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </>
  )
}

export default ReportsTable