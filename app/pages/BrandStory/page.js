'use client'

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BrandStory from '../../components/BrandStory';

const BrandStoryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <Header />
      <BrandStory />
      <Footer />
    </div>
  );
};

export default BrandStoryPage; 