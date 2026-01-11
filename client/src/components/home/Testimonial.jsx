import React from 'react'
import Title from './Title'
import { BookUser, BadgeCheck } from 'lucide-react'

const Testimonial = () => {

    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Avery Johnson',
            handle: '@averywrites',
        },
    ];

    const CreateCard = ({ card }) => (
<div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
  <div className="flex gap-2">
    <img className="size-11 rounded-full" src={card.image} alt={card.name} />

    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <p className="font-medium">{card.name}</p>
        <BadgeCheck className="w-3.5 h-3.5 text-violet-600 mt-0.5 shrink-0" />
      </div>

      <span className="text-xs text-slate-500">{card.handle}</span>
    </div>
  </div>

  <p className="text-sm py-4 text-gray-800">
    Radiant made undercutting all of our competitors an absolute breeze.
  </p>
</div>
    );

return (
    <div id="testimonials" className="flex flex-col items-center my-10 scroll-mt-12">

        <div className="flex items-center gap-2 text-sm text-violet-800 bg-violet-400/10 rounded-full px-4 py-1">
            <BookUser className="w-4 h-4 text-violet-600" />
            <span>Testimonials</span>
        </div>

        <Title
            title="Resumes That Get You Hired"
            description={
                <>
                    See how job seekers are landing more interviews and offers <br />
                    using our AI-powered, ATS-friendly resume builder trusted by professionals worldwide.
                </>
            }
        />

        <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="marquee-inner flex min-w-[200%] pt-10 pb-5">
                {[...cardsData, ...cardsData].map((card, index) => (
                    <CreateCard key={index} card={card} />
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>

        <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="marquee-inner marquee-reverse flex min-w-[200%] pt-10 pb-5">
                {[...cardsData, ...cardsData].map((card, index) => (
                    <CreateCard key={index} card={card} />
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>

        <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>
    </div>
);
};

export default Testimonial;
