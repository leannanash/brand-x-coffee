import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import AddToBasketModal from "../components/AddToBasketModal";
import ScrollableBanner from "../components/reusable/ScrollableBanner";
import { getProducts } from "../utils/products";

const splitFeatured = (items, featuredCount = 2) => ({
  featured: items.slice(0, featuredCount),
  others: items.slice(featuredCount),
});

export default function Shop() {
  const { addToBasket } = useOutletContext();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Optional: fetch hero image dynamically if you store in Cloudinary
  const [heroImage, setHeroImage] = useState("/assets/imgs/coffee-hero.jpg");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getProducts();
        setMenuItems(data || []);
        // Example: use first product image as hero
        if (data.length > 0) setHeroImage(data[0].image_url);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
      setSelectedItem(null);
    }, 200);
  };

  const handleAddFromModal = (item) => {
    addToBasket(item);
    closeModal();
  };

  const allCategories = [...new Set(menuItems.map((item) => item.category))];
  const categoriesToRender =
    activeCategory === "ALL" ? allCategories : [activeCategory];

  return (
    <section className="shop-page">
      {/* HERO BANNER */}
      <ScrollableBanner
        title="Discover Our Menu"
        subtitle="Freshly brewed, handcrafted drinks and treats just for you."
        backgroundImage={heroImage}
      />

      {/* CATEGORY SCROLLER */}
      <div className="category-bar py-3 mb-5">
        <div className="container text-center">
          <div className="d-inline-flex flex-wrap gap-3 justify-content-center">
            <button
              className={`btn btn-outline-warning ${
                activeCategory === "ALL" ? "active" : ""
              }`}
              onClick={() => setActiveCategory("ALL")}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-outline-warning ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="container" style={{ maxWidth: "1400px" }}>
        {categoriesToRender.map((cat) => {
          const items = menuItems.filter((item) => item.category === cat);
          if (!items.length && !loading) return null;

          const { featured, others } = splitFeatured(items, 2);

          return (
            <div key={cat} className="menu-section mb-5">
              <h2 className="section-title text-center mb-4 animate-fadeInUp">
                {cat}
              </h2>

              {/* FEATURED ITEMS */}
              <div className="row justify-content-center g-4 mb-4">
                {loading
                  ? Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                          <div className="skeleton-card" />
                        </div>
                      ))
                  : featured.map((item) => (
                      <div key={item.id} className="col-lg-4 col-md-6">
                        <MenuItem
                          {...item}
                          onOpenModal={() => openModal(item)}
                          featured
                        />
                      </div>
                    ))}
              </div>

              {/* OTHER ITEMS */}
              {!loading && others.length > 0 && (
                <>
                  <h5 className="text-center text-secondary mb-3 animate-fadeInUp">
                    More {cat}
                  </h5>
                  <div className="row g-4 justify-content-center">
                    {others.map((item) => (
                      <div
                        key={item.id}
                        className="col-lg-3 col-md-4 col-sm-6"
                      >
                        <MenuItem {...item} onOpenModal={() => openModal(item)} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {modalOpen && selectedItem && (
        <AddToBasketModal
          open={modalOpen}
          closing={modalClosing}
          item={selectedItem}
          onClose={closeModal}
          onAdd={handleAddFromModal}
        />
      )}
    </section>
  );
}