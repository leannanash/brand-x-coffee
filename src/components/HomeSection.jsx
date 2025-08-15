import React from 'react';

export default function HomeSection() {
  return (
    <section
      id="home-section"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '80px 0',
        position: 'relative',
      }}
    >
      {/* Overlay for better text contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        }}
      />

      <div className="container text-center position-relative" style={{ zIndex: 2 }}>
        {/* Small Banner Row */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '30px',
            marginBottom: '20px',
            fontSize: '0.95rem',
            color: '#fff',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          ⏰ <strong>1pm - 9pm</strong> &nbsp; | &nbsp; 📞{' '}
          <a
            href="tel:09393039528"
            style={{
              color: '#ffd27f',
              fontWeight: '700',
              textDecoration: 'none',
            }}
          >
            09393039528
          </a>
        </div>

        {/* Hero Section */}
        <h5
          className="text-uppercase"
          style={{
            color: '#ffddaa',
            letterSpacing: '2px',
            textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
            marginBottom: '10px',
          }}
        >
          NEW ARRIVALS
        </h5>
        <h3
          className="fw-bold"
          style={{
            color: '#fff',
            fontSize: '2.2rem',
            textShadow: '2px 2px 5px rgba(0,0,0,0.8)',
            marginBottom: '15px',
          }}
        >
          Best Prices For This Season
        </h3>
        <p
          style={{
            color: '#eee',
            maxWidth: '600px',
            margin: '0 auto 25px',
            textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
            lineHeight: '1.6',
          }}
        >
          Brand X Coffee offers the best coffee blends and meals for affordable prices
        </p>
        <button
          className="btn btn-primary px-4 py-2"
          style={{
            borderRadius: '25px',
            fontWeight: '600',
            fontSize: '1rem',
          }}
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}
