/* ═══════════════════════════════════════════════════════════
   PROFESSIONAL NEEDLE COVERAGE CALCULATOR
   Complex Databases & Calculation Engine
   Poli International
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   NEEDLE COVERAGE RATE DATABASE
   Coverage rates in square inches per hour
   ═══════════════════════════════════════════════════════════ */

const NEEDLE_COVERAGE_RATES = {
    // ROUND LINERS
    '1RL': {
        type: 'liner',
        name: 'Single Needle',
        needles: 1,
        width_mm: 0.35,
        coverage_rate: {
            slow: 0.5,
            medium: 1.0,
            fast: 1.5
        },
        best_for: 'Micro details, tiny lines, delicate work',
        typical_use: 'Single needle tattoos, micro-realism',
        passes_required: 2,
        ink_efficiency: 'low'
    },
    '3RL': {
        type: 'liner',
        name: '3 Round Liner',
        needles: 3,
        width_mm: 0.8,
        coverage_rate: {
            slow: 1.5,
            medium: 3.0,
            fast: 4.5
        },
        best_for: 'Fine lines, detailed work, small text',
        typical_use: 'Fine line tattoos, script, delicate outlines',
        passes_required: 1,
        ink_efficiency: 'medium'
    },
    '5RL': {
        type: 'liner',
        name: '5 Round Liner',
        needles: 5,
        width_mm: 1.2,
        coverage_rate: {
            slow: 2.5,
            medium: 5.0,
            fast: 7.5
        },
        best_for: 'Standard outlines, most line work',
        typical_use: 'General outlining, medium lines',
        passes_required: 1,
        ink_efficiency: 'medium'
    },
    '7RL': {
        type: 'liner',
        name: '7 Round Liner',
        needles: 7,
        width_mm: 1.6,
        coverage_rate: {
            slow: 3.5,
            medium: 7.0,
            fast: 10.5
        },
        best_for: 'Medium to bold lines',
        typical_use: 'Traditional outlines, bold work',
        passes_required: 1,
        ink_efficiency: 'good'
    },
    '9RL': {
        type: 'liner',
        name: '9 Round Liner',
        needles: 9,
        width_mm: 2.0,
        coverage_rate: {
            slow: 4.0,
            medium: 8.0,
            fast: 12.0
        },
        best_for: 'Bold outlines, traditional work',
        typical_use: 'Bold traditional, thick lines',
        passes_required: 1,
        ink_efficiency: 'good'
    },

    // ROUND SHADERS
    '5RS': {
        type: 'shader',
        name: '5 Round Shader',
        needles: 5,
        width_mm: 1.5,
        coverage_rate: {
            slow: 3.0,
            medium: 6.0,
            fast: 9.0
        },
        best_for: 'Light shading, gradients',
        typical_use: 'Soft shading, black & grey',
        passes_required: 3,
        ink_efficiency: 'medium'
    },
    '7RS': {
        type: 'shader',
        name: '7 Round Shader',
        needles: 7,
        width_mm: 2.0,
        coverage_rate: {
            slow: 4.0,
            medium: 8.0,
            fast: 12.0
        },
        best_for: 'Medium shading, versatile',
        typical_use: 'General shading work',
        passes_required: 2,
        ink_efficiency: 'good'
    },
    '9RS': {
        type: 'shader',
        name: '9 Round Shader',
        needles: 9,
        width_mm: 2.5,
        coverage_rate: {
            slow: 5.0,
            medium: 10.0,
            fast: 15.0
        },
        best_for: 'Heavy shading, large areas',
        typical_use: 'Bold shading, solid work',
        passes_required: 2,
        ink_efficiency: 'good'
    },

    // MAGNUMS
    '7M1': {
        type: 'magnum',
        name: '7 Magnum',
        needles: 7,
        width_mm: 8.0,
        coverage_rate: {
            slow: 8.0,
            medium: 16.0,
            fast: 24.0
        },
        best_for: 'Soft shading, color blending',
        typical_use: 'Smooth gradients, soft color',
        passes_required: 3,
        ink_efficiency: 'excellent'
    },
    '9M1': {
        type: 'magnum',
        name: '9 Magnum',
        needles: 9,
        width_mm: 10.0,
        coverage_rate: {
            slow: 10.0,
            medium: 20.0,
            fast: 30.0
        },
        best_for: 'Shading, color work, coverage',
        typical_use: 'Most common shading needle - industry workhorse',
        passes_required: 2,
        ink_efficiency: 'excellent'
    },
    '11M1': {
        type: 'magnum',
        name: '11 Magnum',
        needles: 11,
        width_mm: 12.0,
        coverage_rate: {
            slow: 12.0,
            medium: 24.0,
            fast: 36.0
        },
        best_for: 'Faster coverage, larger areas',
        typical_use: 'Large shading areas, backgrounds',
        passes_required: 2,
        ink_efficiency: 'excellent'
    },
    '13M1': {
        type: 'magnum',
        name: '13 Magnum',
        needles: 13,
        width_mm: 14.0,
        coverage_rate: {
            slow: 14.0,
            medium: 28.0,
            fast: 42.0
        },
        best_for: 'Large area coverage',
        typical_use: 'Backgrounds, large shading',
        passes_required: 2,
        ink_efficiency: 'excellent'
    },
    '15M2': {
        type: 'magnum',
        name: '15 Magnum Stacked',
        needles: 15,
        width_mm: 16.0,
        coverage_rate: {
            slow: 16.0,
            medium: 32.0,
            fast: 48.0
        },
        best_for: 'Maximum coverage, solid color',
        typical_use: 'Large solid areas, color packing',
        passes_required: 2,
        ink_efficiency: 'maximum'
    },
    '18M2': {
        type: 'magnum',
        name: '18 Magnum Stacked',
        needles: 18,
        width_mm: 18.0,
        coverage_rate: {
            slow: 18.0,
            medium: 36.0,
            fast: 54.0
        },
        best_for: 'Maximum coverage, sleeves, backs',
        typical_use: 'Large pieces, fast coverage',
        passes_required: 2,
        ink_efficiency: 'maximum'
    },

    // CURVED MAGNUMS
    '9CM': {
        type: 'curved_magnum',
        name: '9 Curved Magnum',
        needles: 9,
        width_mm: 10.0,
        coverage_rate: {
            slow: 9.0,
            medium: 18.0,
            fast: 27.0
        },
        best_for: 'Smooth color transitions, soft shading',
        typical_use: 'Realism, smooth gradients',
        passes_required: 3,
        ink_efficiency: 'excellent'
    },
    '11CM': {
        type: 'curved_magnum',
        name: '11 Curved Magnum',
        needles: 11,
        width_mm: 12.0,
        coverage_rate: {
            slow: 11.0,
            medium: 22.0,
            fast: 33.0
        },
        best_for: 'Realism work, smooth coverage',
        typical_use: 'Portrait work, smooth shading',
        passes_required: 2,
        ink_efficiency: 'excellent'
    },
    '13CM': {
        type: 'curved_magnum',
        name: '13 Curved Magnum',
        needles: 13,
        width_mm: 14.0,
        coverage_rate: {
            slow: 13.0,
            medium: 26.0,
            fast: 39.0
        },
        best_for: 'Large smooth areas',
        typical_use: 'Realism backgrounds, smooth color',
        passes_required: 2,
        ink_efficiency: 'excellent'
    }
};

/* ═══════════════════════════════════════════════════════════
   BODY LOCATION DIFFICULTY DATABASE
   Time multipliers and characteristics
   ═══════════════════════════════════════════════════════════ */

const BODY_LOCATION_FACTORS = {
    'outer-upper-arm': {
        difficulty: 'easy',
        name: 'Outer Upper Arm',
        time_multiplier: 1.0,
        pain_level: 'low',
        typical_session: 4.0,
        break_frequency: 'minimal',
        notes: 'Ideal location - great skin, easy positioning'
    },
    'outer-forearm': {
        difficulty: 'easy',
        name: 'Outer Forearm',
        time_multiplier: 1.0,
        pain_level: 'low',
        typical_session: 4.0,
        break_frequency: 'minimal',
        notes: 'Popular location, easy to work on'
    },
    'outer-calf': {
        difficulty: 'easy',
        name: 'Outer Calf',
        time_multiplier: 1.1,
        pain_level: 'low',
        typical_session: 3.5,
        break_frequency: 'minimal',
        notes: 'Good skin quality, comfortable for client'
    },
    'shoulder': {
        difficulty: 'easy',
        name: 'Shoulder',
        time_multiplier: 1.1,
        pain_level: 'low-medium',
        typical_session: 3.5,
        break_frequency: 'minimal',
        notes: 'Comfortable area, curved surface'
    },
    'upper-back': {
        difficulty: 'medium',
        name: 'Upper Back',
        time_multiplier: 1.3,
        pain_level: 'medium',
        typical_session: 3.0,
        break_frequency: 'moderate',
        notes: 'Requires position changes, large flat area'
    },
    'chest': {
        difficulty: 'medium',
        name: 'Chest',
        time_multiplier: 1.4,
        pain_level: 'medium-high',
        typical_session: 2.5,
        break_frequency: 'frequent',
        notes: 'More painful near sternum, challenging area'
    },
    'thigh': {
        difficulty: 'medium',
        name: 'Thigh',
        time_multiplier: 1.3,
        pain_level: 'medium',
        typical_session: 3.0,
        break_frequency: 'moderate',
        notes: 'Large area, comfortable positioning'
    },
    'inner-forearm': {
        difficulty: 'medium',
        name: 'Inner Forearm',
        time_multiplier: 1.4,
        pain_level: 'medium-high',
        typical_session: 2.5,
        break_frequency: 'frequent',
        notes: 'More sensitive than outer, thinner skin'
    },
    'lower-back': {
        difficulty: 'medium',
        name: 'Lower Back',
        time_multiplier: 1.4,
        pain_level: 'medium-high',
        typical_session: 2.5,
        break_frequency: 'frequent',
        notes: 'Can be uncomfortable, positioning challenges'
    },
    'ribs': {
        difficulty: 'difficult',
        name: 'Ribs',
        time_multiplier: 2.0,
        pain_level: 'very-high',
        typical_session: 2.0,
        break_frequency: 'very-frequent',
        notes: 'Extremely painful, skin moves with breathing'
    },
    'neck': {
        difficulty: 'difficult',
        name: 'Neck',
        time_multiplier: 1.8,
        pain_level: 'high',
        typical_session: 2.0,
        break_frequency: 'very-frequent',
        notes: 'Sensitive, client anxiety common, thin skin'
    },
    'hands': {
        difficulty: 'difficult',
        name: 'Hands',
        time_multiplier: 2.2,
        pain_level: 'very-high',
        typical_session: 1.5,
        break_frequency: 'constant',
        notes: 'Very painful, thin skin, many nerve endings'
    },
    'feet': {
        difficulty: 'difficult',
        name: 'Feet',
        time_multiplier: 2.3,
        pain_level: 'extreme',
        typical_session: 1.5,
        break_frequency: 'constant',
        notes: 'Extremely painful, difficult healing, fading common'
    },
    'spine': {
        difficulty: 'difficult',
        name: 'Spine',
        time_multiplier: 2.0,
        pain_level: 'very-high',
        typical_session: 1.5,
        break_frequency: 'very-frequent',
        notes: 'Extremely painful over vertebrae, vibrations intense'
    },
    'elbow-ditch': {
        difficulty: 'difficult',
        name: 'Elbow Ditch',
        time_multiplier: 2.5,
        pain_level: 'extreme',
        typical_session: 1.0,
        break_frequency: 'constant',
        notes: 'One of most painful locations, very challenging'
    },
    'knee-ditch': {
        difficulty: 'difficult',
        name: 'Knee Ditch',
        time_multiplier: 2.5,
        pain_level: 'extreme',
        typical_session: 1.0,
        break_frequency: 'constant',
        notes: 'Extremely painful, very challenging skin'
    }
};

/* ═══════════════════════════════════════════════════════════
   COMPLEXITY FACTORS DATABASE
   Design complexity multipliers
   ═══════════════════════════════════════════════════════════ */

const COMPLEXITY_FACTORS = {
    'simple-bold': {
        name: 'Simple Bold',
        time_multiplier: 1.0,
        price_multiplier: 0.9,
        passes_required: 1,
        description: 'Bold lines, minimal shading, traditional style'
    },
    'medium-detail': {
        name: 'Medium Detail',
        time_multiplier: 1.5,
        price_multiplier: 1.0,
        passes_required: 2,
        description: 'Moderate detail, standard shading'
    },
    'high-detail': {
        name: 'High Detail',
        time_multiplier: 2.0,
        price_multiplier: 1.2,
        passes_required: 3,
        description: 'Intricate details, careful shading'
    },
    'photorealistic': {
        name: 'Photorealistic',
        time_multiplier: 3.0,
        price_multiplier: 1.5,
        passes_required: 5,
        description: 'Extreme detail, multiple layers, precise gradients'
    },
    'micro-detail': {
        name: 'Micro Detail',
        time_multiplier: 4.0,
        price_multiplier: 1.8,
        passes_required: 2,
        description: 'Tiny intricate work, single needle'
    }
};

/* ═══════════════════════════════════════════════════════════
   INK CONSUMPTION DATABASE
   ML per square inch rates
   ═══════════════════════════════════════════════════════════ */

const INK_CONSUMPTION_RATES = {
    'lining': {
        ink_per_sqinch: 0.05,
        waste_factor_base: 1.3,
        caps_per_session: 2,
        name: 'Lining'
    },
    'light-shading': {
        ink_per_sqinch: 0.15,
        waste_factor_base: 1.4,
        caps_per_session: 3,
        name: 'Light Shading'
    },
    'medium-shading': {
        ink_per_sqinch: 0.25,
        waste_factor_base: 1.4,
        caps_per_session: 4,
        name: 'Medium Shading'
    },
    'solid-black': {
        ink_per_sqinch: 0.5,
        waste_factor_base: 1.3,
        caps_per_session: 5,
        name: 'Solid Black'
    },
    'color-packing': {
        ink_per_sqinch: 0.4,
        waste_factor_base: 1.5,
        caps_per_session: 6,
        name: 'Color Packing'
    },
    'color-blending': {
        ink_per_sqinch: 0.3,
        waste_factor_base: 1.6,
        caps_per_session: 8,
        name: 'Color Blending'
    }
};

/* ═══════════════════════════════════════════════════════════
   WASTE FACTOR MULTIPLIERS
   ═══════════════════════════════════════════════════════════ */

const WASTE_FACTORS = {
    'low': 1.2,
    'medium': 1.4,
    'high': 1.6
};

/* ═══════════════════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();

    // Initialize tab navigation
    initializeTabs();

    // Initialize form handlers
    initializeForms();

    // Initialize modal
    initializeModal();

    // Initialize email forms
    initializeEmailForms();

    console.log('Coverage Calculator initialized successfully');
});

/* ═══════════════════════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════════════════════ */

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('coverage-calculator-theme');

    // Apply saved theme or default to dark
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('coverage-calculator-theme', isLight ? 'light' : 'dark');
    });
}

/* ═══════════════════════════════════════════════════════════
   TAB NAVIGATION
   ═══════════════════════════════════════════════════════════ */

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.coverage__tab');
    const tabPanels = document.querySelectorAll('.coverage__panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs
            tabButtons.forEach(btn => {
                btn.classList.remove('coverage__tab--active');
                btn.setAttribute('aria-selected', 'false');
            });

            // Remove active class from all panels
            tabPanels.forEach(panel => {
                panel.classList.remove('coverage__panel--active');
            });

            // Add active class to clicked tab
            this.classList.add('coverage__tab--active');
            this.setAttribute('aria-selected', 'true');

            // Show target panel
            const targetPanel = document.getElementById(targetTab + '-panel');
            if (targetPanel) {
                targetPanel.classList.add('coverage__panel--active');
            }
        });
    });
}

/* ═══════════════════════════════════════════════════════════
   FORM INITIALIZATION
   ═══════════════════════════════════════════════════════════ */

function initializeForms() {
    // Coverage Calculator Form
    const coverageForm = document.getElementById('coverage-form');
    if (coverageForm) {
        coverageForm.addEventListener('submit', handleCoverageCalculation);
    }

    // Session Time Estimator Form
    const sessionForm = document.getElementById('session-form');
    if (sessionForm) {
        sessionForm.addEventListener('submit', handleSessionCalculation);
    }

    // Ink Consumption Calculator Form
    const inkForm = document.getElementById('ink-form');
    if (inkForm) {
        inkForm.addEventListener('submit', handleInkCalculation);
    }

    // Pricing Calculator Form
    const pricingForm = document.getElementById('pricing-form');
    if (pricingForm) {
        pricingForm.addEventListener('submit', handlePricingCalculation);
    }
}

/* ═══════════════════════════════════════════════════════════
   COVERAGE CALCULATOR
   ═══════════════════════════════════════════════════════════ */

function handleCoverageCalculation(e) {
    e.preventDefault();

    // Get form values
    const needleConfig = document.getElementById('needle-config').value;
    const technique = document.getElementById('technique').value;
    const workSpeed = document.getElementById('work-speed').value;
    const sessionHours = parseFloat(document.getElementById('session-hours').value);
    const breakTime = parseFloat(document.getElementById('break-time').value);
    const passes = parseInt(document.getElementById('passes').value);

    // Get needle data
    const needleData = NEEDLE_COVERAGE_RATES[needleConfig];
    if (!needleData) {
        alert('Please select a needle configuration');
        return;
    }

    // Calculate effective working time (subtract breaks)
    const breakHours = (breakTime / 60) * sessionHours;
    const effectiveHours = sessionHours - breakHours;

    // Get base coverage rate
    const baseCoverageRate = needleData.coverage_rate[workSpeed];

    // Calculate total coverage
    const totalCoverage = baseCoverageRate * effectiveHours;

    // Adjust for passes (more passes = less effective coverage)
    const adjustedCoverage = totalCoverage / passes;

    // Convert to square centimeters
    const coverageMetric = adjustedCoverage * 6.4516;

    // Display results
    displayCoverageResults({
        totalCoverage: adjustedCoverage,
        coverageMetric: coverageMetric,
        workingTime: effectiveHours,
        coverageRate: baseCoverageRate,
        needleData: needleData,
        passes: passes,
        technique: technique
    });
}

function displayCoverageResults(data) {
    const resultsDiv = document.getElementById('coverage-results');

    // Show results
    resultsDiv.style.display = 'block';

    // Update values
    document.getElementById('coverage-total').textContent = data.totalCoverage.toFixed(1);
    document.getElementById('coverage-metric').textContent = data.coverageMetric.toFixed(1);
    document.getElementById('coverage-worktime').textContent = data.workingTime.toFixed(1) + ' hrs';
    document.getElementById('coverage-rate').textContent = data.coverageRate.toFixed(1);

    // Set status badge
    const statusBadge = document.getElementById('coverage-status');
    statusBadge.textContent = '✓ Calculation Complete';
    statusBadge.className = 'coverage__status-badge coverage__status-badge--optimal';

    // Create comparison (A-paper sizes + credit card)
    const comparisonDiv = document.getElementById('coverage-comparison');
    comparisonDiv.innerHTML = `
        <h4>Size Comparison</h4>
        <ul>
            <li>
                <span>Approximately</span>
                <strong>${(data.totalCoverage / 48.15).toFixed(2)}× A5 paper</strong>
                <small>(148mm × 210mm / 5.8" × 8.3")</small>
            </li>
            <li>
                <span>Or about</span>
                <strong>${(data.totalCoverage / 97.09).toFixed(2)}× A4 paper</strong>
                <small>(210mm × 297mm / 8.3" × 11.7")</small>
            </li>
            <li>
                <span>Or</span>
                <strong>${(data.totalCoverage / 193.05).toFixed(2)}× A3 paper</strong>
                <small>(297mm × 420mm / 11.7" × 16.5")</small>
            </li>
            <li>
                <span>About</span>
                <strong>${(data.totalCoverage / 7.17).toFixed(1)}× credit cards</strong>
                <small>(85.6mm × 54mm / 3.375" × 2.125")</small>
            </li>
        </ul>
    `;

    // Create notes
    const notesDiv = document.getElementById('coverage-notes');
    notesDiv.innerHTML = `
        <h4>Needle Information</h4>
        <ul>
            <li>
                <span>Needle Type:</span>
                <strong>${data.needleData.name}</strong>
            </li>
            <li>
                <span>Best For:</span>
                <strong>${data.needleData.best_for}</strong>
            </li>
            <li>
                <span>Passes Required:</span>
                <strong>${data.passes} (${data.passes > data.needleData.passes_required ? 'more than typical' : 'standard'})</strong>
            </li>
            <li>
                <span>Ink Efficiency:</span>
                <strong>${data.needleData.ink_efficiency}</strong>
            </li>
        </ul>
    `;

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ═══════════════════════════════════════════════════════════
   SESSION TIME ESTIMATOR
   ═══════════════════════════════════════════════════════════ */

function handleSessionCalculation(e) {
    e.preventDefault();

    // Get form values
    const width = parseFloat(document.getElementById('tattoo-width').value);
    const height = parseFloat(document.getElementById('tattoo-height').value);
    const complexity = document.getElementById('complexity').value;
    const colorWork = document.getElementById('color-work').value;
    const bodyLocation = document.getElementById('body-location').value;
    const painTolerance = document.getElementById('pain-tolerance').value;

    // Calculate total area
    const totalArea = width * height;

    // Get complexity factor
    const complexityData = COMPLEXITY_FACTORS[complexity];

    // Get body location factor
    const locationData = BODY_LOCATION_FACTORS[bodyLocation];

    // Base time calculation (assuming medium speed with 9M1 needle)
    const baseNeedleRate = 20; // sq in per hour for 9M1 medium speed
    let baseTime = totalArea / baseNeedleRate;

    // Apply complexity multiplier
    baseTime *= complexityData.time_multiplier;

    // Apply body location multiplier
    baseTime *= locationData.time_multiplier;

    // Apply color work adjustment
    const colorMultiplier = {
        'blackgrey': 1.0,
        'limited-color': 1.3,
        'full-color': 1.6
    };
    baseTime *= colorMultiplier[colorWork];

    // Apply pain tolerance (affects breaks needed)
    const toleranceMultiplier = {
        'high': 1.0,
        'medium': 1.15,
        'low': 1.3
    };
    baseTime *= toleranceMultiplier[painTolerance];

    // Add buffer for setup, cleanup, unexpected challenges (15%)
    const totalTime = baseTime * 1.15;

    // Calculate number of sessions based on typical session length for location
    const maxSessionLength = locationData.typical_session;
    const sessionsNeeded = Math.ceil(totalTime / maxSessionLength);
    const hoursPerSession = totalTime / sessionsNeeded;

    // Calculate timeline (assume weekly sessions)
    const timelineWeeks = sessionsNeeded;

    // Determine if estimate is realistic
    let status = 'optimal';
    if (totalTime > 50) {
        status = 'ambitious'; // Very large project
    }
    if (hoursPerSession > maxSessionLength * 1.5) {
        status = 'unrealistic'; // Sessions too long
    }

    // Display results
    displaySessionResults({
        totalTime: totalTime,
        sessionsNeeded: sessionsNeeded,
        hoursPerSession: hoursPerSession,
        timelineWeeks: timelineWeeks,
        locationData: locationData,
        complexityData: complexityData,
        totalArea: totalArea,
        status: status
    });
}

function displaySessionResults(data) {
    const resultsDiv = document.getElementById('session-results');

    // Show results
    resultsDiv.style.display = 'block';

    // Update values
    document.getElementById('session-total-time').textContent = data.totalTime.toFixed(1) + ' hrs';
    document.getElementById('session-count').textContent = data.sessionsNeeded;
    document.getElementById('session-per-session').textContent = data.hoursPerSession.toFixed(1) + ' hrs';
    document.getElementById('session-timeline').textContent = data.timelineWeeks + ' weeks';

    // Set status badge
    const statusBadge = document.getElementById('session-status');
    if (data.status === 'optimal') {
        statusBadge.textContent = '✓ Achievable Timeline';
        statusBadge.className = 'coverage__status-badge coverage__status-badge--optimal';
    } else if (data.status === 'ambitious') {
        statusBadge.textContent = '⚠ Ambitious Project';
        statusBadge.className = 'coverage__status-badge coverage__status-badge--ambitious';
    } else {
        statusBadge.textContent = '⚠️ Adjust Expectations';
        statusBadge.className = 'coverage__status-badge coverage__status-badge--unrealistic';
    }

    // Create session breakdown
    const breakdownDiv = document.getElementById('session-breakdown');
    let breakdownHTML = '<h4>Session Breakdown</h4><ul>';

    if (data.sessionsNeeded === 1) {
        breakdownHTML += `<li><span>Single Session:</span><strong>${data.hoursPerSession.toFixed(1)} hours total</strong></li>`;
    } else {
        for (let i = 1; i <= data.sessionsNeeded; i++) {
            const sessionType = i === 1 ? 'Outline' : (i === data.sessionsNeeded ? 'Details/Touch-ups' : 'Shading/Color');
            breakdownHTML += `<li><span>Session ${i} (${sessionType}):</span><strong>${data.hoursPerSession.toFixed(1)} hours</strong></li>`;
        }
    }

    breakdownHTML += '</ul>';
    breakdownDiv.innerHTML = breakdownHTML;

    // Create location notes
    const notesDiv = document.getElementById('session-location-notes');
    notesDiv.innerHTML = `
        <h4>Location Considerations</h4>
        <ul>
            <li>
                <span>Body Location:</span>
                <strong>${data.locationData.name}</strong>
            </li>
            <li>
                <span>Pain Level:</span>
                <strong>${data.locationData.pain_level} (${data.locationData.break_frequency} breaks)</strong>
            </li>
            <li>
                <span>Typical Session:</span>
                <strong>${data.locationData.typical_session} hours max recommended</strong>
            </li>
            <li>
                <span>Notes:</span>
                <strong>${data.locationData.notes}</strong>
            </li>
        </ul>
    `;

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ═══════════════════════════════════════════════════════════
   INK CONSUMPTION CALCULATOR
   ═══════════════════════════════════════════════════════════ */

function handleInkCalculation(e) {
    e.preventDefault();

    // Get form values
    const area = parseFloat(document.getElementById('ink-area').value);
    const technique = document.getElementById('ink-technique').value;
    const saturation = document.getElementById('saturation').value;
    const colorCount = parseInt(document.getElementById('color-count').value);
    const passes = parseInt(document.getElementById('ink-passes').value);
    const wasteFactor = document.getElementById('waste-factor').value;

    // Get technique data
    const techniqueData = INK_CONSUMPTION_RATES[technique];

    // Calculate base ink needed
    const baseInk = area * techniqueData.ink_per_sqinch;

    // Apply saturation adjustment
    const saturationMultiplier = {
        'light': 0.7,
        'medium': 1.0,
        'heavy': 1.4
    };
    const adjustedInk = baseInk * saturationMultiplier[saturation];

    // Apply passes
    const inkWithPasses = adjustedInk * passes;

    // Apply waste factor
    const wasteMultiplier = WASTE_FACTORS[wasteFactor];
    const totalInk = inkWithPasses * wasteMultiplier;

    // Calculate per color
    const inkPerColor = totalInk / colorCount;

    // Calculate caps needed (5ml per cap)
    const capsNeeded = Math.ceil(totalInk / 5);

    // Calculate cost estimate ($0.50 per ml average)
    const costEstimate = totalInk * 0.50;

    // Display results
    displayInkResults({
        totalInk: totalInk,
        inkPerColor: inkPerColor,
        capsNeeded: capsNeeded,
        costEstimate: costEstimate,
        techniqueData: techniqueData,
        colorCount: colorCount,
        passes: passes,
        area: area
    });
}

function displayInkResults(data) {
    const resultsDiv = document.getElementById('ink-results');

    // Show results
    resultsDiv.style.display = 'block';

    // Update values
    document.getElementById('ink-total').textContent = data.totalInk.toFixed(1) + ' ml';
    document.getElementById('ink-per-color').textContent = data.inkPerColor.toFixed(1) + ' ml';
    document.getElementById('ink-caps').textContent = data.capsNeeded;
    document.getElementById('ink-cost').textContent = '$' + data.costEstimate.toFixed(2);

    // Create breakdown
    const breakdownDiv = document.getElementById('ink-breakdown');
    breakdownDiv.innerHTML = `
        <h4>Consumption Breakdown</h4>
        <ul>
            <li>
                <span>Coverage Area:</span>
                <strong>${data.area} square inches</strong>
            </li>
            <li>
                <span>Technique:</span>
                <strong>${data.techniqueData.name}</strong>
            </li>
            <li>
                <span>Number of Colors:</span>
                <strong>${data.colorCount}</strong>
            </li>
            <li>
                <span>Passes:</span>
                <strong>${data.passes}</strong>
            </li>
            <li>
                <span>Ink per sq inch:</span>
                <strong>${(data.totalInk / data.area).toFixed(2)} ml</strong>
            </li>
            <li>
                <span>Recommend ordering:</span>
                <strong>${Math.ceil(data.totalInk / 30)} × 30ml bottles</strong>
            </li>
        </ul>
    `;

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ═══════════════════════════════════════════════════════════
   PRICING CALCULATOR
   ═══════════════════════════════════════════════════════════ */

function handlePricingCalculation(e) {
    e.preventDefault();

    // Get form values
    const hours = parseFloat(document.getElementById('pricing-hours').value);
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value);
    const complexity = document.getElementById('pricing-complexity').value;
    const area = parseFloat(document.getElementById('pricing-area').value);
    const depositPercent = parseFloat(document.getElementById('deposit-percent').value);
    const sessions = parseInt(document.getElementById('pricing-sessions').value);

    // Get complexity factor
    const complexityData = COMPLEXITY_FACTORS[complexity];

    // Calculate base price
    const basePrice = hours * hourlyRate;

    // Apply complexity adjustment
    const adjustedPrice = basePrice * complexityData.price_multiplier;

    // Calculate price range (±15%)
    const priceMin = adjustedPrice * 0.85;
    const priceMax = adjustedPrice * 1.15;

    // Calculate deposit
    const deposit = adjustedPrice * (depositPercent / 100);

    // Calculate per square inch
    const perSqInch = adjustedPrice / area;

    // Calculate per session
    const perSession = adjustedPrice / sessions;

    // Determine pricing status
    let status = 'optimal';
    if (perSqInch < 5) {
        status = 'underpriced';
    } else if (perSqInch > 30) {
        status = 'premium';
    }

    // Display results
    displayPricingResults({
        suggestedPrice: adjustedPrice,
        priceMin: priceMin,
        priceMax: priceMax,
        deposit: deposit,
        perSqInch: perSqInch,
        perSession: perSession,
        hours: hours,
        hourlyRate: hourlyRate,
        sessions: sessions,
        status: status,
        complexityData: complexityData
    });
}

function displayPricingResults(data) {
    const resultsDiv = document.getElementById('pricing-results');

    // Show results
    resultsDiv.style.display = 'block';

    // Update values
    document.getElementById('pricing-suggested').textContent = '$' + data.suggestedPrice.toFixed(0);
    document.getElementById('pricing-range').textContent = '$' + data.priceMin.toFixed(0) + ' - $' + data.priceMax.toFixed(0);
    document.getElementById('pricing-deposit').textContent = '$' + data.deposit.toFixed(0);
    document.getElementById('pricing-per-sqin').textContent = '$' + data.perSqInch.toFixed(2);

    // Set status badge
    const statusBadge = document.getElementById('pricing-status');
    if (data.status === 'underpriced') {
        statusBadge.textContent = '⚠ Consider Increasing';
        statusBadge.className = 'coverage__status-badge coverage__status-badge--ambitious';
    } else if (data.status === 'premium') {
        statusBadge.textContent = '✓ Premium Pricing';
        statusBadge.className = 'coverage__status-badge coverage__status-badge--optimal';
    } else {
        statusBadge.textContent = '✓ Market Rate';
        statusBadge.className = 'coverage__status-badge coverage__status-badge--optimal';
    }

    // Create breakdown
    const breakdownDiv = document.getElementById('pricing-breakdown');
    let breakdownHTML = '<h4>Payment Breakdown</h4><ul>';

    if (data.sessions === 1) {
        breakdownHTML += `
            <li><span>Deposit (upfront):</span><strong>$${data.deposit.toFixed(0)}</strong></li>
            <li><span>Balance (at session):</span><strong>$${(data.suggestedPrice - data.deposit).toFixed(0)}</strong></li>
        `;
    } else {
        breakdownHTML += `
            <li><span>Deposit (booking):</span><strong>$${data.deposit.toFixed(0)}</strong></li>
            <li><span>Per session (${data.sessions} sessions):</span><strong>$${data.perSession.toFixed(0)}</strong></li>
            <li><span>Final session balance:</span><strong>$${(data.suggestedPrice - data.deposit - (data.perSession * (data.sessions - 1))).toFixed(0)}</strong></li>
        `;
    }

    breakdownHTML += '</ul>';
    breakdownDiv.innerHTML = breakdownHTML;

    // Create profitability notes
    const profitDiv = document.getElementById('pricing-profitability');
    profitDiv.innerHTML = `
        <h4>Profitability Analysis</h4>
        <ul>
            <li>
                <span>Effective Hourly Rate:</span>
                <strong>$${(data.suggestedPrice / data.hours).toFixed(2)}/hr</strong>
            </li>
            <li>
                <span>Complexity Adjustment:</span>
                <strong>${data.complexityData.name} (${data.complexityData.price_multiplier}x)</strong>
            </li>
            <li>
                <span>Per Square Inch:</span>
                <strong>$${data.perSqInch.toFixed(2)}/sq in</strong>
            </li>
            <li>
                <span>Market Positioning:</span>
                <strong>${data.status === 'underpriced' ? 'Below market - consider increasing' : (data.status === 'premium' ? 'Premium rate - ensure quality justifies' : 'Competitive market rate')}</strong>
            </li>
        </ul>
    `;

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ═══════════════════════════════════════════════════════════
   MODAL FUNCTIONALITY
   ═══════════════════════════════════════════════════════════ */

function initializeModal() {
    const embedButton = document.getElementById('embed-button');
    const modal = document.getElementById('embed-modal');
    const modalOverlay = modal.querySelector('.coverage__modal-overlay');
    const closeButton = modal.querySelector('.coverage__modal-close');
    const copyButton = document.getElementById('copy-embed-code');

    // Open modal
    embedButton.addEventListener('click', function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal - close button
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close modal - overlay click
    modalOverlay.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close modal - Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Copy embed code
    copyButton.addEventListener('click', function() {
        const embedCode = document.getElementById('embed-code').textContent;

        // Modern Clipboard API
        navigator.clipboard.writeText(embedCode).then(function() {
            // Show success message
            const successMsg = document.getElementById('copy-success');
            successMsg.style.display = 'block';

            // Hide after 3 seconds
            setTimeout(function() {
                successMsg.style.display = 'none';
            }, 3000);
        }).catch(function(err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy code. Please copy manually.');
        });
    });
}

/* ═══════════════════════════════════════════════════════════
   EMAIL FORM HANDLERS
   ═══════════════════════════════════════════════════════════ */

function initializeEmailForms() {
    // Footer email form
    const footerForm = document.getElementById('footer-email-form');
    if (footerForm) {
        footerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmailSubmit(this, 'footer');
        });
    }

    // Modal email form
    const modalForm = document.getElementById('modal-email-form');
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmailSubmit(this, 'modal');
        });
    }
}

function handleEmailSubmit(form, location) {
    const emailInput = form.querySelector('.coverage__email-input');
    const email = emailInput.value.trim();
    const successMsg = document.getElementById(location + '-email-success');
    const errorMsg = document.getElementById(location + '-email-error');

    // Reset messages
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMsg.style.display = 'block';
        return;
    }

    // TODO: Replace with actual email service integration (Mailchimp/ConvertKit)
    // For now, simulate successful submission
    console.log('Email submitted:', email, 'Location:', location);

    // Show success message
    successMsg.style.display = 'block';
    emailInput.value = '';

    // Hide success message after 5 seconds
    setTimeout(function() {
        successMsg.style.display = 'none';
    }, 5000);
}

/* ═══════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

function formatNumber(num, decimals = 0) {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/* ═══════════════════════════════════════════════════════════
   CONSOLE BRANDING
   ═══════════════════════════════════════════════════════════ */

console.log('%c🎨 Professional Needle Coverage Calculator', 'color: #FF006E; font-size: 18px; font-weight: bold;');
console.log('%cPowered by Poli International', 'color: #2C5F7C; font-size: 12px;');
console.log('%cFree tools for professional tattoo artists', 'color: #808080; font-size: 10px;');
