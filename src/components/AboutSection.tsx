import React, { useMemo } from 'react';

const postits = [
  "Hey, welcome! I'm Eryalito, but you can call me Ery.",
  "I'm just another tech guy. Nothing fancy, just here to share my projects and ideas.",
  "I could bore you with a CV and studies, but that's for LinkedIn.",
  "Let's keep it short: I love what I do, and I do what I love.",
  "What do I do you might ask? Well... Some people say I'm a developer, other say I'm a gamer...",
  "But what I really am is a cat lover."
];

const AboutSection: React.FC = () => {
  // Generate random rotation for each post-it on each reload
  const rotations = useMemo(() =>
    postits.map(() => (Math.random() * 6 - 3).toFixed(2)), // -3deg to +3deg
  []);

  return (
    <section id="about" className="section">
      <div className="mx-auto px-4 py-10">
        <h1 className="mb-8 font-bold text-3xl tracking-wide text-center text-primary">About Me</h1>
        <div className="flex flex-col items-center gap-4 relative">
          {postits.map((text, i) => (
            <React.Fragment key={i}>
              <div
                className="bg-yellow-100 shadow-lg rounded-md px-6 py-4 mb-2 font-pixel text-zinc-800 w-full max-w-2xl relative"
                style={{ transform: `rotate(${rotations[i]}deg)` }}
              >
                {text}
              </div>
              {i < postits.length - 1 && (
                // Pixel-art style arrow SVG
                <svg className="w-8 h-8 text-yellow-300 -my-2" viewBox="0 0 24 24" fill="currentColor">
                  {/* Pixel arrow: vertical line with blocky arrowhead */}
                  <rect x="11" y="2" width="2" height="14" />
                  <rect x="8" y="16" width="8" height="2" />
                  <rect x="9" y="18" width="6" height="2" />
                  <rect x="10" y="20" width="4" height="2" />
                  <rect x="11" y="22" width="2" height="2" />
                  <rect x="10" y="21" width="4" height="1" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
