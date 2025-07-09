"use client"

import BrandedProducts from '../../components/BrandedProducts/BrandedProducts'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function BrandedProductsContent() {
  const searchParams = useSearchParams()
  const section = (searchParams.get('section') as 'top' | 'category') || 'top'
  return <BrandedProducts initialSection={section} />
} 