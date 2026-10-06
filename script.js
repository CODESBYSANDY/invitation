/**
 * HACKITON'26 // MASTER INTERACTIVE CONTROLLER
 * Supports:
 * - Executive Formal Invitation (Principal Desk)
 * - Web Audio Cyberpunk Glitch & Sound Synthesis
 * - Multi-stage Cyberpunk Glitch Transition Engine
 * - 4K UHD 3840x2160 Interactive Layout & 3D Trophy Parallax
 * - Interactive Domain Intel, QR Modal & Website Link System
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  const state = {
    audioEnabled: true,
    currentScreen: 'invitation', // 'invitation' | 'glitch' | 'hackathon'
    customWebsiteUrl: 'https://kpriet.ac.in/events/hackiton26',
    audioCtx: null
  };

  // DOM Elements
  const screenInvitation = document.getElementById('screen-invitation');
  const screenHackathon = document.getElementById('screen-hackathon');
  const glitchStage = document.getElementById('cyber-glitch-stage');
  const acceptBtn = document.getElementById('accept-invite-btn');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const replayBtn = document.getElementById('replay-btn');

  // Check URL parameter for testing (e.g. ?stage=hackathon or ?nodelay=1)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedStage = urlParams.get('stage');
  const noDelay = urlParams.get('nodelay');

  if (noDelay === '1') {
    const curtain = document.getElementById('initial-black-curtain');
    if (curtain) curtain.style.display = 'none';
    const stageContent = document.getElementById('stage-center-content');
    if (stageContent) {
      stageContent.style.opacity = '1';
      stageContent.style.animation = 'none';
      stageContent.style.filter = 'none';
      stageContent.style.transform = 'none';
    }
  }

  if (requestedStage === 'hackathon') {
    const curtain = document.getElementById('initial-black-curtain');
    if (curtain) curtain.style.display = 'none';
    screenInvitation.classList.remove('active');
    screenHackathon.classList.add('active');
    document.body.classList.remove('stage-invitation');
    document.body.classList.add('stage-hackathon');
    state.currentScreen = 'hackathon';
  } else if (requestedStage === 'glitch') {
    const curtain = document.getElementById('initial-black-curtain');
    if (curtain) curtain.style.display = 'none';
    screenInvitation.classList.remove('active');
    glitchStage.classList.add('active');
    state.currentScreen = 'glitch';
  }

  // Modals & Links
  const qrInspectBtn = document.getElementById('qr-inspect-btn');
  const qrModal = document.getElementById('qr-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalUrlInput = document.getElementById('modal-url-input');
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const copyStatus = document.getElementById('copy-status');
  const officialWebsiteLink = document.getElementById('official-website-link');
  const modalOpenLink = document.getElementById('modal-open-link');
  const customizeUrlBtn = document.getElementById('customize-url-btn');

  // Domain Modal
  const domainModal = document.getElementById('domain-detail-modal');
  const domainModalClose = document.getElementById('domain-modal-close');
  const domainModalTitle = document.getElementById('domain-modal-title');
  const domainModalDesc = document.getElementById('domain-modal-description');
  const domainBadgeCategory = document.getElementById('domain-badge-category');

  // Canvases
  const dustCanvas = document.getElementById('ambient-dust-canvas');
  const glitchCanvas = document.getElementById('glitch-canvas');
  const trophyCanvas = document.getElementById('trophy-particles-canvas');

  // Trophy Card
  const trophyInteractiveCard = document.getElementById('trophy-interactive-card');
  const trophyAssetContainer = document.querySelector('.trophy-asset-container');

  // =========================================================================
  // WEB AUDIO SYNTHESIZER (CYBERPUNK GLITCH SOUNDS)
  // Zero external dependencies, 100% reliable in modern browsers!
  // =========================================================================
  function getAudioContext() {
    if (!state.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        state.audioCtx = new AudioContext();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
    return state.audioCtx;
  }

  // Play Cyber Sub Bass Drop
  function playSubBassBoom() {
    if (!state.audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 1.2);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch (e) {
      console.warn('Audio sub-boom error:', e);
    }
  }

  // Play Cyber Glitch Noise Burst
  function playGlitchNoiseBurst(duration = 0.4) {
    if (!state.audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate digital glitch white noise with intermittent cuts
      for (let i = 0; i < bufferSize; i++) {
        if (Math.random() > 0.15) {
          data[i] = (Math.random() * 2 - 1) * 0.8;
        } else {
          data[i] = 0;
        }
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter for crunchy sci-fi sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const gain = ctx.createGain();
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
    } catch (e) {
      console.warn('Audio glitch noise error:', e);
    }
  }

  // Play Digital Telemetry Chirp
  function playCyberChirp(freq = 880, duration = 0.08) {
    if (!state.audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + duration);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Audio chirp error:', e);
    }
  }

  // Play Royal Chime for Invite Card
  function playRoyalChime() {
    if (!state.audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const startTime = ctx.currentTime + idx * 0.12;

        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.5);
      });
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }

  // =========================================================================
  // AMBIENT DUST / STARS CANVAS (SCREEN 1)
  // =========================================================================
  function initDustCanvas() {
    if (!dustCanvas) return;
    const ctx = dustCanvas.getContext('2d');
    let width = dustCanvas.width = window.innerWidth;
    let height = dustCanvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.5 - 0.1,
        color: Math.random() > 0.4 ? '#D4AF37' : '#ffffff'
      });
    }

    function render() {
      if (state.currentScreen !== 'invitation') return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(render);
    }

    render();

    window.addEventListener('resize', () => {
      width = dustCanvas.width = window.innerWidth;
      height = dustCanvas.height = window.innerHeight;
    });
  }

  // =========================================================================
  // GLITCH CANVAS ENGINE (TRANSITION)
  // =========================================================================
  let glitchAnimId = null;
  function runGlitchCanvasAnimation(durationMs = 2400) {
    if (!glitchCanvas) return;
    const ctx = glitchCanvas.getContext('2d');
    let width = glitchCanvas.width = window.innerWidth;
    let height = glitchCanvas.height = window.innerHeight;

    const characters = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>{}[]~/\\';
    const startTime = performance.now();

    function renderGlitch() {
      const elapsed = performance.now() - startTime;
      if (elapsed > durationMs) {
        cancelAnimationFrame(glitchAnimId);
        return;
      }

      ctx.fillStyle = 'rgba(2, 4, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Random Horizontal Slice Glitches
      const slices = Math.floor(Math.random() * 8) + 4;
      for (let s = 0; s < slices; s++) {
        const sliceY = Math.random() * height;
        const sliceH = Math.random() * 60 + 10;
        const offsetX = (Math.random() - 0.5) * 60;

        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.45)' : 'rgba(255, 0, 60, 0.45)';
        ctx.fillRect(0, sliceY, width, sliceH);

        // Matrix noise characters inside slice
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px "Share Tech Mono", monospace';
        for (let c = 0; c < 15; c++) {
          const char = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(char, Math.random() * width, sliceY + Math.random() * sliceH);
        }
      }

      // Vertical Laser Line
      if (Math.random() > 0.4) {
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = Math.random() * 4 + 1;
        ctx.beginPath();
        const lineX = Math.random() * width;
        ctx.moveTo(lineX, 0);
        ctx.lineTo(lineX, height);
        ctx.stroke();
      }

      glitchAnimId = requestAnimationFrame(renderGlitch);
    }

    renderGlitch();
  }

  // =========================================================================
  // TROPHY PARTICLES CANVAS (SCREEN 2)
  // =========================================================================
  function initTrophyParticles() {
    if (!trophyCanvas) return;
    const ctx = trophyCanvas.getContext('2d');
    let width = trophyCanvas.width = trophyCanvas.parentElement.clientWidth || 320;
    let height = trophyCanvas.height = trophyCanvas.parentElement.clientHeight || 260;

    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * (width * 0.6),
        y: height * 0.8 + Math.random() * (height * 0.2),
        radius: Math.random() * 2 + 1,
        speedY: -Math.random() * 1.5 - 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.4 ? '#00f0ff' : '#e024c3'
      });
    }

    function render() {
      if (state.currentScreen !== 'hackathon') {
        requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < height * 0.1) {
          p.y = height * 0.85;
          p.x = width * 0.5 + (Math.random() - 0.5) * (width * 0.6);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // =========================================================================
  // 3D TROPHY INTERACTIVE PARALLAX TILT
  // =========================================================================
  function initTrophy3DParallax() {
    if (!trophyInteractiveCard || !trophyAssetContainer) return;

    window.addEventListener('mousemove', (e) => {
      if (state.currentScreen !== 'hackathon') return;
      const rect = trophyInteractiveCard.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const rotateY = deltaX * 16; // Max 16 deg
      const rotateX = -deltaY * 16;

      trophyAssetContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    trophyInteractiveCard.addEventListener('mouseleave', () => {
      trophyAssetContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // =========================================================================
  // LUXURY GOLD STAGE 3D PARALLAX (SCREEN 1)
  // Multi-plane realistic depth for horizon flare, circular arch & 3D text
  // =========================================================================
  function initLuxuryStage3DParallax() {
    const stageContent = document.getElementById('stage-center-content');
    const horizonFlare = document.querySelector('.stage-horizon-flare');
    const circularArch = document.querySelector('.stage-circular-arch');
    const floorRings = document.querySelector('.floor-rings-perspective');

    if (!stageContent) return;

    window.addEventListener('mousemove', (e) => {
      if (state.currentScreen !== 'invitation') return;

      const normX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to +1
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      // Subtle tilt
      const rotY = normX * 8; // -8 to +8 deg
      const rotX = -normY * 6; // -6 to +6 deg

      stageContent.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

      if (horizonFlare) {
        horizonFlare.style.transform = `translate(calc(-50% + ${normX * 14}px), calc(-50% + ${normY * 8}px))`;
      }
      if (circularArch) {
        circularArch.style.transform = `translate(calc(-50% + ${-normX * 18}px), calc(-50% + ${-normY * 12}px))`;
      }
      if (floorRings) {
        floorRings.style.transform = `perspective(600px) rotateX(${74 + normY * 3}deg) rotateY(${-normX * 6}deg)`;
      }
    });

    // Domain Pillar Cards on Screen 1
    document.querySelectorAll('.domain-pillar-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        playCyberChirp(1100, 0.06);
      });
      card.addEventListener('click', () => {
        const domainKey = card.getAttribute('data-domain');
        openDomainModal(domainKey);
      });
    });
  }

  // =========================================================================
  // THE TRANSITION CHOREOGRAPHY (PHOTO 1 STAGE -> GLITCH -> HACKITON'26 POSTER)
  // =========================================================================
  function triggerCyberGlitchSequence() {
    if (state.currentScreen === 'glitch') return;
    state.currentScreen = 'glitch';

    // 1. Audio Impact: Sub-bass boom & glitch noise
    playSubBassBoom();
    playGlitchNoiseBurst(0.6);
    setTimeout(() => playGlitchNoiseBurst(0.4), 400);
    setTimeout(() => playGlitchNoiseBurst(0.5), 900);
    setTimeout(() => playCyberChirp(1200, 0.2), 1400);
    setTimeout(() => playCyberChirp(1800, 0.25), 1800);

    // 2. Slow gold collapse & flare surge
    const stageContent = document.getElementById('stage-center-content');
    const flare = document.querySelector('.stage-horizon-flare');
    if (stageContent) {
      stageContent.style.transition = 'all 0.65s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
      stageContent.style.transform = 'scale(0.88) translateY(25px)';
      stageContent.style.opacity = '0';
      stageContent.style.filter = 'blur(14px) brightness(2.5)';
    }
    if (flare) {
      flare.style.transition = 'all 0.6s ease';
      flare.style.transform = 'translate(-50%, -50%) scale(2.2)';
      flare.style.opacity = '1';
    }

    setTimeout(() => {
      screenInvitation.classList.remove('active');
      glitchStage.classList.add('active');
      runGlitchCanvasAnimation(2400);

      // Terminal progress and text animation
      const terminalLines = document.querySelectorAll('.term-line');
      terminalLines.forEach((line, idx) => {
        line.style.opacity = '0';
        setTimeout(() => {
          line.style.opacity = '1';
          line.style.transform = 'translateX(4px)';
          playCyberChirp(900 + idx * 200, 0.05);
        }, idx * 350 + 200);
      });

      const progressBar = document.getElementById('glitch-progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
        setTimeout(() => { progressBar.style.width = '35%'; }, 300);
        setTimeout(() => { progressBar.style.width = '75%'; }, 900);
        setTimeout(() => { progressBar.style.width = '100%'; }, 1700);
      }

      // Flash words
      const flashText = document.getElementById('glitch-flash-text');
      const words = ['OVERRIDING ACCESS...', 'DECRYPTING PROTOCOL...', 'QUANTUM BREACH', 'ACCESS GRANTED'];
      let wordIdx = 0;
      const flashInterval = setInterval(() => {
        if (flashText && wordIdx < words.length) {
          flashText.textContent = words[wordIdx];
          wordIdx++;
        }
      }, 450);

      // 3. Reveal 4K Hackathon Poster Stage
      setTimeout(() => {
        clearInterval(flashInterval);
        glitchStage.classList.remove('active');
        screenHackathon.classList.add('active');
        document.body.classList.remove('stage-invitation');
        document.body.classList.add('stage-hackathon');
        state.currentScreen = 'hackathon';

        // Final arrival sound
        playSubBassBoom();
        playCyberChirp(1600, 0.4);

        // Animate Hackathon Entrance
        const title = document.querySelector('.main-hack-title');
        if (title) {
          title.style.animation = 'flashTextJitter 0.4s ease 1';
        }
      }, 2300);

    }, 550);
  }

  // =========================================================================
  // DOMAIN MODAL LOGIC
  // =========================================================================
  const domainData = {
    ai: {
      title: 'AI & SMART TECH',
      desc: 'Architect advanced machine learning pipelines, generative AI solutions, autonomous vision algorithms, and intelligent edge AI nodes that solve real-world industry bottlenecks.',
      category: 'TRACK 01 // INTELLIGENCE'
    },
    cyber: {
      title: 'CYBER SAFETY',
      desc: 'Build next-generation intrusion defense, zero-trust cryptographic architectures, threat intel automation, and ethical security systems to safeguard vital digital infrastructure.',
      category: 'TRACK 02 // DEFENSE & SECURITY'
    },
    industry: {
      title: 'SMART INDUSTRY',
      desc: 'Pioneer Industry 4.0 innovations integrating Industrial IoT, robotics, real-time predictive maintenance, supply chain optimization, and digital twin technology.',
      category: 'TRACK 03 // INDUSTRY 4.0'
    },
    open: {
      title: 'OPEN INNOVATION',
      desc: 'Unleash unrestricted creative engineering! Tackle disruptive interdisciplinary problems spanning Web3, Fintech, EduTech, AR/VR, and societal welfare applications.',
      category: 'TRACK 04 // DISRUPTIVE'
    },
    health: {
      title: 'HEALTH TECH',
      desc: 'Devise smart biomedical sensors, diagnostic AI frameworks, telemedicine conduits, and wearable assistive technologies to transform modern patient care and healthcare delivery.',
      category: 'TRACK 05 // BIOMEDICAL'
    },
    green: {
      title: 'GREEN TECH',
      desc: 'Engineer sustainable clean-tech, smart renewable grid optimizers, carbon footprint tracking platforms, and eco-friendly circular economy solutions for a greener planet.',
      category: 'TRACK 06 // SUSTAINABILITY'
    }
  };

  function openDomainModal(key) {
    const data = domainData[key];
    if (!data) return;

    domainBadgeCategory.textContent = data.category;
    domainModalTitle.textContent = data.title;
    domainModalDesc.textContent = data.desc;
    domainModal.classList.add('active');
    domainModal.setAttribute('aria-hidden', 'false');

    playCyberChirp(1200, 0.1);
  }

  function closeDomainModal() {
    domainModal.classList.remove('active');
    domainModal.setAttribute('aria-hidden', 'true');
    playCyberChirp(600, 0.08);
  }

  document.querySelectorAll('.domain-pill-card, .domain-hud-box').forEach(box => {
    box.addEventListener('click', () => {
      const domainKey = box.getAttribute('data-domain');
      openDomainModal(domainKey);
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const domainKey = box.getAttribute('data-domain');
        openDomainModal(domainKey);
      }
    });
  });

  if (domainModalClose) {
    domainModalClose.addEventListener('click', closeDomainModal);
  }

  if (domainModal) {
    domainModal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        closeDomainModal();
      }
    });
  }

  // =========================================================================
  // QR CODE & WEBSITE LINK MODAL LOGIC
  // =========================================================================
  function openQrModal() {
    qrModal.classList.add('active');
    qrModal.setAttribute('aria-hidden', 'false');
    modalUrlInput.value = state.customWebsiteUrl;
    modalOpenLink.href = state.customWebsiteUrl;
    playCyberChirp(1000, 0.1);
  }

  function closeQrModal() {
    qrModal.classList.remove('active');
    qrModal.setAttribute('aria-hidden', 'true');
    copyStatus.classList.remove('visible');
    playCyberChirp(600, 0.08);
  }

  if (qrInspectBtn) {
    qrInspectBtn.addEventListener('click', openQrModal);
    qrInspectBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openQrModal();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeQrModal);
  }

  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        closeQrModal();
      }
    });
  }

  // Copy link
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(modalUrlInput.value).then(() => {
        copyStatus.classList.add('visible');
        playCyberChirp(1400, 0.12);
        setTimeout(() => {
          copyStatus.classList.remove('visible');
        }, 3000);
      }).catch(err => {
        console.warn('Copy error:', err);
      });
    });
  }

  // Website Destination Customizer
  if (customizeUrlBtn) {
    customizeUrlBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newUrl = prompt('Enter the destination website URL for HACKITON\'26:', state.customWebsiteUrl);
      if (newUrl && newUrl.trim()) {
        let cleanUrl = newUrl.trim();
        if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
          cleanUrl = 'https://' + cleanUrl;
        }
        state.customWebsiteUrl = cleanUrl;
        officialWebsiteLink.href = cleanUrl;
        modalOpenLink.href = cleanUrl;
        modalUrlInput.value = cleanUrl;

        const subLabel = officialWebsiteLink.querySelector('.btn-sub-label');
        if (subLabel) {
          subLabel.textContent = cleanUrl.replace(/^https?:\/\//, '');
        }
        playCyberChirp(1500, 0.15);
      }
    });
  }

  // Coordinator phone numbers: click to call with audio feedback
  document.querySelectorAll('.coord-contact-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      playCyberChirp(1100, 0.08);
    });
  });

  // Registration Fee Badge Click Handler
  const feeBadgeBtn = document.getElementById('fee-badge-btn');
  if (feeBadgeBtn) {
    feeBadgeBtn.addEventListener('click', () => {
      playCyberChirp(1100, 0.12);
      openQrModal();
    });
  }

  // =========================================================================
  // TOOLBAR BUTTONS & MAC-STYLE CONTROLS (AUDIO / FULLSCREEN / REPLAY)
  // =========================================================================
  document.querySelectorAll('#audio-toggle-btn, .mac-pill-btn[id="audio-toggle-btn"]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.audioEnabled = !state.audioEnabled;
      document.querySelectorAll('#audio-toggle-btn, .mac-pill-btn[id="audio-toggle-btn"]').forEach(b => {
        const icon = b.querySelector('.btn-icon, .pill-icon');
        const text = b.querySelector('.btn-text, .pill-text');
        if (state.audioEnabled) {
          if (icon) icon.textContent = '🔊';
          if (text) text.textContent = 'AUDIO ON';
        } else {
          if (icon) icon.textContent = '🔇';
          if (text) text.textContent = 'MUTED';
        }
      });
      if (state.audioEnabled) {
        getAudioContext();
        playCyberChirp(1000, 0.1);
      }
    });
  });

  document.querySelectorAll('#fullscreen-btn, .mac-pill-btn[id="fullscreen-btn"], .dot-green').forEach(btn => {
    btn.addEventListener('click', () => {
      playCyberChirp(900, 0.08);
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn('Fullscreen request failed:', err);
        });
      } else {
        document.exitFullscreen().catch(err => console.warn(err));
      }
    });
  });

  document.querySelectorAll('#replay-btn, .mac-pill-btn[id="replay-btn"], .dot-red').forEach(btn => {
    btn.addEventListener('click', () => {
      playCyberChirp(800, 0.1);
      // Reset to invitation screen
      screenHackathon.classList.remove('active');
      glitchStage.classList.remove('active');
      screenInvitation.classList.add('active');
      document.body.classList.add('stage-invitation');
      document.body.classList.remove('stage-hackathon');
      state.currentScreen = 'invitation';

      const stageContent = document.getElementById('stage-center-content');
      const flare = document.querySelector('.stage-horizon-flare');
      if (stageContent) {
        stageContent.style.opacity = '1';
        stageContent.style.transform = 'translateY(0) scale(1)';
        stageContent.style.filter = 'none';
      }
      if (flare) {
        flare.style.opacity = '1';
        flare.style.transform = 'translate(-50%, -50%) scale(1)';
      }

      playRoyalChime();
    });
  });

  const yellowDot = document.querySelector('.dot-yellow');
  if (yellowDot) {
    yellowDot.addEventListener('click', () => {
      playCyberChirp(600, 0.08);
    });
  }

  // =========================================================================
  // ACCEPT BUTTON EVENT
  // =========================================================================
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      getAudioContext();
      triggerCyberGlitchSequence();
    });
  }

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQrModal();
      closeDomainModal();
    }
  });

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  initDustCanvas();
  initLuxuryStage3DParallax();
  initTrophyParticles();
  initTrophy3DParallax();

  // Subtle royal chime on initial load
  setTimeout(() => {
    playRoyalChime();
  }, 1000);

  console.log("%c HACKITON'26 SYSTEM ONLINE // EXACT PHOTO 1 STAGE // 3840x2160 UHD READY", "color: #D4AF37; background: #030712; font-size: 14px; font-weight: bold; padding: 6px;");
});
