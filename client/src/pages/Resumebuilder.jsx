import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react'

const Resumebuilder = () => {

  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    Professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic", // Fix 1: Yahan comma lagayi
    accent_color: "#3B82F6",
    public: false,
  })

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  // Fix 2: 'section' ko 'sections' badal diya (Kyuki array ka naam sections hai)
  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistingResume()
  }, [])

  return (
    <div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4' /> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - From */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            {/* Fix 3: Yahan 'relative' class add ki taaki progress bar iske andar rahe */}
            <div className='relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* Progress bar uding activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              {/* Fix 4: Isme bhi 'section' ko 'sections' badal diya */}
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-violet-600 border-none transition-all duration-2000' style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div></div>

        </div>

      </div>

    </div>
  )
}
export default Resumebuilder