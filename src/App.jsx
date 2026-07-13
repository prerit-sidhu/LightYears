import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useProgress } from '@react-three/drei'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Background3D from './components/Background3D'
import LoadingScreen from './components/LoadingScreen'

import Home from './pages/Home'
import Reserve from './pages/Reserve'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function App() {
  const { active } = useProgress()
  const [isLoaded, setIsLoaded] = useState(false)

  // Only trigger the initial load once to prevent unmounting if active toggles again
  useEffect(() => {
    if (!active) {
      // Add a tiny delay to ensure the loading screen fade-out has started
      const timer = setTimeout(() => setIsLoaded(true), 500)
      return () => clearTimeout(timer)
    }
  }, [active])

  return (
    <Router>
      <div className="w-full min-h-screen bg-transparent font-[var(--font-ui)] text-[var(--color-starlight)] relative selection:bg-[var(--color-pulsar)] selection:text-[var(--color-void)]">
        
        {/* Deep Space Background Image specifically for Hero */}
        <div className="absolute top-0 left-0 w-full h-[100vh] z-[-1] overflow-hidden pointer-events-none">
          <img 
            src="/deep-space.jpg" 
            alt="Deep Space" 
            className="w-full h-full object-cover opacity-60" 
            decoding="async"
            fetchpriority="high"
          />
          {/* Bottom fade to blend seamlessly into the black void as you scroll */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-void)]" />
        </div>

        {/* Global Loading Screen */}
        <LoadingScreen />

        {/* 3D WebGL Background Layer (Persistent across routes) */}
        <Background3D />
        
        {/* Global Vignette Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[5]"
             style={{
               background: `radial-gradient(circle at center, transparent 0%, rgba(4,6,15,0.6) 100%)`
             }}
        />
        
        {/* Foreground UI Layer - Only mounts AFTER loading is complete */}
        {isLoaded && (
          <div className="relative z-10 w-full flex flex-col min-h-screen">
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reserve" element={<Reserve />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
            <Footer />
          </div>
        )}

      </div>
    </Router>
  )
}

export default App
