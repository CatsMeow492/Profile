import React from 'react';
import Header from '../components/Header/Header';
import SocialMediaButtons from '../components/SocialMediaButtons/SocialMediaButtons';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <SocialMediaButtons />
      {/* Rest of the content goes here */}
    </div>
  );
};

export default Home;
