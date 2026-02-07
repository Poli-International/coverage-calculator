# Coverage Calculator - Technical Documentation

**Version:** 1.0.0
**Last Updated:** January 2025
**Maintainer:** Poli International Co.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Database Schemas](#database-schemas)
3. [Calculation Algorithms](#calculation-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization Options](#customization-options)
7. [Performance Optimization](#performance-optimization)
8. [Testing & Validation](#testing--validation)

---

## Architecture Overview

### Technology Stack

**Frontend:**
- Pure JavaScript (ES6+)
- CSS3 with Custom Properties
- HTML5 with semantic elements
- No external dependencies

**Storage:**
- localStorage for theme persistence
- No backend required
- Client-side only calculations

**Compatibility:**
- ES6+ browsers (Chrome 51+, Firefox 54+, Safari 10+, Edge 15+)
- Progressive enhancement for older browsers
- Mobile-responsive (320px minimum width)

### File Structure

```
coverage-calculator/
├── index.html              # Main standalone application
├── embed.html              # Embeddable widget version
├── css/
│   └── style.css          # Complete styling (1,059 lines)
├── js/
│   └── calculator.js      # Core logic and databases
└── assets/
    └── images/            # Logo and graphics
```

### Component Architecture

```
┌─────────────────────────────────────┐
│         User Interface              │
│  (Tab Navigation + Forms)           │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│      Calculator Engine              │
│  (Event Handlers + Validation)      │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│       Database Layer                │
│  (Needle Rates + Body Factors)      │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     Calculation Functions           │
│  (Coverage + Session + Ink + Price) │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│      Results Display                │
│  (Dynamic HTML Generation)          │
└─────────────────────────────────────┘
```

---

## Database Schemas

### Needle Coverage Rates Database

**Object:** `NEEDLE_COVERAGE_RATES`
**Total Entries:** 18 needle configurations

**Schema:**
```javascript
{
  needle_id: {
    type: string,              // 'liner' | 'shader' | 'magnum' | 'curved-magnum' | 'flat'
    name: string,              // Display name
    needles: number,           // Number of needles in configuration
    width_mm: number,          // Physical width in millimeters
    coverage_rate: {
      slow: number,            // Square inches per hour (slow/detailed work)
      medium: number,          // Square inches per hour (standard pace)
      fast: number             // Square inches per hour (fast coverage)
    },
    best_for: string,          // Usage description
    typical_use: string,       // Common applications (optional)
    passes_required: number,   // Standard number of passes
    ink_efficiency: string     // 'low' | 'medium' | 'good' | 'excellent'
  }
}
```

**Example Entry:**
```javascript
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
}
```

**Coverage Rate Calculation:**
- **Slow:** Detailed work, 40-50 passes per inch
- **Medium:** Standard work, 25-35 passes per inch
- **Fast:** Coverage work, 15-25 passes per inch

**Data Sources:**
- Professional artist surveys
- Manufacturer specifications
- Industry standard practices

---

### Body Location Factors Database

**Object:** `BODY_LOCATION_FACTORS`
**Total Entries:** 15 body locations

**Schema:**
```javascript
{
  location_id: {
    difficulty: string,        // 'easy' | 'moderate' | 'difficult'
    name: string,              // Display name
    time_multiplier: number,   // Time adjustment factor (0.8 - 2.2)
    pain_level: string,        // 'low' | 'medium' | 'high' | 'very-high'
    typical_session: number,   // Max recommended session hours
    break_frequency: string,   // 'minimal' | 'normal' | 'frequent' | 'very-frequent'
    notes: string              // Special considerations (optional)
  }
}
```

**Example Entry:**
```javascript
'ribs': {
  difficulty: 'difficult',
  name: 'Ribs',
  time_multiplier: 2.0,
  pain_level: 'very-high',
  typical_session: 2.0,
  break_frequency: 'very-frequent',
  notes: 'Extremely painful, skin moves with breathing'
}
```

**Difficulty Categories:**
- **Easy (1.0-1.1x):** Outer arm, outer thigh, calf, shoulder
- **Moderate (1.2-1.4x):** Inner arm, forearm, back, chest
- **Difficult (1.6-2.2x):** Ribs, spine, feet, hands, neck, face

---

### Complexity Factors Database

**Object:** `COMPLEXITY_FACTORS`
**Total Entries:** 5 complexity levels

**Schema:**
```javascript
{
  complexity_id: {
    time_multiplier: number,   // Time adjustment (0.8 - 2.5)
    price_adjustment: {
      min: number,             // Minimum price adjustment (0 - 0.5)
      max: number              // Maximum price adjustment (0.1 - 1.0)
    }
  }
}
```

**Complexity Levels:**
```javascript
'simple': {
  time_multiplier: 0.8,
  price_adjustment: { min: 0, max: 0.10 }
},
'moderate': {
  time_multiplier: 1.0,
  price_adjustment: { min: 0.10, max: 0.20 }
},
'detailed': {
  time_multiplier: 1.4,
  price_adjustment: { min: 0.20, max: 0.30 }
},
'highly-detailed': {
  time_multiplier: 1.8,
  price_adjustment: { min: 0.30, max: 0.50 }
},
'masterwork': {
  time_multiplier: 2.5,
  price_adjustment: { min: 0.50, max: 1.0 }
}
```

---

### Ink Consumption Rates Database

**Object:** `INK_CONSUMPTION_RATES`
**Total Entries:** 6 tattooing techniques

**Schema:**
```javascript
{
  technique_id: {
    base_rate: number,         // ml per square inch
    saturation: {
      light: number,           // Saturation multiplier (0.6 - 0.8)
      medium: number,          // Saturation multiplier (1.0)
      heavy: number            // Saturation multiplier (1.2 - 1.5)
    },
    waste_factor: number       // Waste multiplier (1.2 - 1.5)
  }
}
```

**Example Entry:**
```javascript
'shading': {
  base_rate: 0.15,
  saturation: {
    light: 0.6,
    medium: 1.0,
    heavy: 1.5
  },
  waste_factor: 1.3
}
```

---

## Calculation Algorithms

### Coverage Area Calculator

**Formula:**
```javascript
effectiveHours = sessionHours - (breakTime / 60 * sessionHours)
baseCoverageRate = NEEDLE_COVERAGE_RATES[needle].coverage_rate[speed]
totalCoverage = baseCoverageRate * effectiveHours
adjustedCoverage = totalCoverage / passes
```

**Parameters:**
- `needle`: Needle configuration ID (string)
- `speed`: Work speed ('slow' | 'medium' | 'fast')
- `sessionHours`: Total session time in hours (0.5 - 12)
- `breakTime`: Minutes of breaks per hour (0 - 30)
- `passes`: Number of passes over area (1 - 5)

**Returns:**
```javascript
{
  coverage_imperial: number,     // Square inches
  coverage_metric: number,       // Square centimeters
  effective_hours: number,       // Actual working time
  coverage_per_hour: number,     // Base rate
  passes: number,                // Number of passes
  comparison: string             // Size comparison text
}
```

**Example:**
```javascript
Input:
- needle: '9M1'
- speed: 'medium'
- sessionHours: 4
- breakTime: 10
- passes: 2

Calculation:
- effectiveHours = 4 - (10/60 * 4) = 3.33 hours
- baseCoverageRate = 20 sq in/hour
- totalCoverage = 20 * 3.33 = 66.6 sq in
- adjustedCoverage = 66.6 / 2 = 33.3 sq in

Output:
- coverage_imperial: 33.3
- coverage_metric: 214.8 (33.3 * 6.4516)
- effective_hours: 3.33
- coverage_per_hour: 20
- passes: 2
```

---

### Session Time Estimator

**Formula:**
```javascript
totalArea = width * height
baseTime = totalArea / BASE_NEEDLE_RATE
adjustedTime = baseTime * complexityMultiplier * locationMultiplier * colorMultiplier * toleranceMultiplier
totalTime = adjustedTime * BUFFER_FACTOR
sessionsNeeded = Math.ceil(totalTime / typicalSessionLength)
```

**Constants:**
```javascript
BASE_NEEDLE_RATE = 20          // sq in/hr (9M1 medium speed)
BUFFER_FACTOR = 1.15           // 15% time buffer
```

**Multipliers:**
```javascript
colorMultiplier = {
  'blackwork': 1.0,
  'minimal-color': 1.2,
  'full-color': 1.5
}

toleranceMultiplier = {
  'low': 1.3,
  'medium': 1.0,
  'high': 0.85
}
```

**Parameters:**
- `width`: Tattoo width in inches
- `height`: Tattoo height in inches
- `complexity`: Complexity ID from COMPLEXITY_FACTORS
- `bodyLocation`: Location ID from BODY_LOCATION_FACTORS
- `colorWork`: Color type ('blackwork' | 'minimal-color' | 'full-color')
- `painTolerance`: Tolerance level ('low' | 'medium' | 'high')

**Returns:**
```javascript
{
  total_hours: number,           // Total estimated time
  sessions_needed: number,       // Number of sessions
  hours_per_session: number,     // Average session length
  total_area: number,            // Square inches
  complexity_factor: number,     // Applied multiplier
  location_factor: number,       // Applied multiplier
  base_time: number              // Time before adjustments
}
```

---

### Ink Consumption Calculator

**Formula:**
```javascript
totalArea = width * height
baseInk = totalArea * techniqueRate
saturationAdjusted = baseInk * saturationMultiplier
passesAdjusted = saturationAdjusted * passes
totalInk = passesAdjusted * wasteFactor
inkPerColor = totalInk / colors
capsPerColor = Math.ceil(inkPerColor / CAP_SIZE)
```

**Constants:**
```javascript
CAP_SIZE = 15                  // ml per ink cap
```

**Parameters:**
- `width`: Area width in inches
- `height`: Area height in inches
- `technique`: Technique ID from INK_CONSUMPTION_RATES
- `saturation`: Saturation level ('light' | 'medium' | 'heavy')
- `colors`: Number of colors (1 - 20)
- `passes`: Number of passes (1 - 5)

**Returns:**
```javascript
{
  total_ml: number,              // Total ink for all colors
  ml_per_color: number,          // Ink per individual color
  total_caps: number,            // Total caps needed
  caps_per_color: number,        // Caps per color
  total_area: number,            // Square inches
  waste_factor: number,          // Applied waste multiplier
  technique_rate: number         // Base consumption rate
}
```

---

### Pricing Calculator

**Formula:**
```javascript
basePrice = hours * hourlyRate
minAdjustment = basePrice * complexityFactor.price_adjustment.min
maxAdjustment = basePrice * complexityFactor.price_adjustment.max
minPrice = basePrice + minAdjustment
maxPrice = basePrice + maxAdjustment
midPrice = (minPrice + maxPrice) / 2
depositAmount = midPrice * (depositPercent / 100)
perSessionMin = minPrice / sessions
perSessionMax = maxPrice / sessions
```

**Parameters:**
- `hours`: Estimated total hours
- `hourlyRate`: Shop hourly rate ($50 - $500)
- `complexity`: Complexity ID from COMPLEXITY_FACTORS
- `depositPercent`: Deposit percentage (10 - 100)
- `sessions`: Number of sessions (1 - 20)

**Returns:**
```javascript
{
  min_price: number,             // Conservative estimate
  target_price: number,          // Recommended quote
  max_price: number,             // Upper range
  deposit_amount: number,        // Required deposit
  per_session_min: number,       // Min per session
  per_session_max: number,       // Max per session
  base_price: number,            // Price before adjustments
  complexity_adjustment: {
    min: number,
    max: number
  }
}
```

---

## API Reference

### Public Functions

#### `handleCoverageCalculation(event)`

Processes coverage calculator form submission.

**Parameters:**
- `event` (Event): Form submit event

**Returns:** void

**Side Effects:**
- Displays results in `#coverage-results` element
- Validates all form inputs
- Shows error messages for invalid inputs

**Example:**
```javascript
document.getElementById('coverage-form').addEventListener('submit', handleCoverageCalculation);
```

---

#### `handleSessionCalculation(event)`

Processes session time estimator form submission.

**Parameters:**
- `event` (Event): Form submit event

**Returns:** void

**Example:**
```javascript
document.getElementById('session-form').addEventListener('submit', handleSessionCalculation);
```

---

#### `handleInkCalculation(event)`

Processes ink consumption calculator form submission.

**Parameters:**
- `event` (Event): Form submit event

**Returns:** void

---

#### `handlePricingCalculation(event)`

Processes pricing calculator form submission.

**Parameters:**
- `event` (Event): Form submit event

**Returns:** void

---

#### `initializeTheme()`

Initializes theme toggle and loads saved preference from localStorage.

**Returns:** void

**Storage Key:** `coverage-calculator-theme`

**Example:**
```javascript
// Called on DOMContentLoaded
initializeTheme();

// Manually toggle theme
document.body.classList.toggle('light-mode');
localStorage.setItem('coverage-calculator-theme', 'light');
```

---

#### `initializeTabNavigation()`

Sets up tab switching functionality.

**Returns:** void

**Example:**
```javascript
// Called on DOMContentLoaded
initializeTabNavigation();

// Programmatically switch tabs
const sessionTab = document.querySelector('[data-tab="session"]');
sessionTab.click();
```

---

### Private Helper Functions

#### `displayCoverageResults(data)`

Generates and displays coverage calculation results.

**Parameters:**
- `data` (Object): Calculation results object

**Returns:** void

---

#### `displaySessionResults(data)`

Generates and displays session time estimation results.

---

#### `displayInkResults(data)`

Generates and displays ink consumption results.

---

#### `displayPricingResults(data)`

Generates and displays pricing calculation results.

---

## Integration Guide

### Standalone Embedding

**Full Page Integration:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Coverage Calculator</title>
    <link rel="stylesheet" href="coverage-calculator/css/style.css">
</head>
<body>
    <div id="calculator-container">
        <!-- Include full index.html content here -->
    </div>
    <script src="coverage-calculator/js/calculator.js"></script>
</body>
</html>
```

**iFrame Embedding:**
```html
<iframe src="https://yoursite.com/coverage-calculator/embed.html"
        width="100%"
        height="900"
        frameborder="0"
        loading="lazy">
</iframe>
```

---

### WordPress Integration

**Shortcode Registration:**
```php
function coverage_calculator_shortcode($atts) {
    $atts = shortcode_atts(array(
        'theme' => 'dark',
        'default_tab' => 'coverage',
        'show_branding' => 'yes'
    ), $atts);

    ob_start();
    include 'path/to/calculator-template.php';
    return ob_get_clean();
}
add_shortcode('coverage_calculator', 'coverage_calculator_shortcode');
```

**Usage:**
```
[coverage_calculator theme="dark" default_tab="coverage"]
```

---

### React Integration

```javascript
import { useEffect, useRef } from 'react';

function CoverageCalculator({ theme = 'dark', defaultTab = 'coverage' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        // Load calculator script
        const script = document.createElement('script');
        script.src = '/calculator/js/calculator.js';
        script.async = true;
        document.body.appendChild(script);

        // Set theme class
        if (theme === 'light') {
            containerRef.current.classList.add('light-mode');
        }

        return () => {
            document.body.removeChild(script);
        };
    }, [theme]);

    return (
        <div ref={containerRef} className="coverage-calculator-wrapper">
            {/* Include calculator HTML */}
        </div>
    );
}
```

---

### Vue.js Integration

```javascript
<template>
    <div :class="['calculator-wrapper', themeClass]" ref="calculatorContainer">
        <!-- Include calculator HTML -->
    </div>
</template>

<script>
export default {
    props: {
        theme: {
            type: String,
            default: 'dark'
        },
        defaultTab: {
            type: String,
            default: 'coverage'
        }
    },
    computed: {
        themeClass() {
            return this.theme === 'light' ? 'light-mode' : '';
        }
    },
    mounted() {
        // Initialize calculator
        const script = document.createElement('script');
        script.src = '/calculator/js/calculator.js';
        document.body.appendChild(script);
    }
}
</script>
```

---

## Customization Options

### CSS Custom Properties

The calculator uses CSS custom properties for easy theming:

```css
:root {
    /* Colors */
    --color-tattoo-black: #1A1A1A;
    --color-ink-blue: #2C5F7C;
    --color-neon-pink: #FF006E;
    --color-success: #00D084;
    --color-warning: #FFB800;
    --color-danger: #E63946;

    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;

    /* Typography */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;

    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-base: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

**Custom Theme Example:**
```css
/* Override colors for your brand */
:root {
    --color-ink-blue: #YOUR-PRIMARY;
    --color-neon-pink: #YOUR-ACCENT;
}
```

---

### Database Extension

**Adding a New Needle Configuration:**
```javascript
NEEDLE_COVERAGE_RATES['17M1'] = {
    type: 'magnum',
    name: '17 Magnum',
    needles: 17,
    width_mm: 18.0,
    coverage_rate: {
        slow: 20.0,
        medium: 40.0,
        fast: 60.0
    },
    best_for: 'Maximum coverage for very large areas',
    passes_required: 2,
    ink_efficiency: 'excellent'
};

// Update select options in HTML
const select = document.getElementById('needle-config');
const option = document.createElement('option');
option.value = '17M1';
option.textContent = '17M1 - 17 Magnum (Maximum Coverage)';
select.querySelector('optgroup[label="Magnums"]').appendChild(option);
```

**Adding a New Body Location:**
```javascript
BODY_LOCATION_FACTORS['scalp'] = {
    difficulty: 'difficult',
    name: 'Scalp',
    time_multiplier: 1.9,
    pain_level: 'very-high',
    typical_session: 2.5,
    break_frequency: 'frequent',
    notes: 'Thin skin over bone, vibration sensitivity'
};
```

---

## Performance Optimization

### Lazy Loading

```javascript
// Lazy load calculator when visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadCalculator();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.getElementById('calculator-container'));
```

### Debounced Input Validation

```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply to input validation
const validateInput = debounce((input) => {
    // Validation logic
}, 300);
```

### Caching Calculations

```javascript
const calculationCache = new Map();

function getCachedOrCalculate(params) {
    const cacheKey = JSON.stringify(params);

    if (calculationCache.has(cacheKey)) {
        return calculationCache.get(cacheKey);
    }

    const result = performCalculation(params);
    calculationCache.set(cacheKey, result);

    return result;
}
```

---

## Testing & Validation

### Unit Test Examples

```javascript
// Coverage calculation test
function testCoverageCalculation() {
    const input = {
        needle: '9M1',
        speed: 'medium',
        sessionHours: 4,
        breakTime: 10,
        passes: 2
    };

    const result = calculateCoverage(input);

    console.assert(
        Math.abs(result.coverage_imperial - 33.3) < 0.1,
        'Coverage calculation incorrect'
    );

    console.assert(
        result.effective_hours === 3.33,
        'Effective hours calculation incorrect'
    );
}
```

### Integration Test Examples

```javascript
// Form submission test
async function testFormSubmission() {
    // Fill form
    document.getElementById('needle-config').value = '9M1';
    document.getElementById('work-speed').value = 'medium';
    document.getElementById('session-hours').value = '4';
    document.getElementById('break-time').value = '10';
    document.getElementById('passes').value = '2';

    // Submit form
    const form = document.getElementById('coverage-form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    // Wait for results
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check results displayed
    const resultsDiv = document.getElementById('coverage-results');
    console.assert(
        resultsDiv.style.display !== 'none',
        'Results not displayed'
    );
}
```

### Validation Rules

**Input Validation:**
```javascript
const validationRules = {
    sessionHours: { min: 0.5, max: 12, step: 0.5 },
    breakTime: { min: 0, max: 30, step: 5 },
    passes: { min: 1, max: 5, step: 1 },
    tattooWidth: { min: 0.5, max: 50, step: 0.5 },
    tattooHeight: { min: 0.5, max: 50, step: 0.5 },
    colors: { min: 1, max: 20, step: 1 },
    hourlyRate: { min: 50, max: 500, step: 10 },
    depositPercent: { min: 10, max: 100, step: 5 },
    sessions: { min: 1, max: 20, step: 1 }
};
```

---

## Browser Compatibility

### Required Features

- CSS Custom Properties (IE not supported)
- ES6 Arrow Functions
- Template Literals
- `const` and `let`
- `addEventListener`
- `localStorage`
- Flexbox and Grid

### Polyfills

For older browser support:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
```

---

## Security Considerations

### Input Sanitization

All user inputs are validated and sanitized:

```javascript
function sanitizeNumber(input, min, max) {
    const num = parseFloat(input);
    if (isNaN(num)) return min;
    return Math.max(min, Math.min(max, num));
}
```

### XSS Prevention

All dynamic content is escaped:

```javascript
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
```

---

## Version History

### 1.0.0 - January 2025

**Initial Release:**
- Coverage Area Calculator
- Session Time Estimator
- Ink Consumption Calculator
- Pricing Calculator
- 18 needle configurations
- 15 body locations
- Dark/Light theme toggle
- Mobile responsive design
- WordPress integration
- Gutenberg block

---

## Support & Contributing

### Reporting Issues

**GitHub Issues:** https://github.com/poliinternational/coverage-calculator/issues

**Include:**
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests

Submit feature requests via GitHub Issues with:
- Use case description
- Expected behavior
- Benefits to users

### Contact

**Technical Support:** support@poliinternational.com
**Website:** https://poliinternational.com

---

**© 2025 Poli International Co. - Technical Documentation**
**License:** GPL v2 or later
