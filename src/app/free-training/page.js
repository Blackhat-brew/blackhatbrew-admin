"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
 
const Page = () => {

  useEffect(() => {
    window.location.href = 'https://outlook.office.com/bookwithme/user/ad41c98249fc4d659f752e032ad396b1@siu.edu/meetingtype/pSl6n57Tf0eBVwF2QCV6Fg2?anonymous&ep=mlink';
  }, []);

  return <div>Redirecting...</div>;
};

export default Page;
