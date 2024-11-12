import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { products } from '../../../data/products';

const CollectionSection = () => {
  const [productSlide, setProductSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProductSlide((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-tertiary/50 via-white/50 to-brand-light/50" />
      
      <div className="relative container mx-auto px-4">
        <h3 className="text-3xl md:text-4xl font-serif text-center mb-12 text-brand-primary">Best Sellers</h3>
        
        <div className="relative h-[500px] md:h-[400px]">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-all duration-1000 ${
                productSlide === index 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div className="relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h4 className="text-2xl font-serif text-brand-primary mb-3">{product.name}</h4>
                  <p className="text-lg text-brand-secondary mb-4">{product.description}</p>
                  <p className="text-xl font-semibold text-brand-primary mb-6">{product.price}</p>
                  <button className="bg-brand-primary text-white px-6 py-2 rounded-full hover:bg-brand-secondary transition-colors">
                    자세히 보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          {/* Add your pagination or navigation components here */}
        </div>
      </div>
    </section>
  );
};

export default CollectionSection; 