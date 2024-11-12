import React from 'react';
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { newsItems } from '../../../data/news';
import NewsCard from './NewsCard';

const NewsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}/>
      </div>
      
      <div className="relative bg-gradient-to-b from-brand-light/50 via-white/50 to-brand-light/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-serif mb-4 text-brand-primary">Latest News</h3>
            <p className="text-brand-secondary">W.I.L의 최신 소식을 만나보세요</p>
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 