'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { heroSlides } from '../../../data/slides';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-96 relative overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.image}
            className="w-full h-full object-cover transform scale-110 transition-transform duration-[10000ms] ease-out"
            style={{
              transform: currentSlide === index ? 'scale(1)' : 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-900/10 via-rose-900/20 to-rose-900/30" />
          
          <div className="absolute inset-0 flex items-center justify-center text-white text-center">
            <div className={`space-y-6 transition-all duration-1000 ${
              currentSlide === index 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl drop-shadow">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection; 