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

## Important CSS Grid Patterns

### Responsive column patterns with `repeat`, `auto-fit`, and `minmax`

A very common and useful Grid pattern is:

```css
grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
```

This pattern:
- Automatically creates as many columns as will fit in the container
- Ensures each column is at least `400px` wide
- Allows columns to expand (`1fr`) to fill available space

However, this version can break down on **smaller screens** if the minimum column width is larger than the viewport.

---

### A more robust and safer responsive pattern

A more flexible and production-safe version is:

```css
grid-template-columns: repeat(
  auto-fit,
  minmax(min(500px, 100%), 1fr)
);
```

Why this is better:
- `min(500px, 100%)` ensures the minimum column width never exceeds the viewport width
- Prevents horizontal overflow on small screens
- Allows layouts to collapse gracefully to a single column
- Improves responsiveness without media queries

This pattern works well when you want:
- Multiple columns on large screens
- A single column on narrow screens
- Predictable, safe behavior by default

---

## `auto-fit` vs `auto-fill`

The difference between `auto-fit` and `auto-fill` is easiest to see when:
- You have a **small number of grid items**
- All items fit within **one row**

With multiple rows, the two often appear to behave the same.

---

### `auto-fill`

- Creates as many column tracks as will fit in the container
- Reserves space for columns even if there are no items to fill them
- Can result in empty “ghost columns”

Mental model:
> *auto-fill cares about potential columns, not actual content*

---

### `auto-fit`

- Creates columns only for existing grid items
- Collapses unused columns
- Allows items to stretch and fill the available space

Mental model:
> *auto-fit fits the grid to the content you actually have*

---

### Practical takeaway

- Prefer **`auto-fit`** for most responsive layouts
- Use **`auto-fill`** when consistent column tracks matter
- When in doubt, `auto-fit` usually produces the expected result

---

### Reference

Visual explanation of this behavior:
https://youtu.be/OZ6qKoq7RJU?t=694
