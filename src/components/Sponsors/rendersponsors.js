import React from "react";
import {spons,titleSponsors,} from './spons';
import SponsorItem from "./SponsorItem";
import './index.css';


function RenderSponsors() {
//-------

const renderSponsors = (spons, num) => {

    
  return spons.map((data, index) => {
    const { name, src, imgName, title, link } = data;
    return (
      
      <div className="sss" key={index}>
        <SponsorItem
          alt={imgName}
          name={name}
          src={src}
          title={title}
          link={link}
        />
      </div>
    );
  });
};


//-----

  return (
    <div>
      <div className='bg-[#0E0E0E] text-[#F7CA17] pt-[100px] text-center flex'>
        <h1 className="sponsors-hero-title text-4xl font-[800] text-bolder mx-auto flex justify-start items-center text-center">PREVIOUS SPONSORS</h1>
      </div>
      
      <div className="row sponscont sm:p-4 md:px-12">
          <h2 className="current sponsors"> Title Sponsors </h2>

          {renderSponsors(titleSponsors, 1)}

          <h2 className="current sponsors"> Sponsors </h2>

          {renderSponsors(spons, 6)}
      </div>
    </div>
  );
}

export default RenderSponsors;

