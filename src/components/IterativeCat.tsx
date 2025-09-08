
import React, { useState, useEffect, useRef } from 'react';
import catImage from '/images/standing.png';
import pointerImage from '/images/pointer.gif';

const IterativeCat: React.FC = () => {
  const catStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '0px',
    right: '20px',
    width: '100px',
    zIndex: 1000,
  };
  const pointerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '128px',
    right: '66px',
    width: '44px',
    zIndex: 1000,
  };

  const [showPointer, setShowPointer] = useState(false);
  const [bannerText, setBannerText] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const timerRef = useRef<number | null>(null);
  const bannerTimerRef = useRef<number | null>(null);

  const positiveTexts = [
    "Meow!",
    "Prrrr",
    "😻",
    "😽"
  ];
  const negativeTexts = [
    "Hiss",
    "💢",
    "Grrr",
    "💢💢💢",
    "😾"
  ];

  const startPointerTimer = () => {
    const randomDelay = Math.floor(Math.random() * 10000) + 5000; // 5000-15000 ms
    timerRef.current = window.setTimeout(() => {
      setShowPointer(true);
    }, randomDelay);
  };

  useEffect(() => {
    startPointerTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, []);

  const handleCatClick = () => {
    // Pick text from the correct list
    const textList = showPointer ? positiveTexts : negativeTexts;
    const randomText = textList[Math.floor(Math.random() * textList.length)];
    setBannerText(randomText);
    setShowBanner(true);

    // Hide banner after 3 seconds
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    bannerTimerRef.current = window.setTimeout(() => {
      setShowBanner(false);
    }, 1500);

    // Always reset pointer timer
    setShowPointer(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    startPointerTimer();
  };

  return (
    <>
      {showPointer && (
        <img src={pointerImage} alt="Pointer" style={pointerStyle} />
      )}
      <img src={catImage} alt="Sitting cat image" style={catStyle} onClick={handleCatClick} />
      {showBanner && bannerText && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '140px',
            background: 'rgba(255,255,255,0.95)',
            color: '#333',
            padding: '8px 16px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1002,
            fontSize: '1rem',
            whiteSpace: 'nowrap',
          }}
        >
          {bannerText}
        </div>
      )}
    </>
  );
};

export default IterativeCat;
