import React, { useState, useEffect } from 'react';

export default function ScrollableBanner({ title, subtitle, backgroundImage }) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `center ${offsetY * 0.5}px`,
    height: '600px',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  };

  const contentStyle = {
    position: 'absolute',
    top: '50%', // midway vertical position
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    padding: '0 20px',
    width: '100%',
    maxWidth: '900px',
    userSelect: 'none',
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '400',
    textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
  };

  return (
    <section style={sectionStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
    </section>
  );
}
