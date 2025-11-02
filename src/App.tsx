
import Header from './components/Header'
import GithubProjects from './components/GithubProjects'
import ProfileQuickLinks from './components/ProfileQuickLinks'
import Section from './components/Section'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import { BRAND_NAME, QuickProfile } from './constants'
import { QUICK_PROFILES } from './constants'
import ProfilePicker from './components/ProfilePicker'
import { useEffect, useState } from 'react'
import NetflixIntro from './components/NetflixIntro'

export default function App() {
  const [selectedProfile, setSelectedProfile] = useState<QuickProfile | null>(null)
  const [showPicker, setShowPicker] = useState(true)
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pb:selectedProfile')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.label) {
          setSelectedProfile(parsed)
          setShowPicker(false)
        } else {
          // corrupted or unexpected value
          localStorage.removeItem('pb:selectedProfile')
          setShowPicker(true)
        }
      } else {
        setShowPicker(true)
      }
    } catch (e) {
      // JSON parse failed; clear and show picker
      localStorage.removeItem('pb:selectedProfile')
      setShowPicker(true)
    }
  }, [])

  const handleSelectProfile = (p: QuickProfile) => {
    setSelectedProfile(p)
    localStorage.setItem('pb:selectedProfile', JSON.stringify(p))
    setShowPicker(false)
    setShowIntro(true)
  }

  const handleSwitchProfile = () => {
    setShowPicker(true)
  }

  return (
  <div className="min-h-screen relative">
      <div className="relative z-10">
        {showPicker && <ProfilePicker onSelect={handleSelectProfile} />}
        {showIntro && <NetflixIntro onFinish={() => setShowIntro(false)} brandName={BRAND_NAME} />}
        {!showPicker && !showIntro && (
          <>
            <Header onSwitchProfile={handleSwitchProfile} />
            {/* Home / Hero with onepiece-bg only in the summary box */}
            <section id="home" className="relative pt-20 sm:pt-24 lg:pt-28">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                  className="rounded-2xl border border-white/10 bg-onepiece-bg bg-center bg-no-repeat bg-cover p-8 lg:p-10 shadow-glow relative"
                >
                  <div className="absolute inset-0 bg-black/60 rounded-2xl z-0" />
                  <div className="relative z-10">
                    <div className="text-sm uppercase tracking-widest text-neutral-400">Welcome{selectedProfile ? `, ${['Recruiter', 'Developer', 'Stalker', 'Adventure'][QUICK_PROFILES.findIndex((p: QuickProfile) => p.label === selectedProfile.label)]}` : ''}</div>
                    <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight">
                      {BRAND_NAME}
                    </h1>
                    <div className="mt-4">
                      <div className="text-xs uppercase tracking-widest text-neutral-400">Profile Summary</div>
                      <p className="mt-2 max-w-2xl text-neutral-300">
                        Aspiring Full-Stack AI Engineer with expertise in Python, SQL, and AI/ML technologies. Experienced with FastAPI, LangChain, RAG systems, and database development. Skilled in data analytics using Power BI, Python libraries (Pandas, NumPy), and machine learning frameworks. Currently learning frontend development while building AI-powered applications and automation solutions.
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a href="#projects" className="rounded bg-brand-500 px-4 py-2 font-semibold text-white hover:opacity-90">View Projects</a>
                      <button onClick={handleSwitchProfile} className="rounded border border-white/10 px-4 py-2 text-neutral-200 hover:bg-white/5">Switch Profile</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <ProfileQuickLinks onSelect={handleSelectProfile} />
            {/* Skills */}
            <Section
              id="skills"
              title="Skills"
              subtitle="Key technologies I work with"
              bgClassName="bg-skills-bg bg-cover bg-center bg-no-repeat bg-fixed"
              overlayClassName="bg-black/30"
            >
              <Skills />
            </Section>
            {/* Experience */}
            <Section id="experience" title="Experience" subtitle="Work and internships">
              <Experience />
            </Section>
            {/* Certifications */}
            <Section id="certifications" title="Certifications">
              <Certifications />
            </Section>
            {/* Projects */}
            <Section id="projects" title="Continue Watching" subtitle="Recent projects from GitHub">
              <GithubProjects />
            </Section>
            {/* Contact */}
            <Section id="contact" title="Contact Me" subtitle="Reach out directly or send a quick note">
              <Contact />
            </Section>
            <footer className="border-t border-white/10 py-8 text-center text-sm text-neutral-500">
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </footer>
          </>
        )}
      </div>
    </div>
  )
}
