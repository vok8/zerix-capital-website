# Zerix Capital Design Guidelines

## Design Approach
**Hybrid Approach**: Combining Stripe's refined minimalism with Bloomberg's data sophistication and Linear's sharp typography. Financial services demand trust through clarity and precision, not flashy visuals.

## Core Design Elements

### Typography
- **Primary Font**: Inter or DM Sans via Google Fonts
- **Headings**: 
  - H1: 4.5rem (72px), font-weight 700, tight letter-spacing (-0.02em)
  - H2: 3rem (48px), font-weight 600
  - H3: 1.875rem (30px), font-weight 600
- **Body**: 1rem (16px), font-weight 400, line-height 1.6
- **Data/Numbers**: Tabular numbers, font-weight 500-600, slightly larger (1.125rem)
- **Tagline**: 1.25rem, font-weight 500, subtle opacity (0.9)

### Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component gaps: gap-8 to gap-12
- Card padding: p-8
- Container: max-w-7xl with px-6

### Component Library

**Landing Page Structure** (6 sections):
1. **Hero Section** (80vh): Large hero image showing modern office/financial district. Centered content overlay with blur-backed buttons. Company name (text-6xl), tagline, dual CTAs ("View Performance" + "Contact Us")
2. **About Us**: Two-column layout (60/40 split). Left: Mission statement, company overview. Right: Key metrics grid (3 stat cards)
3. **Value Proposition**: Three-column grid showcasing core competencies with subtle border cards
4. **Trust Signals**: Full-width section with client logos/achievements, horizontal scroll on mobile
5. **CTA Section**: Bold background treatment, newsletter signup + contact button combo
6. **Footer**: Four-column layout (Company Info, Quick Links, Contact, Social)

**Performance Page**:
- **Page Header**: Breadcrumb navigation, page title, date range selector (right-aligned)
- **Main Chart Area**: Full-width line graph with:
  - Multi-strategy comparison (color-coded lines)
  - Interactive legend (click to toggle strategies)
  - Tooltips showing exact percentages on hover
  - Y-axis: Percentage format, X-axis: Year markers
  - Grid lines: subtle, low opacity
- **Strategy Cards Grid**: Below main chart, 2x2 grid showing individual strategy performance summaries
- **Data Table**: Expandable accordion showing raw year-over-year data

**Team Page**:
- **Page Header**: "Leadership Team" title with brief intro paragraph
- **Team Grid**: 3-column layout (stacks to 1 on mobile)
  - Each card: Professional headshot, name (text-xl font-weight 600), title, brief bio (2-3 lines), LinkedIn link
  - Cards with subtle shadow on hover
- **Advisory Board**: 4-column grid with smaller cards

### Navigation
- **Desktop**: Horizontal navbar, logo left, links center, "Contact Us" button right
- **Mobile**: Hamburger menu, slide-in drawer
- **Nav Items**: Home, Performance, Team, Contact
- Sticky navigation with subtle shadow on scroll

### Cards & Containers
- Border radius: rounded-lg (0.5rem) for cards
- Shadows: Use sparingly, shadow-lg for elevated cards
- Borders: 1px solid with low opacity for definition

### Buttons
- **Primary**: px-8, py-3, rounded-lg, font-weight 600
- **Secondary**: Outlined variant with 2px border
- **Sizes**: Small (px-4 py-2), Regular (px-8 py-3), Large (px-10 py-4)
- Blur backgrounds when on images (backdrop-blur-sm bg-opacity-90)

### Data Visualization
- **Chart Library**: Chart.js or Recharts
- **Line thickness**: 3px for main lines
- **Point markers**: 6px circles on data points
- **Axis labels**: font-size 0.875rem, subtle color
- **Grid**: Horizontal lines only, opacity 0.1

### Images
**Hero Image**: Modern financial district or sleek office interior, professional photography style, subtle overlay gradient for text readability

**Team Photos**: Professional headshots, consistent background treatment, circular or square with rounded corners

### Animations
Minimal animations only:
- Fade-in on scroll for section reveals (once)
- Smooth chart rendering on page load
- Subtle hover states on cards (transform scale 1.02)

### Responsive Breakpoints
- Mobile: < 768px (single column layouts)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)