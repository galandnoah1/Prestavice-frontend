import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'

import LandingPage from './pages/LandingPage/LandingPage.jsx'
import ExplorerPage from './pages/ExplorerPage/ExplorerPage.jsx'
import ArtisanPage from './pages/ArtisanPage/ArtisanPage.jsx'
import HowItWorksPage from './pages/LandingPage/HowItWorksPage.jsx'
import PublishRequestPage from './pages/PublishRequestPage/PublishRequestPage.jsx'
import SettingsPage from './pages/SettingsPage/SettingsPage.jsx'
import LegalPage from './pages/LandingPage/LegalPage.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'

import LoginPage from './pages/LoginPage/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'

import DashboardArtisanLayout from './pages/DashboardArtisan/DashboardArtisanLayout.jsx'
import ArtisanOverview from './pages/DashboardArtisan/Overview.jsx'
import ArtisanProfile from './pages/DashboardArtisan/MyProfile.jsx'
import ArtisanRealisations from './pages/DashboardArtisan/MyRealisations.jsx'
import ArtisanReviews from './pages/DashboardArtisan/MyReviews.jsx'
import ArtisanRequests from './pages/DashboardArtisan/MyRequests.jsx'

import DashboardClientLayout from './pages/DashboardClient/DashboardClientLayout.jsx'
import ClientOverview from './pages/DashboardClient/Overview.jsx'
import ClientRequests from './pages/DashboardClient/MyRequests.jsx'
import ClientReviews from './pages/DashboardClient/MyReviews.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explorer" element={<ExplorerPage />} />
        <Route path="/artisan/:id" element={<ArtisanPage />} />
        <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
        <Route path="/publier-demande" element={<PublishRequestPage />} />
        <Route path="/parametres" element={<SettingsPage />} />
        <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
        <Route path="/confidentialite" element={<LegalPage title="Politique de confidentialité" />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterPage />} />
      </Route>

      <Route path="/dashboard-artisan" element={<DashboardArtisanLayout />}>
        <Route index element={<ArtisanOverview />} />
        <Route path="profil" element={<ArtisanProfile />} />
        <Route path="realisations" element={<ArtisanRealisations />} />
        <Route path="avis" element={<ArtisanReviews />} />
        <Route path="demandes" element={<ArtisanRequests />} />
      </Route>

      <Route path="/dashboard-client" element={<DashboardClientLayout />}>
        <Route index element={<ClientOverview />} />
        <Route path="demandes" element={<ClientRequests />} />
        <Route path="avis" element={<ClientReviews />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
