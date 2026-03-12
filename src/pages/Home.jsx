import React from "react";
import HomeSection from "../components/HomeSection";
import StoreLocationPreview from "../components/StoreLocationPreview";
import StyledVideo from "../components/reusable/video/StyledVideo";

export default function Home() {
  return (
    <>
    
      <main className="home">
        <HomeSection />
         <div className="p-4" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h3 className="mb-4 text-center text-3xl font-serif text-amber-900 tracking-tight italic">
            Freshly Brewed, Just for You
          </h3>
          <StyledVideo
            src="https://res.cloudinary.com/dro6vrldb/video/upload/v1771507736/AQMZOnvRdqYfSaZtp4hiXMI1zfBIaPae5pvc3_k2e3jCuL48wOnmk_pf332ZTPYU_ONAwJv6_7-ux_X4wFi2-_qXbdyC8M0wydv6CwAL5zo5vw_fw03gl.mp4"
            width="100%"
            height="338px"
          />
        </div>
        <StoreLocationPreview/>
      </main>
    </>
  );
}
