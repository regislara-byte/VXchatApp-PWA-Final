/* ============================================================
   VAXINX ENGINEERING DASHBOARD — script.js
   Implementation 003 — Premium pass (Visual Engineering Guide)
   ============================================================ */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Live clock ----------

function tickClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
tickClock();
setInterval(tickClock, 1000);

// ---------- Audio control (standalone button + Builder Mode sync) ----------

function initAudio() {
  const audio = document.getElementById('builderAudio');
  const audioBtn = document.getElementById('audioBtn');
  const modeButtons = document.querySelectorAll('[data-mode-btn]');
  const body = document.body;

  function setPlaying(playing) {
    audioBtn.setAttribute('aria-pressed', String(playing));
    audioBtn.setAttribute('aria-label', playing ? 'Pause AERS Mode soundtrack' : 'Play AERS Mode soundtrack');
  }

  function play() {
    audio.volume = 0.35;
    audio.play().then(() => setPlaying(true)).catch(err => {
      setPlaying(false);
      console.error('AERS MODE playback blocked or failed:', err.name, err.message);
    });
  }

  function pause() {
    audio.pause();
    setPlaying(false);
  }

  audioBtn.addEventListener('click', () => {
    if (audio.paused) {
      play();
      // Playing the soundtrack manually implies Builder Mode intent.
      body.dataset.mode = 'builder';
      modeButtons.forEach(b => {
        const active = b.dataset.modeBtn === 'builder';
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    } else {
      pause();
    }
  });

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.modeBtn;
      body.dataset.mode = mode;

      modeButtons.forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      if (mode === 'builder') {
        play();
      } else {
        audio.currentTime = 0;
        pause();
      }
    });
  });

  audio.addEventListener('ended', () => setPlaying(false));
  audio.addEventListener('error', () => {
    const err = audio.error;
    const reasons = { 1: 'load aborted', 2: 'network error', 3: 'decode error — file may be corrupt or unsupported format', 4: 'source not found or format not supported' };
    console.error('AERS MODE audio failed to load:', reasons[err?.code] || 'unknown error', '— check that AERS_MODE.mp3 sits next to index.html');
  });
}

// ---------- Data ----------

const implementations = [
  { num: '001', name: 'Repository Revival', status: 'done' },
  { num: '002', name: 'Engineering Dashboard', status: 'active' },
  { num: '003', name: 'Repository Manager', status: 'planned' },
  { num: '004', name: 'Engineering Memory', status: 'planned' },
  { num: '005', name: 'AI Collaboration', status: 'planned' },
  { num: '006', name: 'Repository Health', status: 'planned' },
  { num: '007', name: 'Documentation Generator', status: 'planned' },
  { num: '008', name: 'VLA Viewer', status: 'planned' },
  { num: '009', name: 'Offline Workspace', status: 'planned' },
  { num: '010', name: 'Production Release', status: 'planned' },
  { num: '011', name: 'Multi-Repository Workspace', status: 'planned' },
  { num: '012', name: 'AERS Toolkit', status: 'planned' },
  { num: '013', name: 'Repository Scanner', status: 'planned' },
  { num: '014', name: 'AI Engineering Agent', status: 'planned' },
  { num: '015', name: 'Engineering Platform', status: 'planned' },
];

// Each VLA carries the full engineering record per the Visual Engineering Guide.
const vlaEntries = [
  {
    title: 'VLA-001 — Repository Revival',
    rootCause: 'Repo had drifted into an unstructured legacy state with no engineering standard.',
    effect: 'No shared language between human and AI collaborators on repo state.',
    decision: 'Adopt AERS as the root structure and documentation standard.',
    result: 'Repository reorganized under archives/, assets/, docs/, tools/.',
    nextAction: 'Establish push automation.',
  },
  {
    title: 'VLA-002 — Push Automation',
    rootCause: 'Manual git commands were error-prone and inconsistent across sessions.',
    effect: 'Commit messages and push steps varied session to session.',
    decision: 'Wrap commit + push into tools/push.bat.',
    result: 'One-command push workflow, consistent every time.',
    nextAction: 'Add pre-push audit checks.',
  },
];

const statLabels = {
  total: implementations.length,
  done: implementations.filter(i => i.status === 'done').length,
  active: implementations.filter(i => i.status === 'active').length,
  duplicates: 0,
};

// ---------- Render: stat tiles ----------

function renderStats() {
  const grid = document.getElementById('statGrid');
  const tiles = [
    { value: statLabels.total, label: 'Implementations Tracked', cls: '' },
    { value: statLabels.done, label: 'Completed', cls: 'good' },
    { value: statLabels.active, label: 'In Progress', cls: 'warn' },
    { value: statLabels.duplicates, label: 'Duplicate Files Found', cls: 'good' },
  ];
  grid.innerHTML = tiles.map(t => `
    <div class="stat-tile">
      <span class="stat-value ${t.cls}">${t.value}</span>
      <span class="stat-label">${t.label}</span>
    </div>
  `).join('');
}

// ---------- Render: implementation index ----------

function renderImplementations() {
  const list = document.getElementById('implList');
  list.innerHTML = implementations.map(item => `
    <li class="impl-row">
      <span class="impl-num">${item.num}</span>
      <span class="impl-name">${item.name}</span>
      <span class="status-pill status-${item.status}">${item.status}</span>
    </li>
  `).join('');
}

// ---------- Render: VLA flip cards ----------

function renderVLA() {
  const strip = document.getElementById('vlaStrip');
  strip.innerHTML = vlaEntries.map((v, i) => `
    <div class="vla-card" data-vla-index="${i}" tabindex="0" role="button" aria-pressed="false" aria-label="${v.title}, press to view engineering record">
      <div class="vla-card-inner">
        <div class="vla-face vla-front">
          <div class="vla-thumb">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <div class="vla-caption">${v.title}</div>
        </div>
        <div class="vla-face vla-back">
          <dl>
            <dt>Root Cause</dt><dd>${v.rootCause}</dd>
            <dt>Effect</dt><dd>${v.effect}</dd>
            <dt>Decision</dt><dd>${v.decision}</dd>
            <dt>Result</dt><dd>${v.result}</dd>
            <dt>Next Action</dt><dd>${v.nextAction}</dd>
          </dl>
        </div>
      </div>
    </div>
  `).join('');

  strip.querySelectorAll('.vla-card').forEach(card => {
    const flip = () => {
      const flipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(flipped));
    };
    card.addEventListener('click', flip);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  });
}

// ---------- 3D tilt physics (mouse-driven, purposeful hover feedback) ----------

function initTilt(selector, maxTilt = 6) {
  if (prefersReduced) return;
  document.querySelectorAll(selector).forEach(el => {
    el.style.transformStyle = 'preserve-3d';

    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `rotateX(${(-y * maxTilt).toFixed(2)}deg) rotateY(${(x * maxTilt).toFixed(2)}deg) translateZ(0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
}

// ---------- Scroll reveal ----------

function initScrollReveal() {
  const targets = document.querySelectorAll('.panel, .timeline');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => observer.observe(t));
}

// ---------- Hero: terminal boot sequence ----------

const bootLines = [
  { text: '$ tools\\audit.bat', cls: 'tl-bright' },
  { text: '', cls: 'tl-dim' },
  { text: '=============================================', cls: 'tl-green' },
  { text: ' Checking for duplicate IMPLEMENTATION files', cls: 'tl-cyan' },
  { text: '=============================================', cls: 'tl-green' },
  { text: 'No duplicate IMPLEMENTATION files found.', cls: 'tl-green' },
  { text: '', cls: 'tl-dim' },
  { text: '=============================================', cls: 'tl-green' },
  { text: ' Checking for empty or stub docs', cls: 'tl-cyan' },
  { text: '=============================================', cls: 'tl-green' },
  { text: 'No empty or stub docs found.', cls: 'tl-green' },
  { text: '', cls: 'tl-dim' },
  { text: '=============================================', cls: 'tl-green' },
  { text: ' AUDIT SUMMARY', cls: 'tl-cyan' },
  { text: '=============================================', cls: 'tl-green' },
  { text: ' Repository is clean. Safe to commit.', cls: 'tl-green', pulse: true },
];

function typeBootSequence() {
  const body = document.getElementById('terminalBody');
  const card = document.getElementById('terminalCard');
  if (!body) return;

  if (prefersReduced) {
    body.innerHTML = bootLines.map(l => `<span class="${l.cls}">${l.text}</span>`).join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  body.innerHTML = '';

  function typeNext() {
    if (lineIndex >= bootLines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      body.appendChild(cursor);
      // Audit completion: purposeful glow pulse on the card + summary line
      if (card) {
        card.classList.add('tilt-glow');
        setTimeout(() => card.classList.remove('tilt-glow'), 1600);
      }
      return;
    }

    const line = bootLines[lineIndex];

    if (charIndex === 0) {
      const span = document.createElement('span');
      span.className = line.cls + (line.pulse ? ' tl-summary-pulse' : '');
      span.dataset.lineIndex = lineIndex;
      body.appendChild(span);
      if (lineIndex > 0) body.appendChild(document.createTextNode('\n'));
    }

    const span = body.querySelector(`span[data-line-index="${lineIndex}"]`);
    if (charIndex < line.text.length) {
      span.textContent += line.text[charIndex];
      charIndex++;
      setTimeout(typeNext, line.text.length > 0 ? 8 : 0);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, line.text === '' ? 40 : 80);
    }
  }

  typeNext();
}

// ---------- Init ----------

document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  renderStats();
  renderImplementations();
  renderVLA();
  typeBootSequence();
  initScrollReveal();
  initTilt('.terminal', 4);
  initTilt('.stat-tile', 8);
});
