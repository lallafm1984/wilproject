import React from 'react';
import Image from 'next/image';

const BannerSection = ({ id, isVisible, imageUrl, title, description, reverse = false }) => {
  return (
    <section 
      id={id}
      className={`w-full py-20 ${reverse ? 'bg-white' : 'bg-brand-light'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          <div className={`
            w-full md:w-1/2
            transition-all duration-1000 ease-out delay-300
            ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${reverse ? 'translate-x-[50%]' : '-translate-x-[50%]'}`}
          `}>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="100vw"
                placeholder="blur"
              />
            </div>
          </div>
          
          <div className={`
            w-full md:w-1/2 text-center md:text-left
            transition-all duration-1000 ease-out delay-500
            ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${reverse ? '-translate-x-[50%]' : 'translate-x-[50%]'}`}
          `}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6">
              {title}
            </h2>
            <p className="text-xl text-brand-secondary mb-8 leading-relaxed">
              {description}
            </p>
            <button className="bg-brand-primary text-white px-8 py-3 rounded-full hover:bg-brand-secondary transition-colors">
              자세히 알아보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection; 