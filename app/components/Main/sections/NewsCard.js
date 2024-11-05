import React from 'react';
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const NewsCard = ({ image, date, title, description, category }) => {
  return (
    <article className="group bg-gradient-to-br from-white/90 to-rose-50/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-rose-100">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-rose-900/90 text-white text-xs px-3 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 text-rose-700 mb-3">
          <CalendarIcon className="h-4 w-4" />
          <time className="text-sm">{date}</time>
        </div>
        
        <h4 className="text-xl font-medium mb-3 text-rose-900 group-hover:text-rose-700 transition-colors">
          {title}
        </h4>
        
        <p className="text-rose-700/80 text-sm mb-4">
          {description}
        </p>
        
        <button className="inline-flex items-center text-sm font-medium text-rose-900 group-hover:text-rose-700">
          자세히 보기
          <ChevronDownIcon className="h-4 w-4 ml-1 rotate-[-90deg]" />
        </button>
      </div>
    </article>
  );
};

export default NewsCard; 