import React from 'react'
import { useNavigate } from 'react-router-dom'

const CallToAction = () => {
    const navigate = useNavigate()

    const handleGetStarted = () => {
        navigate('/login?state=register')
    }

    return (
        <div id='cta' className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-16 mt-28">
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-20 -mt-10 -mb-10 w-full">
                <p className="text-xl font-medium max-w-sm">Ready to build a resume recruiters notice?</p>
                <button onClick={handleGetStarted} className="flex items-center gap-2 rounded-md py-3 px-5 hover:opacity-90 transition text-white" style={{ backgroundColor: '#8615ab' }} title="Amethyst"> 
                    <span>Get Started Free</span>
                </button>
            </div>
        </div>
    );
}

export default CallToAction