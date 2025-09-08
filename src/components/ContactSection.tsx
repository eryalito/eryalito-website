import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const EMAIL = 'eryalito@gmail.com';

const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  return (
    <section id="contact" className="section">
      <div className="mx-auto px-4 py-10">
        <h1 className="mb-8 font-bold text-3xl tracking-wide text-center text-primary">Contact</h1>

        <div className="relative mx-auto max-w-3xl mt-24">
          <img
            src={import.meta.env.BASE_URL + 'images/cat_sleeping.gif'}
            alt="Eryalito Logo"
            className="absolute top-0 right-0 w-12 h-8 sm:w-16 sm:h-8 -translate-y-full object-contain"
          />
          {/* Retro terminal-style panel */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 backdrop-blur overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-950">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-auto text-xs text-zinc-400 font-mono">bash</span>
            </div>
            <div className="px-4 py-5 font-mono text-sm leading-relaxed text-zinc-200">
              <div className="text-zinc-400">$ whoami</div>
              <div className="mb-4">eryalito</div>

              <div className="text-zinc-400">$ /bin/bash ~/show_contact.sh</div>
              <div className="mb-2">Email: <span className="text-white">{EMAIL}</span></div>
              <div className="mb-2">LinkedIn: <a href="https://www.linkedin.com/in/adrian-cameselle/" target="_blank" rel="noopener noreferrer" className="text-white underline">adrian-cameselle</a></div>
              <div className="mb-4">GitHub: <a href="https://github.com/eryalito" target="_blank" rel="noopener noreferrer" className="text-white underline">eryalito</a></div>

              <div className="text-zinc-400">$ _</div>
            </div>
          </div>
        </div>

        {/* Email action row */}
        <div className="mx-auto max-w-3xl mt-6 rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            <code className="font-pixel text-sm sm:text-base text-zinc-100">{EMAIL}</code>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyEmail}
              className="btn flex items-center gap-2 hover:bg-zinc-800 transition-colors"
              aria-label="Copy email"
            >
              <FontAwesomeIcon icon={faClipboard} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <a
              href={`mailto:${EMAIL}`}
              className="btn primary flex items-center gap-2"
              aria-label="Open email app"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Send email
            </a>
          </div>
        </div>

        {/* Social buttons */}
        <div className="mx-auto max-w-3xl mt-6 flex justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/adrian-cameselle/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="h-12 w-12 grid place-items-center rounded-full border border-zinc-700 bg-zinc-900/60 text-white hover:border-yellow-300 hover:scale-105 transition-transform"
            title="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-white" />
          </a>
          <a
            href="https://github.com/eryalito"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="h-12 w-12 grid place-items-center rounded-full border border-zinc-700 bg-zinc-900/60 text-white hover:border-yellow-300 hover:scale-105 transition-transform"
            title="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl text-white" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
