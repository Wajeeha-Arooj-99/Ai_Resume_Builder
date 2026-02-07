import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ResumePreview } from '../components/ResumePreview'
import { ArrowLeftIcon, Loader } from 'lucide-react'

const Preview = () => {

  const { resumeId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    // Fix 1: `find` logic ko sahi kiya
    const found = dummyResumeData.find(resume => resume._id === resumeId);
    setResumeData(found || null); // Agar nahi mila toh null set karo
    setIsLoading(false)
  }

  useEffect(() => {
    loadResume()
  }, [resumeId]) // Better practice: resumeId dependency daalna

  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} className='py-4 bg-white' />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        // Fix 3: Loader ko styling di taaki wo center mein dikhe
        <div className="flex flex-col items-center justify-center h-screen">
            <Loader className="animate-spin text-violet-500 w-12 h-12" />
            <p className="mt-2 text-slate-500">Loading Resume...</p>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-4xl text-slate-400 font-medium'>Resume not Found</p>
          
          {/* Fix 2: `px=6` ko `px-6` mein badla aur link `/` kiya */}
          <a href="/" className='mt-6 bg-violet-500 hover:bg-violet-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-violet-400 flex items-center transition-colors'>
            <ArrowLeftIcon className='mr-2 size-4' />
            Go to HomePage
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview