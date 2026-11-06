/**
 * MONO Studio — Swiss Interaction Engine
 * Pure Vanilla JavaScript (ES6+), Zero Build Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // Project Database for Inspector Drawer
  const projectDatabase = {
    1: {
      idx: 'SPECIFICATION // 01',
      title: 'Atelier Kunsthaus Pavilion',
      category: 'Spatial Architecture',
      year: '2026',
      client: 'Kunsthaus Stiftung Zürich',
      materials: 'Basalt Stone, Low-Iron Glazing, Recycled Bronze',
      scale: '1,400 sq.m Cantilever',
      narrative: 'Engineered to dissolve boundaries between internal spatial acoustics and the Alpine lake landscape. The structural load is distributed across three post-tensioned granite pylons with triple-glazed thermal membranes.',
      artClass: 'spatial-art-1'
    },
    2: {
      idx: 'SPECIFICATION // 02',
      title: 'Series-8 Chrono Turntable',
      category: 'Hardware & Objects',
      year: '2025',
      client: 'Klangwerk Audio Zürich',
      materials: 'Billet 6061-T6 Aluminum, Sapphire Bearing, Carbon Tone-arm',
      scale: '440 × 360 × 140 mm • 18.4 kg',
      narrative: 'A direct-drive vinyl reference player engineered with 0.015% wow-and-flutter. CNC-machined from single billet blocks to eliminate unwanted acoustic resonant harmonics.',
      artClass: 'hardware-art-1'
    },
    3: {
      idx: 'SPECIFICATION // 03',
      title: 'Helvetia Banking Core OS',
      category: 'Digital Systems',
      year: '2026',
      client: 'Helvetia Cantonal Bank',
      materials: 'Parametric Type System, Sub-pixel CSS Tokens, WebGL Depth',
      scale: 'Global Institutional Interface (48k Daily Terminals)',
      narrative: 'A high-throughput financial trading console designed around typographic legibility, micro-contrast, and keyboard velocity. Reduced input error rates by 41% across Swiss desks.',
      artClass: 'digital-art-1'
    },
    4: {
      idx: 'SPECIFICATION // 04',
      title: 'Engadin Alpine Refuge',
      category: 'Spatial Architecture',
      year: '2025',
      client: 'Private Commission (St. Moritz)',
      materials: 'Rammed Mountain Loam, Local Charred Larch, Zinc Roof',
      scale: '320 sq.m High-Altitude Dwelling',
      narrative: 'Passivhaus certified sanctuary seated at 1,800m elevation. Built using hyper-local vernacular stone and solar thermal massing to achieve net-negative carbon lifecycle.',
      artClass: 'spatial-art-2'
    },
    5: {
      idx: 'SPECIFICATION // 05',
      title: 'M-01 Planar Transducer',
      category: 'Hardware & Objects',
      year: '2026',
      client: 'Atelier Sound Works Tokyo',
      materials: 'Beryllium Vapor Drivers, Magnesium Yokes, Calfskin Pads',
      scale: '410g Ergonomic Reference Over-Ear',
      narrative: 'Ultra-linear planar acoustic transducers tuned to the Harman neutral baseline. Features open-back laser-etched hexagonal diffraction grilles for zero back-wave cancellation.',
      artClass: 'hardware-art-2'
    },
    6: {
      idx: 'SPECIFICATION // 06',
      title: 'Basel Variable Type Engine',
      category: 'Digital Systems',
      year: '2025',
      client: 'Swiss Typographic Foundry',
      materials: 'OpenType Variable Font Binaries, Python FontTools, WebGL Renderer',
      scale: '9 Axes of Modulation (Weight, Width, Slant, Optical Size)',
      narrative: 'A modernist parametric sans-serif typeface spanning ultra-light condensed to black extended. Automatically optimizes stem thickness for low-dpi and retina displays.',
      artClass: 'digital-art-2'
    }
  };

  // 1. Archive Filtering & View Layout Switcher
  const filterTabs = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectContainer = document.getElementById('projectContainer');
  const viewGridBtn = document.getElementById('viewGridBtn');
  const viewListBtn = document.getElementById('viewListBtn');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      projectCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  viewGridBtn.addEventListener('click', () => {
    viewGridBtn.classList.add('active');
    viewListBtn.classList.remove('active');
    projectContainer.classList.remove('list-view');
  });

  viewListBtn.addEventListener('click', () => {
    viewListBtn.classList.add('active');
    viewGridBtn.classList.remove('active');
    projectContainer.classList.add('list-view');
  });

  // 2. Tolerance Comparator (CAD vs Render)
  const comparatorBox = document.getElementById('comparatorBox');
  const cadLayer = document.getElementById('cadLayer');
  const compHandle = document.getElementById('compHandle');
  let isDraggingComparator = false;

  const setComparatorPosition = (clientX) => {
    const rect = comparatorBox.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    cadLayer.style.width = `${percentage}%`;
    compHandle.style.left = `${percentage}%`;
  };

  comparatorBox.addEventListener('mousedown', (e) => {
    isDraggingComparator = true;
    setComparatorPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingComparator) return;
    setComparatorPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDraggingComparator = false;
  });

  // Touch Support
  comparatorBox.addEventListener('touchstart', (e) => {
    isDraggingComparator = true;
    if (e.touches[0]) setComparatorPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDraggingComparator || !e.touches[0]) return;
    setComparatorPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDraggingComparator = false;
  });

  // 3. Fee & Timeline Estimator
  const servicePills = document.querySelectorAll('.pill-btn');
  const protoPills = document.querySelectorAll('.pill-btn-proto');
  const speedRange = document.getElementById('speedRange');
  const speedReadout = document.getElementById('speedReadout');
  const totalEstimateDisplay = document.getElementById('totalEstimateDisplay');
  const summaryService = document.getElementById('summaryService');
  const summaryProto = document.getElementById('summaryProto');
  const summaryTimeline = document.getElementById('summaryTimeline');
  const btnBookCommission = document.getElementById('btnBookCommission');

  let baseRate = 24000;
  let baseWeeks = 8;
  let serviceName = 'Spatial Architecture';
  let protoCost = 0;
  let protoName = 'Virtual Simulation ($0)';
  let speedMultiplier = 1.0;

  const recalculateFee = () => {
    const adjustedRate = (baseRate + protoCost) * (speedMultiplier >= 1.25 ? 1.2 : (speedMultiplier <= 0.75 ? 1.35 : 1.0));
    const adjustedWeeks = Math.max(3, Math.round(baseWeeks * speedMultiplier));

    totalEstimateDisplay.textContent = `$${Math.round(adjustedRate).toLocaleString()}`;
    summaryService.textContent = serviceName;
    summaryProto.textContent = protoName;
    summaryTimeline.textContent = `${adjustedWeeks} Weeks`;

    if (speedMultiplier <= 0.75) {
      speedReadout.textContent = 'Aggressive (+35% Rush Fee)';
    } else if (speedMultiplier >= 1.25) {
      speedReadout.textContent = 'Comprehensive Exploration (+20% Multiplier)';
    } else {
      speedReadout.textContent = 'Standard Cadence (1.0x)';
    }
  };

  servicePills.forEach((btn) => {
    btn.addEventListener('click', () => {
      servicePills.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      baseRate = parseInt(btn.dataset.rate, 10);
      baseWeeks = parseInt(btn.dataset.weeks, 10);
      serviceName = btn.dataset.service;
      recalculateFee();
    });
  });

  protoPills.forEach((btn) => {
    btn.addEventListener('click', () => {
      protoPills.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      protoCost = parseInt(btn.dataset.cost, 10);
      protoName = btn.textContent;
      recalculateFee();
    });
  });

  speedRange.addEventListener('input', (e) => {
    speedMultiplier = parseFloat(e.target.value);
    recalculateFee();
  });

  btnBookCommission.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    const briefArea = document.getElementById('clientBrief');
    briefArea.value = `[Inquiry via Fee Estimator]\nService: ${serviceName}\nScope: ${protoName}\nTarget Timeline: ${summaryTimeline.textContent}\nEstimated Budget Horizon: ${totalEstimateDisplay.textContent}\n\nProject Scope Details: `;
    briefArea.focus();
  });

  // 4. Case Study Specification Drawer
  const inspectButtons = document.querySelectorAll('.btn-inspect');
  const detailDrawer = document.getElementById('detailDrawer');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerIdx = document.getElementById('drawerIdx');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerArtBox = document.getElementById('drawerArtBox');
  const specYear = document.getElementById('specYear');
  const specClient = document.getElementById('specClient');
  const specMaterials = document.getElementById('specMaterials');
  const specScale = document.getElementById('specScale');
  const specNarrative = document.getElementById('specNarrative');
  const btnDownloadSpec = document.getElementById('btnDownloadSpec');

  const openDrawer = (projectId) => {
    const p = projectDatabase[projectId];
    if (!p) return;

    drawerIdx.textContent = p.idx;
    drawerTitle.textContent = p.title;
    specYear.textContent = p.year;
    specClient.textContent = p.client;
    specMaterials.textContent = p.materials;
    specScale.textContent = p.scale;
    specNarrative.textContent = p.narrative;

    drawerArtBox.className = `drawer-art-box ${p.artClass}`;

    detailDrawer.classList.add('open');
    modalBackdrop.classList.add('open');
    detailDrawer.setAttribute('aria-hidden', 'false');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    detailDrawer.classList.remove('open');
    modalBackdrop.classList.remove('open');
    detailDrawer.setAttribute('aria-hidden', 'true');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  inspectButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.project;
      openDrawer(pid);
    });
  });

  drawerCloseBtn.addEventListener('click', closeDrawer);
  modalBackdrop.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  btnDownloadSpec.addEventListener('click', () => {
    showSwissToast('Full CAD package & spec sheet generated');
  });

  // 5. Inquiries Form & Toast Feedback
  const inquiryForm = document.getElementById('inquiryForm');
  const btnSubmitForm = document.getElementById('btnSubmitForm');
  const swissToast = document.getElementById('swissToast');
  let toastTimer = null;

  const showSwissToast = (msg) => {
    swissToast.textContent = msg;
    swissToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      swissToast.classList.remove('show');
    }, 3200);
  };

  btnSubmitForm.addEventListener('click', () => {
    const name = document.getElementById('clientName').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const brief = document.getElementById('clientBrief').value.trim();

    if (!name || !email || !brief) {
      showSwissToast('Please populate all required brief parameters');
      return;
    }

    showSwissToast(`Brief received from ${name}. We will review in 24h.`);
    inquiryForm.reset();
  });

  // 6. Return to Top
  const btnBackToTop = document.getElementById('btnBackToTop');
  btnBackToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initialize
  recalculateFee();
});

