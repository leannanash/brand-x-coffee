import React from 'react';

export default function BannerSection({ title, subtitle, buttonLabel, onButtonClick, backgroundImage }) {
  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    padding: '100px 20px',
    textAlign: 'center'
  };

  return (
    <section style={sectionStyle}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {buttonLabel && (
        <button onClick={onButtonClick}>
          {buttonLabel}
        </button>
      )}
    </section>
  );
}
