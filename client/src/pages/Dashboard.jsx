import React from 'react'
import { PlusIcon, UploadCloud, UploadCloudIcon } from 'lucide-react'

const Dashboard = () => {
  return (
    <div>
      <div className='max-w-7xl mx-auto py-8 px-4'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Joe Doe</p>

        <div className='flex gap-4'>
          <button className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <PlusIcon
              className="size-11 p-2.5 rounded-full text-white 
               bg-gradient-to-br from-indigo-300 to-indigo-500 
               transition-all duration-300 group-hover:scale-110"
            />
            <p className="text-sm text-slate-600 group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>
          <button className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <UploadCloudIcon
              className="size-11 p-2.5 rounded-full text-white 
               bg-gradient-to-br from-purple-300 to-purple-500 
               transition-all duration-300 group-hover:scale-110"
            />
            <p className="text-sm text-slate-600 group-hover:text-indigo-600 transition-all duration-300">Upload Existing</p>
          </button>
        </div>
        <hr className='border-slate-300 my-6 sm:w-[305px]'/>
      </div>
    </div>
  )
}
export default Dashboard