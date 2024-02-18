'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TravelType } from '@/types/type';
import Loader from '@/components/Home/Loader';

type MyResponse = {
  travel: TravelType;
};

async function travelDetail(name: string): Promise<MyResponse> {
  const response = await fetch(`http://localhost:3000/api/travel/${name}`, {
    cache: 'no-store',
  });

  return response.json();
}

export default function TravelPage({ params }: { params: { name: string } }) {
  const [travel, setTravel] = useState<TravelType | null>(null);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const result = await travelDetail(params.name);
        setTravel(result.travel);
      } catch (error) {
        console.error('Error fetching travel details:', error);
      }
    };

    fetchTravel();
  }, [params.name]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col mt-20 bg-white">
    <div className="bg-white w-full min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-blue-400 mt-10 mb-10 text-center">Travel Details</h1>
      {travel && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeIn' }}
          className="flex flex-col items-center"
        >
          <motion.img
            src={travel.image}
            alt={travel.name}
            className="w-100 h-auto rounded shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            style={{ objectFit: 'cover' }}
          />
          <div className="mt-8 text-center">
            <h1 className="text-3xl font-bold text-blue-400 mb-4">{travel.name}</h1>
            <h2 className="text-xl mb-4 font-bold text-blue-400 mb-4">Location: {travel.location}</h2>
            <div className="flex flex-col items-center justify-center font-bold border border-blue-400">
            <motion.div
              className="bg-gray-100 rounded-lg p-4"
              transition={{ duration: 0.2, ease: 'easeIn' }}
            >
              <p className="text-lg text-blue-400 mb-4">{travel.description}</p>
            </motion.div>
            </div>
          </div>
        </motion.div>
      )}
      {!travel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="text-lg font-bold text-gray-600">Loading...<Loader/></p>
        </motion.div>
      )}
    </div>
    </div>
  );
}
