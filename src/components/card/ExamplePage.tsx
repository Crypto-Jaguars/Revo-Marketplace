'use client';

import { Leaf, Award } from 'lucide-react';
import ProducerCard from './ProducerCard';

export default function ExamplePage() {
  const producers = [
    {
      photo:
        'https://c8.alamy.com/comp/HC69HB/portrait-of-happy-farmer-holding-a-basket-of-vegetables-HC69HB.jpg',
      marketName: 'Green Valley Market',
      farmerName: 'John Doe',
      location: 'Lagos, Nigeria',
      distance: '5km',
      rating: 4.5,
      reviews: 120,
      products: ['Tomatoes', 'Cabbages', 'Carrots'],
      certifications: [
        { name: 'Organic', icon: <Leaf size={14} /> },
        { name: 'Certified', icon: <Award size={14} /> },
      ],
    },
    {
      photo:
        'https://static.vecteezy.com/system/resources/thumbnails/030/751/190/small/portrait-farmer-with-vegetables-ai-generative-photo.jpg',
      marketName: 'Sunrise Farmers Market',
      farmerName: 'Mary Jane',
      location: 'Abuja, Nigeria',
      distance: '12km',
      rating: 4.8,
      reviews: 200,
      products: ['Peppers', 'Spinach', 'Okra'],
      certifications: [{ name: 'Organic', icon: <Leaf size={14} /> }],
    },
    {
      photo:
        'https://st3.depositphotos.com/35240720/36803/i/450/depositphotos_368031110-stock-photo-african-farmer-man-talk-smartphone.jpg',
      marketName: 'Harvest Hub',
      farmerName: 'Emeka Obi',
      location: 'Kano, Nigeria',
      distance: '20km',
      rating: 4.2,
      reviews: 80,
      products: ['Yam', 'Cassava', 'Maize'],
      certifications: [{ name: 'Certified', icon: <Award size={14} /> }],
    },
    {
      photo:
        'https://plus.unsplash.com/premium_photo-1661429307492-6d0331c1696a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGFwcHklMjBmYXJtZXJ8ZW58MHx8MHx8fDA%3D',
      marketName: 'Fresh Roots Cooperative',
      farmerName: 'Aisha Bello',
      location: 'Port Harcourt, Nigeria',
      distance: '15km',
      rating: 4.6,
      reviews: 95,
      products: ['Plantain', 'Pineapple', 'Banana'],
      certifications: [
        { name: 'Organic', icon: <Leaf size={14} /> },
        { name: 'Certified', icon: <Award size={14} /> },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-5xl mx-auto">
      {producers.map((producer, index) => (
        <ProducerCard
          key={index}
          producer={producer}
          onContact={() => alert(`Contact ${producer.farmerName}`)}
          onViewDetails={() => alert(`View Details of ${producer.marketName}`)}
        />
      ))}
    </div>
  );
}
