import React, { useState, useEffect } from 'react';

export default function ScrollableBanner({ title, subtitle, backgroundImage }) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(30,20,10,0.5), rgba(15,10,5,0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `center ${offsetY * 0.5}px`,
    height: '80vh',
    minHeight: '500px',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyle = {
    textAlign: 'center',
    padding: '0 20px',
    maxWidth: '900px',
    zIndex: 2,
    animation: 'fadeInUp 1s ease forwards',
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
    color: '#f5c06f', // coffee-inspired golden tone
  };

  const subtitleStyle = {
    fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
    fontWeight: '400',
    textShadow: '1px 1px 5px rgba(0,0,0,0.6)',
    color: '#ffe8c1', // lighter latte tone
  };

  return (
    <section style={sectionStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            section {
              height: 60vh;
            }
            h1 {
              font-size: clamp(1.5rem, 6vw, 2.5rem);
            }
            p {
              font-size: clamp(0.9rem, 4vw, 1.2rem);
            }
          }
        `}
      </style>
    </section>
  );
}
