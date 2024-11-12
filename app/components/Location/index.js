'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaSubway, FaBus, FaCar, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Script from 'next/script';

const Location = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      if (window.kakao && !map) {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.476065205134795, 126.88628511060199),
          level: 3
        };

        const newMap = new window.kakao.maps.Map(container, options);
        
        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(37.476065205134795, 126.88628511060199);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(newMap);

        // 인포윈도우 생성
        
 
 

        setMap(newMap);
      }
    };

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=b17a7dbb6f34a703cfdfce78a318870a&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(initializeMap);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [map]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light pt-[100px]">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
              오시는 길
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-brand-secondary">
              W.I.L 본사를 방문하시는 방법을 안내해드립니다
            </p>
          </motion.div>
        </div>

        <div className="max-w-screen-xl mx-auto">
          {/* 지도 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-12"
          >
            <div id="map" className="w-full h-[400px]"></div>
          </motion.div>

          {/* 주소 및 연락처 정보 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {/* 주소 정보 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-brand-primary mb-6 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                주소
              </h2>
              <p className="text-brand-dark mb-4">
                서울특별시 금천구 벚꽃로 234, <br />
                에이스하이엔드 6차 17층 1703호
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-brand-dark">
                  <FaPhone className="mr-2 text-brand-secondary" />
                  <span>070-4821-4721</span>
                </div>
                <div className="flex items-center text-brand-dark">
                  <MdEmail className="mr-2 text-brand-secondary" />
                  <span>contact@wil.co.kr</span>
                </div>
              </div>
            </div>

            {/* 교통편 안내 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-brand-primary mb-6">교통편 안내</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaSubway className="text-brand-secondary mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold mb-1 text-brand-primary">지하철</h3>
                    <p className="text-brand-dark">1호선 가산디지털단지역 3번 출구에서 도보 10분</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaBus className="text-brand-secondary mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold mb-1 text-brand-primary">버스</h3>
                    <p className="text-brand-dark">
                      간선버스: 571, 652 <br />
                      지선버스: 5536, 5714 <br />
                      에이스하이엔드 6차 정류장 하차
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaCar className="text-brand-secondary mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold mb-1 text-brand-primary">자가용</h3>
                    <p className="text-brand-dark">건물 내 지하주차장 이용 가능</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Location;
