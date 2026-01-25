export default function StoreLocationPreview() {
  return (
    <section className="location-preview position-relative">
      {/* Overlay to match HomeSection */}
      <div className="location-overlay" />

      <div className="container position-relative text-white" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-5">

          {/* Text */}
          <div className="col-md-5">
            <span className="location-eyebrow animate-fadeInDown">Visit Us</span>
            <h2 className="location-title animate-fadeInUp">Find Brand X Coffee</h2>

            <p className="location-address animate-fadeInUp">
              <i className="bi bi-geo-alt-fill me-2"></i>San Pablo City, Laguna
            </p>
            <p className="location-hours animate-fadeInUp">
              <i className="bi bi-clock-fill me-2"></i>Open daily: <strong>1 PM – 9 PM</strong>
            </p>

            <p className="location-desc animate-fadeInUp">
              Come by for handcrafted coffee, comfort food, and a cozy, welcoming vibe.
            </p>

            <a
              href="https://www.google.com/maps?q=14.0711191,121.3312571"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-3 animate-fadeInUp"
            >
              Get Directions
            </a>
          </div>

          {/* Map */}
          <div className="col-md-7">
            <div className="location-map-preview shadow-lg rounded animate-fadeInUp">
              <iframe
                title="Brand X Coffee Map"
                src="https://www.google.com/maps?q=14.0711191,121.3312571&z=17&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}