# Ink Coverage Calculator - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Schemas](#data-schemas)
3. [Calculation / Logic Algorithms](#calculation--logic-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization](#customization)
7. [Performance](#performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Security](#security)
10. [Version History](#version-history)
11. [Support / Contact](#support--contact)

---

## Architecture Overview

### Technology Stack

- **HTML5**, Semantic markup with ARIA roles for accessibility
- **CSS3**, Custom properties, flexbox/grid layout, responsive design
- **Vanilla JavaScript (ES6+)**, No frameworks, no external libraries
- **Local Storage**, Theme persistence across sessions

### File Structure

```
coverage-calculator/
├── index.html              # Main tool interface with 4 tab panels
├── documentation.html      # Standalone documentation page
├── embed.html              # Embed code generator with live preview
├── css/
│   ├── poli-standard.css   # Shared Poli International styles
│   └── style.css           # Tool-specific styles
└── js/
    ├── calculator.js       # Core calculation engine & UI logic
    └── common.js           # Theme toggle, iframe resizing, modal, email forms
```

### Component Breakdown

The tool consists of four independent calculator modules accessed via tab navigation:

1. **Coverage Area Calculator**, Estimates skin coverage based on needle configuration, technique, speed, and session duration
2. **Session Time Estimator**, Predicts total session time from design dimensions, complexity, body location, and client factors
3. **Ink Consumption Calculator**, Calculates ink volume required based on area, technique, saturation, and waste factors
4. **Pricing Tool**, (UI placeholder present in HTML; no JS handler implemented in provided code)

Each module follows the same pattern:
- A `<form>` element with input fields
- A submit handler that reads form values
- A calculation function that applies multipliers from constant databases
- A display function that updates result cards and detail sections

---

## Data Schemas

All data constants are defined in `calculator.js` as JavaScript objects.

### NEEDLE_COVERAGE_RATES

Database of 20 needle configurations with coverage rates in square inches per hour.

```javascript
{
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
}
```

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `type` | string | `liner`, `shader`, `magnum`, or `curved_magnum` |
| `name` | string | Human-readable needle name |
| `needles` | number | Count of individual needles |
| `width_mm` | number | Needle group width in millimeters |
| `coverage_rate` | object | `{ slow, medium, fast }`, sq in per hour at each speed |
| `best_for` | string | Recommended use case |
| `typical_use` | string | Common application |
| `passes_required` | number | Recommended number of passes |
| `ink_efficiency` | string | `low`, `medium`, `good`, `excellent`, or `maximum` |

### BODY_LOCATION_FACTORS

17 body locations with time multipliers and characteristics.

```javascript
{
  'ribs': {
    difficulty: 'difficult',
    name: 'Ribs',
    time_multiplier: 2.0,
    pain_level: 'very-high',
    typical_session: 2.0,
    break_frequency: 'very-frequent',
    notes: 'Extremely painful, skin moves with breathing'
  }
}
```

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `difficulty` | string | `easy`, `medium`, or `difficult` |
| `name` | string | Display name |
| `time_multiplier` | number | Factor applied to base time (1.0 = baseline) |
| `pain_level` | string | `low` through `extreme` |
| `typical_session` | number | Maximum recommended session hours |
| `break_frequency` | string | `minimal`, `moderate`, `frequent`, `very-frequent`, or `constant` |
| `notes` | string | Clinical notes for the artist |

### COMPLEXITY_FACTORS

5 design complexity levels with multipliers.

```javascript
{
  'photorealistic': {
    name: 'Photorealistic',
    time_multiplier: 3.0,
    price_multiplier: 1.5,
    passes_required: 5,
    description: 'Extreme detail, multiple layers, precise gradients'
  }
}
```

### INK_CONSUMPTION_RATES

6 technique types with ink usage rates.

```javascript
{
  'color-packing': {
    ink_per_sqinch: 0.4,
    waste_factor_base: 1.5,
    caps_per_session: 6,
    name: 'Color Packing'
  }
}
```

### WASTE_FACTORS

```javascript
{
  'low': 1.2,
  'medium': 1.4,
  'high': 1.6
}
```

---

## Calculation / Logic Algorithms

### Coverage Area Calculator (`handleCoverageCalculation`)

**Inputs:** needle configuration, technique, work speed, session hours, break time (min/hour), number of passes

**Steps:**

1. **Calculate effective working time:**
   ```
   breakHours = (breakTime / 60) * sessionHours
   effectiveHours = sessionHours - breakHours
   ```

2. **Look up base coverage rate** from `NEEDLE_COVERAGE_RATES[needleConfig].coverage_rate[workSpeed]`

3. **Calculate total coverage:**
   ```
   totalCoverage = baseCoverageRate * effectiveHours
   adjustedCoverage = totalCoverage / passes
   ```

4. **Convert to metric:**
   ```
   coverageMetric = adjustedCoverage * 6.4516  // sq in to sq cm
   ```

5. **Generate size comparisons** against A5, A4, A3 paper and credit card dimensions

### Session Time Estimator (`handleSessionCalculation`)

**Inputs:** width (in), height (in), design complexity, color work type, body location, pain tolerance

**Steps:**

1. **Calculate total area:**
   ```
   totalArea = width * height
   ```

2. **Base time** using 9M1 needle at medium speed (20 sq in/hr):
   ```
   baseTime = totalArea / 20
   ```

3. **Apply multipliers sequentially:**
   ```
   baseTime *= COMPLEXITY_FACTORS[complexity].time_multiplier
   baseTime *= BODY_LOCATION_FACTORS[bodyLocation].time_multiplier
   baseTime *= colorMultiplier[colorWork]  // blackgrey:1.0, limited-color:1.3, full-color:1.6
   baseTime *= toleranceMultiplier[painTolerance]  // high:1.0, medium:1.15, low:1.3
   ```

4. **Add 15% buffer:**
   ```
   totalTime = baseTime * 1.15
   ```

5. **Calculate sessions:**
   ```
   sessionsNeeded = Math.ceil(totalTime / locationData.typical_session)
   hoursPerSession = totalTime / sessionsNeeded
   timelineWeeks = sessionsNeeded
   ```

6. **Status check:**
   - `totalTime > 50` → status = `ambitious`
   - `hoursPerSession > typical_session * 1.5` → status = `unrealistic`
   - Otherwise → status = `optimal`

### Ink Consumption Calculator (`handleInkCalculation`)

**Inputs:** coverage area (sq in), technique, saturation level, color count, passes, waste factor

**Steps:**

1. **Calculate base ink:**
   ```
   baseInk = area * INK_CONSUMPTION_RATES[technique].ink_per_sqinch
   ```

2. **Apply saturation multiplier:**
   ```
   saturationMultiplier = { light: 0.7, medium: 1.0, heavy: 1.4 }
   adjustedInk = baseInk * saturationMultiplier[saturation]
   ```

3. **Apply passes:**
   ```
   inkWithPasses = adjustedInk * passes
   ```

4. **Apply waste factor:**
   ```
   totalInk = inkWithPasses * WASTE_FACTORS[wasteFactor]
   ```

5. **Calculate per-color and caps:**
   ```
   inkPerColor = totalInk / colorCount
   capsNeeded = Math.ceil(totalInk / 5)  // 5ml per cap
   costEstimate = totalInk * 0.50  // $0.50 per ml
   ```

---

## API Reference

All functions are defined in `calculator.js` and `common.js`. No external API endpoints are called.

### Public Functions

#### `handleCoverageCalculation(e)`
- **Type:** Event handler
- **Trigger:** Submit event on `#coverage-form`
- **Parameters:** `e` (Event object)
- **Behavior:** Reads form inputs, calculates coverage area, calls `displayCoverageResults()`

#### `handleSessionCalculation(e)`
- **Type:** Event handler
- **Trigger:** Submit event on `#session-form`
- **Parameters:** `e` (Event object)
- **Behavior:** Reads form inputs, calculates session time, calls `displaySessionResults()`

#### `handleInkCalculation(e)`
- **Type:** Event handler
- **Trigger:** Submit event on `#ink-form`
- **Parameters:** `e` (Event object)
- **Behavior:** Reads form inputs, calculates ink consumption, calls `displayInkResults()`

#### `initializeTabs()`
- **Type:** Initialization function
- **Called:** On `DOMContentLoaded`
- **Behavior:** Attaches click handlers to `.coverage__tab` buttons, manages active state and panel visibility

#### `initializeTheme()`
- **Type:** Initialization function
- **Called:** On `DOMContentLoaded`
- **Behavior:** Reads `coverage-calculator-theme` from localStorage, applies saved theme, toggles on button click

#### `sendHeight()`
- **Type:** Utility function (in `common.js`)
- **Behavior:** Posts `{ height: scrollHeight + 50 }` to parent window for iframe auto-resizing

### Internal Display Functions

| Function | Purpose |
|----------|---------|
| `displayCoverageResults(data)` | Updates `#coverage-results` with calculated values, size comparisons, and needle info |
| `displaySessionResults(data)` | Updates `#session-results` with time estimates, session breakdown, and location notes |
| `displayInkResults(data)` | Updates `#ink-results` with ink volume, caps needed, and cost estimate |

---

## Integration Guide

### Standalone Embedding

The tool is a self-contained static HTML/CSS/JS application with zero external dependencies. No API keys, server-side processing, or database connections are required.

#### Iframe Embed (Recommended)

```html
<iframe
  src="https://poliinternational.com/tools/coverage-calculator/index.html"
  width="100%"
  height="800"
  frameborder="0"
  style="border: 1px solid #ddd; border-radius: 8px;"
  title="Coverage Calculator by Poli International">
</iframe>
```

**Available sizes:**
| Version | Height | Use Case |
|---------|--------|----------|
| Compact | 600px | Space-constrained layouts |
| Standard | 800px | General purpose (recommended) |
| Large | 1000px | Dedicated tool pages |

#### Auto-Resize Behavior

The tool automatically sends its content height to the parent window via `postMessage`. To enable auto-resizing, add this listener to your parent page:

```javascript
window.addEventListener('message', function(event) {
  if (event.data.height) {
    document.getElementById('my-iframe').style.height = event.data.height + 'px';
  }
});
```

#### Theme Synchronization

When embedded, the tool listens for theme messages from the parent:

```javascript
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'poli-theme') {
    // Apply light or dark theme
  }
});
```

Send `{ type: 'poli-theme', light: true }` or `{ type: 'poli-theme', light: false }` to synchronize themes.

### Direct URL Access

Users can access the tool directly at:
```
https://poliinternational.com/tools/coverage-calculator/
```

Documentation is available at:
```
https://poliinternational.com/coverage-calculator-documentation/
```

---

## Customization

### CSS Variables

The tool uses CSS custom properties defined in `poli-standard.css` and `style.css`. Key variables:

```css
--bg-primary: #0f0f0f;       /* Dark mode background */
--bg-secondary: #1a1a1a;     /* Card backgrounds */
--accent: #3B82F6;           /* Primary blue accent */
--accent-secondary: #8B5CF6; /* Purple accent */
--text-primary: #ffffff;
--text-secondary: #cccccc;
```

### Theme Persistence

The tool stores the selected theme in `localStorage` under the key `coverage-calculator-theme`. Users can override this by sending a `poli-theme` message from the parent window.

### Embed Styling

When embedding via iframe, customize the border and shadow using the `style` attribute:

```html
<iframe
  src="https://poliinternational.com/tools/coverage-calculator/index.html"
  width="100%"
  height="800"
  style="border: 2px solid #B76E79; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

---

## Performance

- **No external dependencies**, Zero network requests for libraries or fonts
- **Minimal DOM manipulation**, Results are updated in-place without re-rendering the entire interface
- **Lightweight**, Total payload under 50KB (HTML + CSS + JS)
- **Efficient calculations**, All algorithms run in O(1) time using pre-computed lookup tables
- **MutationObserver**, Used only for iframe height reporting, not for reactivity

---

## Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

**Features used:**
- `CSS Grid` and `Flexbox`, Layout
- `CSS Custom Properties`, Theming
- `ES6 Modules` (implied by `type="module"` if present), Code organization
- `localStorage`, Theme persistence
- `postMessage`, Cross-origin communication
- `MutationObserver`, Dynamic height reporting
- `IntersectionObserver`, Not used in current code

---

## Security

### Input Handling

- All user inputs are read via `document.getElementById().value` and parsed with `parseFloat()` or `parseInt()`
- No `innerHTML` is used for user-supplied values, only pre-defined strings from constant databases are inserted
- Form submission is prevented via `e.preventDefault()`, no page reload occurs
- No data is sent to any server or third-party endpoint

### Cross-Origin Security

- The tool accepts `postMessage` events only from the parent window
- Theme messages are filtered by `event.data.type === 'poli-theme'`
- Height messages are filtered by `event.data.height` existence
- No sensitive data is exposed via postMessage

### XSS Prevention

- All dynamic content is inserted using `textContent` (safe) or controlled `innerHTML` with pre-defined template strings
- User inputs are never concatenated into HTML strings
- Select dropdowns use hardcoded option values, not user-generated content

### Iframe Security

- The tool includes `frameborder="0"` in embed examples
- No `allow` attributes are required, the tool does not request camera, microphone, or geolocation access

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01 | Initial release, Coverage Area Calculator, Session Time Estimator, Ink Consumption Calculator, Pricing Tool (UI only) |

---

## Support / Contact

For technical support, integration assistance, or custom development:

- **Email:** support@poliinternational.com
- **Website:** https://poliinternational.com
- **Documentation:** https://poliinternational.com/coverage-calculator-documentation/
- **Contact Form:** https://poliinternational.com/contact-us/

---

*Technical Standard provided by Poli International Engineering*
