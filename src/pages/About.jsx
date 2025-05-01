import React from 'react'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our Warehouse Management System</h1>
        <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To provide innovative warehouse management solutions that streamline operations, 
            maximize efficiency, and deliver exceptional value to our clients through 
            cutting-edge technology and dedicated support.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            Our Vision
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To become the global leader in warehouse management technology, transforming 
            how businesses handle inventory and logistics through intuitive, scalable, and 
            reliable software solutions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Our Values
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-6 h-6 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 text-lg">Commitment to excellence in every feature we develop</span>
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-6 h-6 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 text-lg">Customer-centric approach to problem solving</span>
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-6 h-6 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 text-lg">Continuous innovation in warehouse technology</span>
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-6 h-6 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 text-lg">Integrity in all our business practices</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

