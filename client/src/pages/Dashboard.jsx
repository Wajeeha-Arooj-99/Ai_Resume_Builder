import React from 'react'

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
    <div className= 'max-w-7X1 max-auto px-4 py-8'>
      <p className='text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Joe Doe</p>
    </div>
  )
} 

export default Dashboard
