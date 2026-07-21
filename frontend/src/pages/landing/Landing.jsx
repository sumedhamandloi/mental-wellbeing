import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import logo from '../../assets/icons/logo.png';
import sparklesImage from '../../assets/sparkles.png';
import calmiImage from '../../assets/Calmi.png';
import scqIcon from '../../assets/SCQ.png';
import gwbsIcon from '../../assets/GWBS.png';
import tabbpsIcon from '../../assets/TABBPS.png';
import eiIcon from '../../assets/EI.png';

const Landing = () => {

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      color: '#000000',
      fontFamily: "'Raleway', sans-serif"
    }}>

      {/* Header bar / Navbar */}
      <header style={{
        padding: '1.5rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1363px',
        margin: '0 auto',
        width: '100%',
        backgroundColor: 'transparent'
      }}>
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo} alt="Manomitra Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
            fontSize: '30px',
            lineHeight: '40px',
            color: '#3E4F45',
            display: 'inline-flex',
            alignItems: 'center'
          }}>
            ManoMitra
          </span>
        </div>

        {/* Center Links */}
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#home" style={{
            color: '#3E4F45',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '17px',
            lineHeight: '20px',
            position: 'relative',
            paddingBottom: '4px',
            borderBottom: '2.5px solid #FF7F50'
          }}>Home</a>
          <a href="#about" style={{ color: '#3E4F45', fontWeight: 700, textDecoration: 'none', fontSize: '17px', lineHeight: '20px' }}>About</a>
          <a href="#quizzes" style={{ color: '#3E4F45', fontWeight: 700, textDecoration: 'none', fontSize: '17px', lineHeight: '20px' }}>Quizzes</a>
          <a href="#message" style={{ color: '#3E4F45', fontWeight: 700, textDecoration: 'none', fontSize: '17px', lineHeight: '20px' }}>The Message</a>
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/login" className="btn btn-secondary" style={{
            width: '98px',
            height: '40px',
            boxSizing: 'border-box',
            borderRadius: '34px',
            border: '1px solid #5B5B5B',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            color: '#3E4F45',
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 700,
            fontSize: '15px',
            lineHeight: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}>
            Login
          </Link>
          <Link to="/register" className="btn btn-primary" style={{
            width: '136px',
            height: '40px',
            borderRadius: '34px',
            backgroundColor: '#FF7F50',
            border: 'none',
            color: '#ffffff',
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 700,
            fontSize: '15px',
            lineHeight: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            gap: '0.25rem'
          }}>
            <span>Get Started</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main style={{
        flexGrow: 1,
        maxWidth: '1363px',
        margin: '0 auto',
        width: '100%',
        padding: '2.5rem 2.5rem 5rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '6rem'
      }}>

        {/* Hero Section */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative'
        }}>

          {/* Left Column Text & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>

            {/* Sparkles PNG decoration above title */}
            <div style={{ position: 'absolute', top: '-40px', right: '25%', pointerEvents: 'none' }}>
              <img
                src={sparklesImage}
                alt="Sparkles decoration"
                style={{ width: '120px', height: '120px', objectFit: 'contain' }}
              />
            </div>

            {/* Greeting text title block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '52px',
                lineHeight: '69px',
                color: '#000000',
                margin: 0
              }}>
                Student Wellbeing<br />
                Made <span style={{ fontStyle: 'italic', color: '#2E7D4F' }}>Measurable</span>
              </h1>

              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '23px',
                color: '#738077',
                maxWidth: '547px',
                margin: 0
              }}>
                Scientifically validated assessments and intelligent insights to help institution understand, monitor and improve student wellbeing.
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem' }}>
              <Link to="/register" className="btn btn-primary" style={{
                width: '160px',
                height: '40px',
                borderRadius: '34px',
                backgroundColor: '#FF7F50',
                border: 'none',
                color: '#ffffff',
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                lineHeight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                gap: '0.25rem'
              }}>
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Link>
              <a href="#quick-login" className="btn btn-secondary" style={{
                width: '141px',
                height: '40px',
                boxSizing: 'border-box',
                borderRadius: '34px',
                border: '1px solid #5B5B5B',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                color: '#3E4F45',
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                lineHeight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}>
                Show Demo
              </a>
            </div>

                        {/* Mascot & Badges Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              
              {/* Mascot Character */}
              <img 
                src={calmiImage} 
                alt="Calmi Mascot" 
                style={{ width: '150px', height: '150px', objectFit: 'contain' }} 
              />

              {/* Badges Row */}
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                
                {/* Badge 1: Validated */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    backgroundColor: '#E8F5EC', // Light green
                    borderRadius: '50%', // Circle
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#107B3E' // Forest green icon
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <span style={{ 
                    fontFamily: "'Raleway', sans-serif", 
                    fontWeight: 700, 
                    fontSize: '11px', 
                    lineHeight: '14px', 
                    color: '#738077',
                    width: '80px',
                    display: 'block'
                  }}>
                    Scientifically Validated
                  </span>
                </div>

                {/* Badge 2: Secure */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    backgroundColor: '#E8F5EC', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#107B3E'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <span style={{ 
                    fontFamily: "'Raleway', sans-serif", 
                    fontWeight: 700, 
                    fontSize: '11px', 
                    lineHeight: '14px', 
                    color: '#738077',
                    width: '80px',
                    display: 'block'
                  }}>
                    Secure & Confidential
                  </span>
                </div>

                {/* Badge 3: Trusted */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    backgroundColor: '#E8F5EC', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#107B3E'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <span style={{ 
                    fontFamily: "'Raleway', sans-serif", 
                    fontWeight: 700, 
                    fontSize: '11px', 
                    lineHeight: '14px', 
                    color: '#738077',
                    width: '80px',
                    display: 'block'
                  }}>
                    Community Focused
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: High Fidelity Floating Preview Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '490px',
              height: '320px',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0px 4px 15px rgba(157, 152, 152, 0.25)',
              border: '1px solid rgba(43, 83, 58, 0.08)',
              display: 'flex',
              overflow: 'hidden',
              transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
              transition: 'all 0.4s ease'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(2deg)';
              }}
            >

              {/* Preview Sidebar */}
              <div style={{
                width: '32%',
                backgroundColor: '#2b533a',
                padding: '1.25rem 0.85rem',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.5rem' }}>
                    <img src={logo} alt="" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>ManoMitra</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.5rem', borderRadius: '5px', backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '0.72rem', fontWeight: 600 }}>
                      <span>Dashboard</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.5rem', fontSize: '0.72rem', opacity: 0.7 }}>
                      <span>My Quizzes</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.5rem', fontSize: '0.72rem', opacity: 0.7 }}>
                      <span>Events & Workshops</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.5rem', fontSize: '0.72rem', opacity: 0.7 }}>
                      <span>Profile</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.6rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#a8cf45', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d3c27', fontWeight: 700, fontSize: '0.65rem' }}>
                    AS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 600, whiteSpace: 'nowrap' }}>Anirudh Saxena</span>
                    <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>Student</span>
                  </div>
                </div>
              </div>

              {/* Preview Content Area */}
              <div style={{
                width: '68%',
                padding: '1.25rem 1.5rem',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#738077' }}>Good to see you Anirudh</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1d3c27', marginTop: '0.1rem', margin: 0 }}>How are you doing twin?</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
                  <div style={{ height: '32px', backgroundColor: '#f0ede6', borderRadius: '6px' }}></div>
                  <div style={{ height: '32px', backgroundColor: '#f0ede6', borderRadius: '6px' }}></div>
                  <div style={{ height: '32px', backgroundColor: '#f0ede6', borderRadius: '6px' }}></div>
                  <div style={{ height: '32px', backgroundColor: '#f0ede6', borderRadius: '6px' }}></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flexGrow: 1, justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0ede6', paddingBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Recent Activity</span>
                    <span style={{ fontSize: '0.62rem', color: '#ff8052', fontWeight: 600 }}>View All →</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.2fr 1fr', fontSize: '0.55rem', color: '#738077', paddingBottom: '0.2rem', fontWeight: 600 }}>
                    <span>Quiz Type</span>
                    <span>Event</span>
                    <span>Date</span>
                    <span>Result</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.2fr 1fr', fontSize: '0.55rem', borderBottom: '1px solid #f9f9f9', paddingBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 600 }}>SCQ</span>
                    <span>e1</span>
                    <span>06/06</span>
                    <span style={{ color: '#d97706', fontWeight: 600 }}>Average</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.2fr 1fr', fontSize: '0.55rem' }}>
                    <span style={{ fontWeight: 600 }}>GWBS</span>
                    <span>e1</span>
                    <span>06/06</span>
                    <span style={{ color: '#16a34a', fontWeight: 600 }}>High</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Core Assessments Grid */}
        <section id="quizzes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>

          <h2 style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '30px',
            lineHeight: '35px',
            fontWeight: 700,
            color: '#3E4F45',
            textAlign: 'center',
            maxWidth: '706px',
            margin: 0
          }}>
            Multiple Assessments. Complete Wellbeing View.
          </h2>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', width: '100%' }}>

            {/* 1. SCQ */}
            <div style={{
              boxSizing: 'border-box',
              width: '267px',
              height: '284px',
              backgroundColor: '#F3FAF6',
              borderRadius: '15px',
              border: '1px solid #73D38F',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.65rem',
              margin: '0 auto',
              transition: 'transform 0.3s ease'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Icon Container (Green) */}
              <div style={{
                width: '71px',
                height: '65px',
                borderRadius: '12px',
                backgroundColor: '#A2EAB7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3E4F45'
              }}>
                <img
                  src={scqIcon}
                  alt="SCQ Icon"
                  style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: '27px', lineHeight: '32px', fontWeight: 700, margin: 0, color: '#3E4F45' }}>SCQ</h3>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#617C6C', fontWeight: 700 }}>Self Concept</span>
              <div style={{ width: '207px', height: '1px', borderBottom: '0.7px solid #75D79E', margin: '0.25rem 0' }}></div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#4F5550', margin: 0, maxWidth: '205px' }}>
                Measures self-perception and identity
              </p>
            </div>

            {/* 2. GWBS */}
            <div style={{
              boxSizing: 'border-box',
              width: '267px',
              height: '284px',
              backgroundColor: '#F6F9FE',
              borderRadius: '15px',
              border: '1px solid #A0D3FD',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.65rem',
              margin: '0 auto',
              transition: 'transform 0.3s ease'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Icon Container (Blue) */}
              <div style={{
                width: '68px',
                height: '64px',
                borderRadius: '12px',
                backgroundColor: '#C7E6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3E4F45'
              }}>
                <img
                  src={gwbsIcon}
                  alt="GWBS Icon"
                  style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: '27px', lineHeight: '32px', fontWeight: 700, margin: 0, color: '#3E4F45' }}>GWBS</h3>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#617C6C', fontWeight: 700 }}>General Well-Being</span>
              <div style={{ width: '207px', height: '1px', borderBottom: '0.7px solid #A0D3FD', margin: '0.25rem 0' }}></div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#4F5550', margin: 0, maxWidth: '205px' }}>
                Measures overall well-being and life-satisfaction
              </p>
            </div>

            {/* 3. TABBPS */}
            <div style={{
              boxSizing: 'border-box',
              width: '267px',
              height: '284px',
              backgroundColor: '#FDFCFB',
              borderRadius: '15px',
              border: '1px solid #FDB224',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.65rem',
              margin: '0 auto',
              transition: 'transform 0.3s ease'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Icon Container (Yellow/Orange) */}
              <div style={{
                width: '67px',
                height: '63px',
                borderRadius: '12px',
                backgroundColor: '#F9CD79',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3E4F45'
              }}>
                <img
                  src={tabbpsIcon}
                  alt="TABBPS Icon"
                  style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: '27px', lineHeight: '32px', fontWeight: 700, margin: 0, color: '#3E4F45' }}>TABBPS</h3>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#617C6C', fontWeight: 700 }}>Type A/B Pattern</span>
              <div style={{ width: '207px', height: '1px', borderBottom: '0.7px solid #FDB224', margin: '0.25rem 0' }}></div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#4F5550', margin: 0, maxWidth: '205px' }}>
                Identifies behaviour patterns and stress patterns
              </p>
            </div>

            {/* 4. EI */}
            <div style={{
              boxSizing: 'border-box',
              width: '267px',
              height: '284px',
              backgroundColor: '#FCFBFE',
              borderRadius: '15px',
              border: '1px solid #763FED',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.65rem',
              margin: '0 auto',
              transition: 'transform 0.3s ease'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Icon Container (Purple) */}
              <div style={{
                width: '72px',
                height: '67px',
                borderRadius: '12px',
                backgroundColor: '#C8AFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3E4F45'
              }}>
                <img
                  src={eiIcon}
                  alt="EI Icon"
                  style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: '27px', lineHeight: '32px', fontWeight: 700, margin: 0, color: '#3E4F45' }}>EI</h3>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#617C6C', fontWeight: 700 }}>Emotional Intelligence</span>
              <div style={{ width: '207px', height: '1px', borderBottom: '0.7px solid #763FED', margin: '0.25rem 0' }}></div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#4F5550', margin: 0, maxWidth: '205px' }}>
                Measures emotional abilities and social skills
              </p>
            </div>

          </div>
        </section>

        {/* Bottom Horizontal Beige Bar Section */}
        <section style={{
          backgroundColor: '#FFEDDA',
          borderRadius: '15px',
          padding: '2.5rem 3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2.5rem',
          maxWidth: '1363px',
          width: '100%',
          boxShadow: '0 8px 24px rgba(253, 245, 230, 0.2)',
          border: '1px solid rgba(43, 83, 58, 0.04)',
          alignItems: 'center'
        }}>
          {/* Column 1: Track progress */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', borderRight: '1px solid rgba(0,0,0,0.08)', paddingRight: '1rem' }}>
            <div style={{ color: '#3E4F45', marginTop: '0.2rem' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Raleway', sans-serif", fontSize: '21.715px', lineHeight: '28px', fontWeight: 700, color: '#3E4F45', margin: 0 }}>Track progress</h4>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#8C9D8D', marginTop: '0.35rem', fontWeight: 700, margin: 0 }}>
                Monitor Individual & Class-wellbeing over time
              </p>
            </div>
          </div>

          {/* Column 2: Data Driven Insights */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', borderRight: '1px solid rgba(0,0,0,0.08)', paddingRight: '1rem' }}>
            <div style={{ color: '#3E4F45', marginTop: '0.2rem' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Raleway', sans-serif", fontSize: '21.715px', lineHeight: '28px', fontWeight: 700, color: '#3E4F45', margin: 0 }}>Data Driven Insights</h4>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#8C9D8D', marginTop: '0.35rem', fontWeight: 700, margin: 0 }}>
                Identify trends and students who need support
              </p>
            </div>
          </div>

          {/* Column 3: Engaging Events */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', borderRight: '1px solid rgba(0,0,0,0.08)', paddingRight: '1rem' }}>
            <div style={{ color: '#3E4F45', marginTop: '0.2rem' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Raleway', sans-serif", fontSize: '21.715px', lineHeight: '28px', fontWeight: 700, color: '#3E4F45', margin: 0 }}>Engaging Events</h4>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#8C9D8D', marginTop: '0.35rem', fontWeight: 700, margin: 0 }}>
                Activities to promote student well-being
              </p>
            </div>
          </div>

          {/* Column 4: Safe & Confidential */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingRight: '1rem' }}>
            <div style={{ color: '#3E4F45', marginTop: '0.2rem' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Raleway', sans-serif", fontSize: '21.715px', lineHeight: '28px', fontWeight: 700, color: '#3E4F45', margin: 0 }}>Safe & Confidential</h4>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '15px', lineHeight: '18px', color: '#8C9D8D', marginTop: '0.35rem', fontWeight: 700, margin: 0 }}>
                Ensure privacy and security of data
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#738077',
        background: '#ffffff'
      }}>
        <p>© 2026 ManoMitra Student Well-Being Management Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
export { Landing };
