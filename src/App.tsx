import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/layout/Layout'
import { AuthGate } from './components/auth/AuthGate'
import { Dashboard } from './pages/Dashboard'
import { Pipeline } from './pages/Pipeline'
import { Prospects } from './pages/Prospects'
import { Calls } from './pages/Calls'
import { Revenus } from './pages/Revenus'
import { Livraison } from './pages/Livraison'

function App() {
  return (
    <BrowserRouter>
      <AuthGate>
        <AppProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/prospects" element={<Prospects />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/revenus" element={<Revenus />} />
              <Route path="/livraison" element={<Livraison />} />
            </Routes>
          </Layout>
        </AppProvider>
      </AuthGate>
    </BrowserRouter>
  )
}

export default App
