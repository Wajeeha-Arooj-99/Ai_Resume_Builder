import React, { useEffect, useState } from 'react'
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    setAllResumes(dummyResumeData)
  }, [])

  const createResume = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setShowCreateResume(false)
    setTitle('')
    navigate('/app/builder/res123')
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">

      {/* Mobile Welcome */}
      <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
        Welcome, Joe Doe
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4">

        {/* Create Resume */}
        <button
          type="button"
          onClick={() => setShowCreateResume(true)}
          className="group w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
        >
          <PlusIcon className="size-11 p-2.5 rounded-full text-white bg-gradient-to-br from-indigo-300 to-indigo-500 group-hover:scale-110 transition-all" />
          <p className="text-sm group-hover:text-indigo-600 transition-all">
            Create Resume
          </p>
        </button>

        {/* Upload Resume */}
        <button
          type="button"
          onClick={() => setShowUploadResume(true)}
          className="group w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-purple-500 hover:shadow-lg transition-all duration-300"
        >
          <UploadCloudIcon className="size-11 p-2.5 rounded-full text-white bg-gradient-to-br from-purple-300 to-purple-500 group-hover:scale-110 transition-all" />
          <p className="text-sm group-hover:text-purple-600 transition-all">
            Upload Existing
          </p>
        </button>
      </div>

      <hr className="border-slate-300 my-6 sm:w-[305px]" />

      {/* Resume Cards */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length]

          return (
            <button
              type="button"
              key={resume.id}
              className="group relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border hover:shadow-lg transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: `${baseColor}40`,
              }}
            >
              <FilePenLineIcon
                className="size-7 group-hover:scale-105 transition-all"
                style={{ color: baseColor }}
              />

              <p
                className="text-sm group-hover:scale-105 transition-all"
                style={{ color: baseColor }}
              >
                {resume.title}
              </p>

              <p
                className="absolute bottom-1 text-[11px] px-2 text-center"
                style={{ color: `${baseColor}90` }}
              >
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                <TrashIcon className="size-7 p-1.5 rounded text-slate-700 hover:bg-white/50 transition-colors" />
                <PencilIcon className="size-7 p-1.5 rounded text-slate-700 hover:bg-white/50 transition-colors" />
              </div>
            </button>
          )
        })}
      </div>

      {/* Create Resume Modal */}
      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={() => setShowCreateResume(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] max-w-md bg-slate-50 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Resume Title"
              className="w-full px-4 py-2 mb-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Create Resume
            </button>

            <XIcon
              onClick={() => setShowCreateResume(false)}
              className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600"
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default Dashboard
