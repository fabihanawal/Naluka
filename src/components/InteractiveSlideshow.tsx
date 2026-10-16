import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Trees, Monitor, Award, BookOpen } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  badge: string;
  tagline: string;
  linkHref: string;
  linkText: string;
}

interface InteractiveSlideshowProps {
  headmasterPhotoUrl?: string;
}

export const InteractiveSlideshow: React.FC<InteractiveSlideshowProps> = ({ headmasterPhotoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: Slide[] = [
    {
      id: 's-1',
      badge: 'সবুজ ক্যাম্পাস ও খেলার মাঠ',
      title: 'প্রকৃতির স্নিগ্ধ ছায়ায় ১.২০ একরের উন্মুক্ত আনন্দময় প্রাঙ্গণ',
      subtitle: 'নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয় · মথুরাপুর, বদলগাছী, নওগাঁ',
      description: 'ধূলিমুক্ত নির্মল বাতাস ও সুবিশাল সবুজ ঘাসের মাঠে প্রতিদিন শিশুদের ছুটোছুটি, খেলাধুলা ও সুস্থ স্বাভাবিক বিকাশ।',
      imageUrl: '/src/assets/images/school_campus_hero_1792171248217.jpg',
      tagline: 'শতভাগ পরিবেশবান্ধব গ্রামীণ পাঠশালা',
      linkHref: '#activities',
      linkText: 'কার্যক্রম দেখুন'
    },
    {
      id: 's-2',
      badge: 'স্মার্ট ডিজিটাল শিক্ষাব্যবস্থা',
      title: 'মাল্টিমিডিয়া প্রজেক্টরে আনন্দদায়ক অডিও-ভিজ্যুয়াল পাঠদান',
      subtitle: 'আধুনিক তথ্যপ্রযুক্তির আলোয় আলোকিত প্রতিটি শিক্ষার্থী',
      description: 'বিজ্ঞান, গণিত ও ভাষার জটিল বিষয়সমূহ আকর্ষণীয় অ্যানিমেশন ও ডিজিটাল কন্টেন্টের মাধ্যমে সহজবোধ্যভাবে উপস্থাপন করা হয়।',
      imageUrl: '/src/assets/images/digital_classroom_kids_1792171250216.jpg',
      tagline: 'স্মার্ট বাংলাদেশ ও আগামী প্রজন্মের প্রস্তুতি',
      linkHref: '#notices',
      linkText: 'ভর্তি তথ্য জানুন'
    },
    {
      id: 's-3',
      badge: 'সুশৃঙ্খল সমাবেশ ও স্বাস্থ্যচর্চা',
      title: 'প্রাত্যহিক সমাবেশ, জাতীয় সংগীত ও বিশেষ পিটি ড্রিল',
      subtitle: 'সুস্থ দেহে সুন্দর মন · দেশপ্রেম ও শৃঙ্খলার প্রথম পাঠ',
      description: 'প্রতিদিন সকালের সমাবেশে জাতীয় পতাকার প্রতি সম্মান প্রদর্শন, শপথ পাঠ ও শরীরচর্চার মাধ্যমে শিশুদের শারীরিক সক্ষমতা বৃদ্ধি পায়।',
      imageUrl: '/src/assets/images/student_assembly_exercise_1792171249970.jpg',
      tagline: 'নিয়মনিষ্ঠা ও নেতৃত্বের হাতেখড়ি',
      linkHref: '#activities',
      linkText: 'সহশিক্ষা দেখুন'
    },
    {
      id: 's-4',
      badge: 'সৃজনশীল প্রকাশ ও সাহিত্য',
      title: 'শিক্ষার্থীদের স্বহস্তে তৈরি ঐতিহ্যবাহী দেয়ালিকা "আনন্দধারা"',
      subtitle: 'রঙ-তুলি আর শব্দের ছন্দে শিশুদের হৃদয়ের ভাবনা',
      description: 'শিশুদের স্বরচিত ছড়া, কবিতা, ছোটগল্প ও চিত্রকর্ম দিয়ে প্রকাশিত ত্রৈমাসিক দেয়ালিকা আমাদের ঐতিহ্য ও গর্বের প্রতীক।',
      imageUrl: '/src/assets/images/creative_wall_magazine_1792171250145.jpg',
      tagline: 'মেধা ও সুকুমার বৃত্তির বিকাশ',
      linkHref: '#creatives',
      linkText: 'দেয়ালিকা পড়ুন'
    },
    {
      id: 's-5',
      badge: 'দক্ষ ও স্নেহময় শিক্ষক পরিষদ',
      title: 'প্রধান শিক্ষক মোঃ রশিদুল ইসলামের নেতৃত্বে নিবেদিত শিক্ষকমণ্ডলী',
      subtitle: 'প্রতিটি শিক্ষার্থীর নিবিড় তত্ত্বাবধান ও শতভাগ মূল্যায়ন সাফল্য',
      description: 'শহুরে কৃত্রিম মানসিক চাপহীন পরম মমতাময়ী পরিবেশে প্রাথমিক শিক্ষার ভিত্তি সুদৃঢ় করতে আমাদের শিক্ষকগণ সদা নিয়োজিত।',
      imageUrl: headmasterPhotoUrl || '/src/assets/images/headmaster_desk_1792171248835.jpg',
      tagline: 'অভিভাবকদের আস্থার বাতিঘর',
      linkHref: '#teachers',
      linkText: 'শিক্ষকমণ্ডলী পরিচিতি'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const currentSlide = slides[currentIndex];

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-emerald-900/15 bg-slate-900 text-white my-6 group"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slide Visual Image with Transition */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 pointer-events-none scale-105'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-7000 ease-out transform"
              referrerPolicy="no-referrer"
            />
            {/* Contrast Gradient Scrim for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-black/50 to-black/20" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 max-w-4xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>{currentSlide.badge}</span>
            </span>
            <span className="hidden sm:inline-block text-xs text-emerald-300 font-medium bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs">
              {currentSlide.tagline}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug drop-shadow-sm text-balance">
            {currentSlide.title}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-200 font-medium mt-1">
            {currentSlide.subtitle}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-base text-slate-200 mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl drop-shadow-xs">
            {currentSlide.description}
          </p>

          {/* Action Link & Auto-play status */}
          <div className="mt-4 flex items-center gap-4">
            <a
              href={currentSlide.linkHref}
              className="px-4 py-2 bg-white text-emerald-950 hover:bg-emerald-100 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <span>{currentSlide.linkText}</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-2 bg-black/40 hover:bg-black/60 text-white rounded-xl text-xs flex items-center gap-1.5 backdrop-blur-md transition-colors"
              title={isPlaying ? 'স্লাইডশো বিরতি দিন' : 'স্লাইডশো চালু করুন'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlaying ? 'বিরতি' : 'চালু'}</span>
            </button>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-emerald-900/80 text-white backdrop-blur-md transition-all shadow-md focus:outline-none"
          aria-label="পূর্ববর্তী স্লাইড"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-emerald-900/80 text-white backdrop-blur-md transition-all shadow-md focus:outline-none"
          aria-label="পরবর্তী স্লাইড"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-4 right-6 sm:right-10 z-30 flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`স্লাইড ${idx + 1}`}
            />
          ))}
          <span className="text-[11px] font-mono text-emerald-200 ml-1.5">
            {currentIndex + 1}/{slides.length}
          </span>
        </div>
      </div>
    </div>
  );
};
