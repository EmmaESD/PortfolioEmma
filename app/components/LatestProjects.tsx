'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { projects } from '@/app/projets/data/projects';
import CardProject from './CardProject';
import Link from 'next/link';


interface LatestProjectsProps {
  limit?: number;
}

export default function LatestProjects({ limit = 6 }: LatestProjectsProps) {
  // Trier par date décroissante et limiter
  const latestProjects = [...projects]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);

  return (
    <section className="py-16 px-8">
      <div className="flex items-center justify-between mb-8">
        <h2>Mes derniers projets</h2>
        <Link 
          href="/projets" 
          className="text-accent hover:text-secondary transition-colors font-medium"
        >
          Voir tous les projets →
        </Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={latestProjects.length > 3}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="latest-projects-swiper"
      >
        {latestProjects.map((project) => (
          <SwiperSlide key={project.slug}>
            <Link href={`/projets/${project.slug}`}>
              <CardProject project={project} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}