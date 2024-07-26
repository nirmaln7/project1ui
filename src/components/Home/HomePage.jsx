import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iPhone-14-Pro-Max.webp";
import mac from "../../assets/mac.avif";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 Pro"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia inventore libero facere maxime consequatur eligendi?"
        link="/products/6699192eedb183b8f8b6c4a9"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia inventore libero facere maxime consequatur eligendi?"
        link="/products/6699192eedb183b8f8b6c4aa"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
