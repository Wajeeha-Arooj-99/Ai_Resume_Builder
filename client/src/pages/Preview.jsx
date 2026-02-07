import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom' // ✅ Link import kiya
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview' // ✅ {} hataye - default export hai
import { ArrowLeftIcon, Loader } from 'lucide-react'

const Preview = () => {

  const { resumeId } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    const foundResume = dummyResumeData.find(resume => resume._id === resumeId) // ✅ || null hata diya
    setResumeData(foundResume || null)
    setIsLoading(false)
  }

  useEffect(() => {
    loadResume()
  }, [resumeId]) // ✅ dependency array me resumeId add kiya

  return resumeData ? (
    <div className='bg-slate-100 min-h-screen'> {/* ✅ min-h-screen add kiya */}
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes='py-4 bg-white' // ✅ className ko classes me change kiya (check your ResumePreview props)
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <div className='flex items-center justify-center h-screen'> {/* ✅ Loader ke liye container */}
          <Loader className='animate-spin size-12 text-violet-600' /> {/* ✅ Animation add kiya */}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium'>Resume not Found</p>
          <Link to='/' className='mt-6 bg-violet-500 hover:bg-violet-600 text-white rounded-full px-6 py-2 ring-offset-1 ring-1 ring-violet-400 flex items-center transition-colors'> 
            <ArrowLeftIcon className='mr-2 size-4' />
            Go to HomePage
          </Link>
        </div>
      )}
    </div>
  )
}

export default Preview