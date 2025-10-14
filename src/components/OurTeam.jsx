import React from 'react'
import { assets } from '../assets/assets'


const teamMembers = [
    { id: 1, img: assets.profile1 },
    { id: 2, img: assets.profile2 },
    { id: 3, img: assets.profile3 },
    { id: 4, img: assets.profile4 },
    { id: 5, img: assets.profile5 },
  ];
  
  const MAX_VISIBLE = 3;
const OurTeam = () => {
    return (
        <div className="team-members">
            <a href="">
                <div className="our-team-members">
                    {teamMembers.slice(0, MAX_VISIBLE).map((member) => (
                    <div className="team-mem" key={member.id}>
                    <img src={member.img} alt={`Member ${member.id}`} />
                    </div>
                ))}
                
                {teamMembers.length > MAX_VISIBLE && (
                    <div className="team-mem extra-members">
                    <span>+{teamMembers.length - MAX_VISIBLE}</span>
                    </div>
                )}
                </div>
            </a>
        </div>
      );
    };

export default OurTeam
