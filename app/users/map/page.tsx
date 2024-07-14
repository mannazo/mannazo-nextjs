'use client'

import dynamic from 'next/dynamic';

const MapContent = dynamic(() => import('@/components/users/map/MapContent'), { ssr: false });

export default function Profile() {

  return (
    <>
      <MapContent />
    </>
  )
}
