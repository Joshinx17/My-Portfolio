# Portfolio Update Guide

## Latest Changes Made (Update 3)

### 1. **Hero Section - Custom Background Image Support** ✓
- Removed the decorative mountain SVG element
- Now supports **custom background images**
- Easy configuration in `CONFIG.heroBgImage`

**How to add your image:**
1. Option A - **Local File:**
   - Place image in an `assets` folder in the same directory as `index.html`
   - In CONFIG, set: `heroBgImage: "url('assets/hero-bg.jpg')"`

2. Option B - **External URL:**
   - In CONFIG, set: `heroBgImage: "url('https://example.com/image.jpg')"`

3. Option C - **No Background:**
   - Leave empty: `heroBgImage: ""`

**Example:**
```javascript
heroBgImage: "url('assets/my-background.jpg')",
```

### 2. **Color Theme Updated** ✓
- **New Dark Color:** `#0b111f` (RGB: 11, 17, 31)
- Applied throughout: backgrounds, cards, navigation
- More modern, sleek dark aesthetic

### 3. **Font Simplified to Helvetica** ✓
- **All fonts now use Helvetica Neue**
- Removed serif fonts (Cormorant Garamond) completely
- Clean, minimalistic typography throughout
- Headings, body text, and UI all use the same font family

### 4. **Skill Cards - Continuous Scrolling Animation** ✓
- Cards scroll continuously from right to left
- Seamless looping animation (60-second cycle)
- **Pauses on hover** for interactivity
- Fully responsive

### 5. **Blog "Read More" Links Connected** ✓
- Now links to **Medium.com** 
- Opens in new tab
- Customize to your Medium profile

---

## Previous Changes

### Navigation Bar
- Centered buttons with logo on left, hamburger on right

### Resume Button
- Changed to "Download CV" with Google Drive link
- **⚠️ Remember to update with your Google Drive file ID**

### About Section
- "2 internships" badge is hidden

---

## 🎨 Customization

### Change Hero Background Image
Find this in the CONFIG object (around line ~1010):
```javascript
heroBgImage: "",  // Add your image here
```

Examples:
```javascript
// Local file in assets folder
heroBgImage: "url('assets/hero-background.jpg')",

// External URL
heroBgImage: "url('https://images.unsplash.com/photo-example.jpg')",

// No background
heroBgImage: "",
```

### Customize Medium Link
In the Blogs section (around line ~1340), change:
```javascript
href="https://medium.com"
```
To your profile:
```javascript
href="https://medium.com/@yourprofile"
```

---

## Color References

**Current Theme:**
- Background: `#0b111f` / RGB(11, 17, 31)
- Card: `#141b2d`
- Accent: `#f0a500` (Gold)
- Text Primary: `#e8eaf0`

To change colors, edit the `:root` variables at the top of the CSS (lines ~13-27).

---

## All Features

| Feature | Status |
|---------|--------|
| **Helvetica Font** | ✓ Complete |
| **Custom Hero Background** | ✓ Easy Setup |
| **Color Theme #0b111f** | ✓ Applied |
| **Skill Scrolling Animation** | ✓ Running |
| **Blog Medium Links** | ✓ Connected |
| **Centered Navigation** | ✓ Implemented |
| **Download CV Button** | ✓ Ready |

Your portfolio is now fully customized! 🚀

---

## ⚠️ Important: Add Your Google Drive Link

1. Go to Google Drive and upload/find your CV/Resume
2. Right-click → Share → Change to "Anyone with the link can view"
3. Copy the file ID from the URL: `https://drive.google.com/file/d/**FILE_ID**/view`
4. In `index.html`, find line ~778 and replace:
   ```html
   <!-- BEFORE: -->
   href="https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/view"
   
   <!-- AFTER: -->
   href="https://drive.google.com/file/d/YOUR_ACTUAL_FILE_ID_HERE/view"
   ```

---

## To Add Background Image to Hero Section

1. Place your image file in the same folder as `index.html` (or use a URL)
2. Open `index.html` and find the CSS section for `#home` (around line 208)
3. Uncomment the background line and update the path:
   ```css
   background: linear-gradient(rgba(9,12,22,0.7), rgba(9,12,22,0.7)), url('your-image.jpg') center/cover no-repeat;
   ```

---

## All Changes Summary

| Feature | Before | After |
|---------|--------|-------|
| **Font** | Mulish | Helvetica Neue |
| **Nav Layout** | Space Between | Centered |
| **Resume Button** | "Request Resume" (mailto) | "Download CV" (Google Drive link) |
| **About Badge** | Visible | Hidden |
| **Skill Cards** | Static boxes | Animated, interactive cards |
| **Hero Background** | Not available | Editable (commented code) |

Your portfolio is now more modern, minimalistic, and interactive! 🚀
