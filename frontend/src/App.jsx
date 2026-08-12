import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

import Home from './pages/Home.jsx'
import Catalogue from './pages/Catalogue.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import About from './pages/About.jsx'
import Quote from './pages/Quote.jsx'
import Reviews from './pages/Reviews.jsx'
import Contact from './pages/Contact.jsx'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminProducts from './pages/admin/AdminProducts.jsx'
import AdminArrivals from './pages/admin/AdminArrivals.jsx'
import AdminQuotes from './pages/admin/AdminQuotes.jsx'
import AdminReviews from './pages/admin/AdminReviews.jsx'
import AdminSettings from './pages/admin/AdminSettings.jsx'

import GestionProduits from "./components/admin/GestionProduits";

import GestionArrivages from "./components/admin/GestionArrivages";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/catalogue/:id" element={<ProductDetail />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/devis" element={<Quote />} />
          <Route path="/avis" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="produits" element={<GestionProduits />} />
          <Route path="arrivages" element={<GestionArrivages />} />
          <Route path="devis" element={<AdminQuotes />} />
          <Route path="avis" element={<AdminReviews />} />
          <Route path="parametres" element={<AdminSettings />} />        </Route>
      </Routes>
    </BrowserRouter>
  )
}

