
import React from 'react';

const skillNotes = [
  {
    text: "Programming? Yeah, I do that at work, sometimes as a hobby too. Maybe I should change my hobbies...",
    skills: ['Go', 'Python sometimes', "Language1", 'Language2', "??"],
  },
  {
    text: "Tools? If it automates, deploys, or breaks things at 2am, I've probably used it.",
    skills: ['Do you really need a list?'],
  },
  {
    text: "Platforms? Linux is a comfort zone, Kubernetes is a nightmare (but MY nightmare).",
    skills: ['Seriously, do you _really_ need a list?'],
  },
  {
    text: "Community-driven standards? I read the docs, sometimes I even write them.",
    skills: ['Okay, you got me, there\'s no list here. Go away.'],
  }
];

const SkillsSection: React.FC = () => {

  return (
    <section id="skills" className="section">
      <div className="mx-auto px-4 py-10">
        <h1 className="mb-8 font-bold text-3xl tracking-wide text-center text-primary">Skills</h1>
  <div className="flex flex-col items-center gap-0 relative">
          {skillNotes.map((note, i) => {
            // Staggered horizontal offset: alternate left/right, increase with index
            const alignClass = i % 2 === 0 ? 'self-start ml-0 mr-auto' : 'self-end mr-0 ml-auto';
            return (
              <React.Fragment key={i}>
                <div
                  className={`bg-yellow-100 shadow-lg rounded-md px-6 py-4 font-pixel text-zinc-800 w-full max-w-2xl relative transition-transform duration-500 ${alignClass}`}
                >
                  <div className="mb-2">{note.text}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {note.skills.map((skill, j) => (
                      <span key={j} className="bg-yellow-200 border border-yellow-300 rounded px-2 py-1 text-xs font-bold font-mono text-zinc-700 shadow">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {i < skillNotes.length - 1 && (
                  <svg
                    className="w-8 h-8 text-yellow-300 block mb-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{
                      transform: i % 2 === 0
                        ? 'rotate(-35deg) translateX(-30px)'
                        : 'rotate(35deg) translateX(30px)'
                    }}
                  >
                    {/* Pixel arrow: diagonal with blocky arrowhead */}
                    <rect x="11" y="2" width="2" height="14" />
                    <rect x="8" y="16" width="8" height="2" />
                    <rect x="9" y="18" width="6" height="2" />
                    <rect x="10" y="20" width="4" height="2" />
                    <rect x="11" y="22" width="2" height="2" />
                    <rect x="10" y="21" width="4" height="1" />
                  </svg>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
