import { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Navbar, Footer } from "./components/ui";
import Home from "./pages/Home";
import { Services, Story, Contact } from "./pages";
import Shop from "./pages/Shop";
import Gallery from "./pages/Gallery";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 text-center">
      <h1 className="text-6xl font-extrabold text-ink">
        404<span className="font-serif italic font-normal">.</span>
      </h1>
      <p className="max-w-sm text-sm text-neutral-600">
        This page doesn’t exist. Head back home and take the scenic route.
      </p>
      <Link
        to="/"
        className="rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white"
      >
        Back to home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <div className="bg-white text-ink">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/story" element={<Story />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
