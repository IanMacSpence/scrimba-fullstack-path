# CSS Grid – First Look (Scrimba Responsive Design)

## Lesson summary: First look at CSS Grid

### Turning on Grid
- Applying `display: grid` to a container does **not** immediately change the layout visually.
- Even if it looks the same, the children are now **grid items** and follow grid rules.
- One invisible change: **margins no longer collapse**.

### Implicit grid behavior
- The default value of `grid-template-columns` is `none`.
- That doesn’t mean “no grid”; it means no columns were explicitly declared.
- When nothing is declared, Grid implicitly creates:
  - **one column**
  - **one item per row**
- That’s why everything stays stacked vertically.

### Defining columns with `grid-template-columns`
- `grid-template-columns` defines the **columns** (horizontal tracks).
- Each value defines **one column**.

Example:
```css
grid-template-columns: 5em 10em;
```

- Creates **two columns**:
  - first column = `5em`
  - second column = `10em`
- Columns don’t need to be equal width.
- More values = more columns.

### Automatic row creation
- If there are more items than columns, Grid creates the needed **rows automatically**.
- Example: 8 items and 2 columns → Grid makes enough rows to fit everything.
- This happens implicitly (no `grid-template-rows` needed).

### Spacing with gaps
- Space between grid items is controlled with:
  - `row-gap`
  - `column-gap`
  - or the shorthand `gap`

Example:
```css
gap: 0.5em;
```

- Gaps appear **between grid items only**
- Gaps do **not** add space between items and the container edge

### Fixed-width column limitations
- Fixed column widths (`px`, `em`, etc.) are inflexible.
- Wide container → leftover empty space.
- Narrow container → overflow and horizontal scrolling.
- This motivates learning **flexible sizing** next.

### Key takeaway
- `display: grid` changes layout rules even if visuals don’t change.
- `grid-template-columns` defines structure.
- Rows are created automatically.
- Fixed widths limit responsiveness.

---