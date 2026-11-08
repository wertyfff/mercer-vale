---
name: MERCER VALE
description: An independent clothing house, expressed through photographic scale and quiet typography.
colors:
  paper: "#e9e9e7"
  ink: "#232c29"
  muted: "#62685f"
  olive: "#4b5145"
  line: "#c2c5be"
  image-text: "#ffffff"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(60px, 6.5vw, 104px)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(65px, 7vw, 110px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(27px, 2.7vw, 42px)"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
rounded:
  square: "0px"
  round-control: "50%"
spacing:
  gutter: "clamp(22px, 4.2vw, 72px)"
  link-block: "15px"
  panel-gap: "10px"
  mobile-panel-gap: "12px"
components:
  line-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "15px 0"
  line-link-light:
    backgroundColor: "transparent"
    textColor: "{colors.image-text}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "15px 0"
  round-control:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.round-control}"
    width: "48px"
    height: "48px"
  campaign-cta:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "17px 20px"
  category-filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    padding: "12px 0"
  search-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    height: "44px"
---

# Design System: MERCER VALE

## Overview

**Creative North Star: "Clothing in motion"**

Large photographic surfaces carry the clothing and its atmosphere. Cool paper, restrained navigation and quiet editorial text give the imagery room. The established pairing of DM Sans and Instrument Serif connects a direct brand identity with personal, conversational campaign statements.

**Key Characteristics:**

- Photographic scale with deliberate subject cropping.
- Cool paper surfaces and green-toned ink.
- Serif statements paired with sans-serif identity and controls.
- Spacious composition that recomposes for touch.
- Native scrolling, accessible dialogs and reduced spatial motion when requested.

## Colors

The palette is cool and muted; clothing photography supplies the broader colour range.

### Primary

- **Olive:** selection highlight, scrollbar thumb and photographic fallback surface.

### Neutral

- **Paper:** page and dialog surfaces.
- **Ink:** primary text, icons and action underlines.
- **Muted:** supporting text and image provenance.
- **Line:** dividers and control outlines.
- **Image text:** white lettering over darkened photography.

**The Photograph Rule.** Treat image colour as content; keep controls and reading surfaces within the established neutral palette.

## Typography

**Display Font:** Instrument Serif, with Georgia and serif fallbacks.

**Body Font:** DM Sans, with Arial and sans-serif fallbacks.

Serif statements are light, tightly composed and conversational. DM Sans holds the identity, prose and navigation. The brand wordmark uses a heavier sans-serif voice, distinct from the campaign statements.

### Hierarchy

- **Display:** campaign statements; responsive size and deliberate line breaks.
- **Headline:** editorial section headings and brand notes.
- **Title:** photographic study titles.
- **Body:** short paragraphs, generally constrained to approximately 350px on desktop.
- **Label:** navigation and action text, with smaller supporting metadata.

The brand wordmark is a dedicated identity treatment, scaling with viewport width. It is not a general heading style. Italic serif text appears as part of the existing campaign language; it does not introduce a third typeface.

The interface and editorial copy are in English, using British spelling. The hero carries one expressive invitation; subsequent headings and captions name the visible clothing and the stage of the collection directly. Descriptions discuss proportion, colour and combinations in the photographs. Avoid repeating broad lifestyle slogans across sections. Manufacturing, material, longevity and commercial claims need supplied evidence; the garment references are illustrative. COPY-REVIEW.md records the current editorial decisions.

## Layout

Page gutters scale fluidly. Most reading and navigation groups remain compact inside generous section spacing. Desktop editorial sections pair unequal image and copy columns; headings and secondary prose often align at opposite edges.

The main responsive changes occur at 1000px and 700px, with a small-screen adjustment at 370px and a large-screen adjustment at 1800px. At 700px and below, the header reduces to identity, search and menu, editorial pairs stack, and photographic studies use a two-column editorial grid with a full-width opening image and a wider closing image. The desktop photographic passage uses native sticky positioning; touch and reduced-motion layouts remove the pinning.

## Elevation & Depth

Surfaces use no elevation shadows. A narrow olive shadow reinforces the search field focus underline. Depth comes from photography, measured dark overlays, changing image scale and native modal layers. Image overlays must be assessed against the actual crop and text, rather than assumed to provide adequate contrast.

## Shapes

Photographs, page sections and dialogs have square edges. Small directional controls are circular. Fine underlines and dividers carry interaction and grouping. Clipping is used for the opening type and modal entrance, not as a substitute for image content.

## Components

### Text actions

Primary campaign actions use a square paper surface with ink lettering and a directional arrow. Supporting underlined actions pair a short label with a consistent stroke arrow. Standard actions use ink; image actions use white. The arrow moves slightly on hover, while keyboard focus uses a visible current-colour outline. On small screens, actions may shrink to fit their content column.

### Navigation

The fixed desktop header balances collection, styling and house links, centred identity, search and menu controls. It is white over the campaign photograph and becomes a paper surface with ink text and a fine lower rule beyond the hero. Hover underlines establish feedback. The mobile header retains a left-aligned identity, search icon and clearly labelled menu control. The footer repeats the main section destinations as a compact sitemap.

The menu is a native dialog: image and navigation side by side on desktop, navigation alone on mobile. Large serif links use fine separators. Escape closes it and focus returns to its trigger.

### Photographic studies

Each category tab is a separate eight-photograph collection. The catalogue contains 48 distinct local Unsplash images, indexed by assets/collection/catalog.json. Women has Outerwear, Shirts & tops and Knitwear; Men has Tailoring, Shirts & tops and Outerwear. Each gender therefore contains three collections and 24 photographs. The hero campaign photograph is excluded.

Women and Men are large serif pressed-state controls labelled with their collection and photograph totals. Category tabs show an eight-image count, an active ink underline and the categories available for that gender. There is no All looks view. A selected heading names both gender and category, while the live count names the active eight-photograph collection. The chosen state is reflected in the URL, for example ?collection=men&edit=tailoring.

Desktop uses a four-column editorial grid, with a full-length opening frame spanning two columns and two rows, supporting garment and detail frames, and a wider closing frame. Each active collection uses the editorial grid; changing tabs replaces the complete eight-image set. Mobile uses two columns; the opening and closing frames span both columns. Hover adds a restrained image scale, rather than expanding card width. Selecting a study opens its lookbook. Photography remains illustrative and must not imply inventory or finished MERCER VALE products.

### Lookbook

A native full-screen dialog pairs image and explanatory text on desktop, then stacks them on mobile. Circular previous and next controls, keyboard arrows, a position count and a visible close control support browsing. Captions and ruled facts retain the distinction between illustrative photography and the collection in development. The enquiry action includes the current study title in its email subject. Collection lookbook navigation remains within the selected gender and category. Each of the six collections has its own eight-image sequence and count. The previous/next buttons and keyboard arrows wrap within that collection; they do not cross into another category, gender or the hero campaign photograph. Search results identify their gender and category, and opening a result uses that same strictly scoped lookbook sequence.

### Styling switcher

Pressed-state text options select a styling story, updating the image, caption, short description and linked silhouette together. Desktop options form ruled rows with a directional marker; mobile options become a compact horizontal group with an underline on the active choice. Image changes use a short crossfade and restrained scale change, disabled for reduced motion.

### Help disclosures

Questions use native details and summary elements with fine horizontal separators and a small plus/minus indicator. Answers retain clear launch, fit and illustrative-photography information. Email links offer a direct follow-up.

### Local search

A native full-screen paper dialog contains a large serif prompt and an underlined search input. A local index searches collection studies and page sections; result rows pair a title, category and directional arrow. A live count and a useful empty state explain the result. Search matches include English and Russian terms. Study results open the lookbook; section results close the dialog and navigate to the section. Escape closes the dialog and focus returns to its trigger.

### Opening sequence and motion

The current opening is minimal: a paper surface, a single centred MERCER VALE wordmark and a thin horizontal preparation bar directly below it. Enter site sits at the lower right and can skip preparation. The wordmark uses DM Sans at a responsive desktop size and a fixed 34px mobile size; the bar is 2px high. There are no photographic strips, phase counters, diagonal seams or additional loader headlines.

Normal preparation targets 4000ms and reduced-motion preparation targets 1200ms. The bar caps at 88% until the cover image and fonts settle, then may complete; it is a preparation indicator rather than a byte-accurate network measure. A nine-second main ceiling and independent eleven-second head fallback restore access if needed. The normal exit fades over 450ms, with no exit animation for reduced motion. A change to reduced motion during preparation finishes the opening immediately.

The underlying page is temporarily inert and the hero entrance paused during preparation. Completion, Enter site and fallback restore access. Replay opening in the footer reuses the controller, returns the page to the top and focuses Enter site; focus returns to the header identity after replay ends.

A reload clears the section hash and restores scroll position to zero. Normal section navigation remains available through anchors. Scrolling otherwise stays native. The opening image and typography form one staged entrance; supporting changes use natural deceleration, with a faster modal exit.

Scroll choreography progressively enhances content that is visible by default. On first entry, an IntersectionObserver starts Web Animations API reveals: heading lines rise through a clip with 95ms offsets; collection panels open through image clips with 110ms offsets; the house image opens horizontally; and the styling frame expands from a small inset. These are single-entry transitions rather than visibility prerequisites. Heading movement lasts 1000ms, image reveals 1000-1100ms, and the restrained footer transition lasts 700ms.

Native scroll-linked framing expands the lake image from a bounded horizontal inset and adds a small scale/travel adjustment. The contact photo has bounded parallax inside its clipped frame. Reduced-motion preferences remove spatial animation and sticky pinning while preserving content and controls. A preference change during the session cancels active editorial animations and clears inline image transforms and clips.

## Do's and Don'ts

### Do:

- **Do** preserve the DM Sans and Instrument Serif role pairing.
- **Do** assess subject cropping at both desktop and mobile widths.
- **Do** retain native scrolling, visible keyboard focus and reduced-motion behavior.
- **Do** distinguish illustrative campaign photography from actual product evidence.
- **Do** use concrete English garment names and frame-specific descriptions after the single expressive campaign headline.

### Don't:

- **Don't** replace photographic sections with interchangeable card grids.
- **Don't** remove the requested skippable loader or reload-to-home behavior; keep their time limits and recovery paths.
- **Don't** add product prices, stock or production claims without supplied facts.

## Mobile refinement — November 2026

The mobile refinement preserves the paper/ink palette, Instrument Serif and DM Sans, gender selectors, eight-photo collections and desktop composition. At widths up to 700px, primary body text is 14px with 1.75 line height, the introduction stacks, search/menu controls have 44px targets, search input is 16px, safe-area insets are respected, and lookbook arrows sit beside the photographic frame. Horizontal photo swipes preserve native vertical scrolling. Short landscape screens use a two-column menu and lookbook. Responsive 640/1280px WebP files serve local photographs; the campaign also has a 1920px version. Original JPEG assets remain available.

Verified in Chromium at 320, 360, 390, 768px and 844 × 390 landscape: no document overflow, working menu, gender/category selection, responsive lookbook images, search, styling updates and FAQ. Device emulation was used; physical devices were not available. Seven caption-free 1920 × 1080 viewport captures live in `контент/скриншоты/`.
