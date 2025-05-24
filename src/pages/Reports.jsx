import React from 'react'
import withAuth from '../hoc/withAuth'

function Reports() {
  return (
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
             Reports
            </h1>
            <p className="text-gray-500 mt-1">
                View and manage your reports
            </p>
          </div>
          </div>
          </div>
          </div>
  )
}
export default withAuth(Reports)
