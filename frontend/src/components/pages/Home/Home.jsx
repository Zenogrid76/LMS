import React from "react";
import Header from "../../common/Header/Header"
import PopularCoursesSection from "./PopularCoursesSection";
import BestTeachersSection from "./BestTeachersSection";
import HeroBanner from "./HeroBanner";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";


function Home() {
  return ( 
    <div className="bg-[#F8F9FB] min-h-screen flex flex-col w-full flex-2 font-lexend">
      <HeroBanner />
      <PopularCoursesSection />
      <BestTeachersSection />
      <div className="max-w-[1280px] flex justify-center flex-row items-left py-10 ml-auto mr-auto">
      <TestimonialsSection />
      <FAQSection />
    </div>
    </div>

  );
}
export default Home;
