import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import HeroSection from './HeroSection';
import FeaturedBikes from './FeaturedBikes';
import VideoSection from './VideoSection';
import FeaturedCollections from './FeaturedCollections';

const HomePage = () => {
  return (
    <div className="bg-white">
      <NavBar />
      <HeroSection />
      <FeaturedBikes />
      <VideoSection />
      <FeaturedCollections />
      <Footer/>
    </div>
  );
};

export default HomePage;
