import React, { useEffect } from 'react';
import LandingFeature from './landingFeatures';
import HeroSection from './heroSection';
import CTASection from './ctaSection';
import TripleColFeatures from './tripleColFeatures';
import Testimonial from './testimonial';
import Benefits from '../../../LandingUI/components/benefits';
import { benefitOne, benefitTwo } from '../../../LandingUI/components/data';
import SectionTitle from '../../../LandingUI/components/sectionTitle';
import Tabs from '../../../LandingUI/components/tabs';
import Video from '../../../LandingUI/components/video';
import Testimonials from '../../../LandingUI/components/testimonials';
import Faq from '../../../LandingUI/components/faq';
import Cta from '../../../LandingUI/components/cta';
import Link from 'next/link';
import SkeletonDashboardIntro from '../../../LandingUI/components/skeletonDashboardIntro';
import Partnership from './partners';
import Footer from 'LandingUI/components/footer';
import { Feature } from './features';

export default function Index() {
  return (
    <React.Fragment>
      <div className="bg-black py-8" style={{ backgroundImage: `url("/looper-bg.svg")` }}>
        <HeroSection />
        {/* <TripleColFeatures /> */}
      </div>
      <div className="bg-white pt-1">
        {/* <SectionTitle pretitle="Aivinya Overview">
          Discover all the ways the Aivinya can help streamline your College Life.
  </SectionTitle> 
        <Tabs />*/}
        <Feature />
      </div>
      {/* <div className="bg-black mx-2 rounded-3xl">
      <SectionTitle pretitle="Powered By"></SectionTitle>
       <Partnership />
      </div> */}
      <SectionTitle pretitle="Aivinya Vision">
        Our mission is <span className="text-ot-blue">AI For Everyone</span>, accessible by each
        student.
      </SectionTitle>
      <div className="bg-black mx-2 rounded-3xl">
        <Benefits imgPos="left" data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
      </div>
      <div className="bg-blend-lighten md:bg-blend-darken">
        <SectionTitle
          pretitle="Building"
          title="The Only Platform you ever need in your College"
        ></SectionTitle>
        <SkeletonDashboardIntro />
      </div>
      <div className="bg-black">
        <Faq />
        <div className=" bg-cover " style={{ backgroundImage: `url("/looper-bg.svg")` }}>
          <Cta />
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
