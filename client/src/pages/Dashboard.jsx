import React, { use, useEffect, useState } from 'react'
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from 'lucide-react'
import { dummyResumeData } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, settitle] = useState('')
  const [resume, setresume] = useState(null)
  const [editResumeId, seteditResumeId] = useState('')

  const navigate = useNavigate()

  const createResume = async (event) => {
    event.preventDefault()
    setShowCreateResume(false)
    navigate('/app/builder/res123')
  }

  useEffect(() => {
    setAllResumes(dummyResumeData)
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Mobile welcome */}
      <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
        Welcome, Joe Doe
      </p>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button onClick={()=> setShowCreateResume(true)} className="group w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-lg transition-all duration-300">
          <PlusIcon className="size-11 p-2.5 rounded-full text-white bg-gradient-to-br from-indigo-300 to-indigo-500 transition-all duration-300 group-hover:scale-110" />
          <p className="text-sm group-hover:text-indigo-600 transition-all">
            Create Resume
          </p>
        </button>

        <button className="group w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-purple-500 hover:shadow-lg transition-all duration-300">
          <UploadCloudIcon className="size-11 p-2.5 rounded-full text-white bg-gradient-to-br from-purple-300 to-purple-500 transition-all duration-300 group-hover:scale-110" />
          <p className="text-sm group-hover:text-purple-600 transition-all">
            Upload Existing
          </p>
        </button>
      </div>

      <hr className="border-slate-300 my-6 sm:w-[305px]" />

      {/* Resume cards */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length]

          return (
            <button
              key={resume.id}
              className="group relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border hover:shadow-lg transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: `${baseColor}40`,
              }}
            >
              <FilePenLineIcon
                className="size-7 transition-all group-hover:scale-105"
                style={{ color: baseColor }}
              />

              <p
                className="text-sm transition-all group-hover:scale-105"
                style={{ color: baseColor }}
              >
                {resume.title}
              </p>

              <p
                className="absolute bottom-1 text-[11px] px-2 text-center transition-all"
                style={{ color: `${baseColor}90` }}
              >
                Updated on{' '}
                {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div className="absolute top-1 right-1 hidden group-hover:flex items-center gap-1">
                <TrashIcon className="size-7 p-1.5 rounded text-slate-700 hover:bg-white/50 transition-colors" />
                <PencilIcon className="size-7 p-1.5 rounded text-slate-700 hover:bg-white/50 transition-colors" />
              </div>
            </button>
          )
        })}
      </div>

      <div>
        {showCreateResume && (
          <form onSubmit={createResume} onClick={()=> setShowCreateResume} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e=> e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg font-bold mb-4'>
              <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
              <input type="text" placeholder='Enter Resume Title' className='w-full px-4 py-2 mb-4 focus:border-violet-600 ring-violet-600' required />

              <button className='w-full py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors'>Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowCreateResume(false); settitle('') }} />
            </div>

          </form>
        )}
      </div>

    </div>
  )
}

export default Dashboard
