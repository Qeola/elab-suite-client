"use client";

import React from "react";
import PageContainer from "@/app/components/container/PageContainer";

// components
import Banner from "@/app/components/landingpage/banner/Banner";

import LpHeader from "@/app/components/landingpage/header/Header";

export default function Landingpage() {
  return (
    <PageContainer
      title="eLab suite | Simplify your workflow and eliminate stress with our all-in-one solution.!"
      description=""
    >
      <LpHeader />
      <Banner />
      {/* <DemoSlider />
      <Frameworks />
      <Testimonial />
      <Features />
      <C2a />
      <C2a2 />
      <Footer />  */}
    </PageContainer>
  );
}

Landingpage.layout = "Blank";
