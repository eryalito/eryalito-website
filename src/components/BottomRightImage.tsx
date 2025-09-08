import React from 'react';
import catImage from '/images/cat_sleeping.gif';

const IterativeCat: React.FC = () => {
  const style: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '100px', // Adjust size as needed
    zIndex: 1000, // Ensure it's on top of other content
  };

  return (
    <img src={catImage} alt="Cat sleeping" style={style} />
  );
};

export default IterativeCat;
