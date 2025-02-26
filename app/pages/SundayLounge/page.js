'use client'

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SundayLounge from '../../components/SundayLounge';

const SundayLoungePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <Header />
      <SundayLounge />
      <Footer />
    </div>
  );
};

export default SundayLoungePage; 