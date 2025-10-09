# QR Code Generator - Complete Guide

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [System Requirements](#system-requirements)
3. [Installation Guide](#installation-guide)
4. [Configuration & Setup](#configuration--setup)
5. [How to Use](#how-to-use)
6. [Features Overview](#features-overview)
7. [Build & Deployment](#build--deployment)
8. [Troubleshooting](#troubleshooting)
9. [Technical Stack](#technical-stack)

---

## 🎯 Introduction

**QR Code Generator** is a professional, full-featured web application for creating customized QR codes with advanced styling options. Built with modern React and TypeScript, this application supports multiple QR code types including URLs, phone numbers, Google Maps locations, VCards (business cards), and WiFi configurations.

### Key Features:
- ✅ **5 QR Code Types**: URL, Phone, Maps, VCard, WiFi
- ✅ **Customizable Design**: Colors, borders, patterns, logos
- ✅ **Multi-language Support**: Vietnamese & English
- ✅ **Landing Pages**: Beautiful landing pages for Maps QR codes
- ✅ **Export Options**: PNG and SVG formats
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **High Error Correction**: Level H for maximum scannability

---

## 💻 System Requirements

### Minimum Requirements:
- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher (included with Node.js)
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **RAM**: 4GB minimum
- **Disk Space**: 500MB free space

### Recommended:
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **RAM**: 8GB or more
- **Internet Connection**: For downloading dependencies

### Check Your Version:
```bash
node --version    # Should show v16.0.0 or higher
npm --version     # Should show 7.0.0 or higher
```

---

## 📦 Installation Guide

### Step 1: Install Node.js (if not installed)

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer
4. Follow the installation wizard
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Download/Clone the Project

**Option A: Clone from Git (if available)**
```bash
git clone <repository-url>
cd app_qr_code
```

**Option B: Extract from ZIP**
1. Extract the ZIP file to your desired location
2. Open terminal/command prompt
3. Navigate to the project folder:
   ```bash
   cd path/to/app_qr_code
   ```

### Step 3: Install Dependencies

In the project directory, run:

```bash
npm install
```

This will automatically install all required packages:
- **React** (v18+): UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **qrcode**: QR code generation library
- **lucide-react**: Icon library
- Plus all development dependencies

**Installation Time**: 2-5 minutes depending on internet speed

---

## ⚙️ Configuration & Setup

### Running the Development Server

#### Option 1: HTTP Mode (Recommended for Development)

```bash
npm run dev
```

The application will start at: **http://localhost:5173**

**Advantages:**
- ✅ Fastest setup
- ✅ No certificate warnings
- ✅ Perfect for local development

#### Option 2: HTTPS Mode (For Security-Required Features)

```bash
npm run dev:https
```

The application will start at: **https://localhost:5173**

**First Run:**
- Automatically generates a self-signed SSL certificate
- Certificate files created: `cert.pem` and `key.pem`
- Browser will show security warning (normal for self-signed certificates)

**Accepting the Certificate:**
1. Browser shows "Your connection is not private" warning
2. Click **"Advanced"** or **"Show Details"**
3. Click **"Proceed to localhost (unsafe)"** or **"Accept the Risk"**
4. The warning appears only once per browser

**Why HTTPS?**
- Some features require secure context (HTTPS)
- Testing PWA features
- Accessing camera/location APIs
- Simulating production environment

#### Manual Certificate Generation

If you need to regenerate certificates:

```bash
npm run generate-cert
```

### Port Configuration

Default port: **5173**

To change the port, edit `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3000, // Change to your desired port
  },
});
```

### Environment Variables

Create a `.env` file in the project root (optional):

```env
VITE_APP_TITLE=QR Code Generator
VITE_DEFAULT_LANGUAGE=vi
```

---

## 📖 How to Use

### 1. Starting the Application

1. Open terminal in project directory
2. Run `npm run dev`
3. Open browser to `http://localhost:5173`
4. The app loads with default settings

### 2. Switching Languages

- Click the **"Việt - English"** button in the top-right header
- Language instantly switches between Vietnamese and English
- All UI elements and placeholders update automatically

### 3. Creating QR Codes

#### Step-by-Step Process:

**Step 1: Select QR Code Type**

Click on one of the 5 type buttons:

1. **🌐 Website / URL**
   - Input: Website link
   - Example: `https://example.com`
   - Auto-adds `https://` if not provided

2. **📞 Phone Number**
   - Input: Phone number
   - Example: `+1234567890`
   - Creates `tel:` link for direct calling

3. **📍 Google Maps Location**
   - Input fields:
     - Title (e.g., "Restaurant Name")
     - Google Maps link
     - Note (e.g., "Meeting at 2pm")
   - Creates beautiful landing page when scanned

4. **👤 Business Card (VCard)**
   - Input fields:
     - Full Name
     - Job Title
     - Phone Number
     - Email Address
     - Company/Organization
   - Follows VCard 3.0 international standard
   - Automatically saves to contacts when scanned

5. **📶 WiFi Configuration**
   - Input fields:
     - SSID (Network name)
     - Password
     - Encryption type (WPA/WPA2/WEP/None)
   - Automatically connects to WiFi when scanned

**Step 2: Enter Required Information**

- Fill in all required fields
- Required fields are marked or obvious from context
- Real-time validation (if applicable)

**Step 3: Customize Appearance**

Located in the "Customization" section:

**A. Colors**
- **QR Code Color**: Color of QR modules (default: black)
- **Background Color**: Color behind QR code (default: white)
- Click color boxes to open color picker

**B. Border Style**
- **None**: No border
- **Solid**: Solid line border
- **Dashed**: Dashed line border
- **Gradient**: Beautiful gradient border
- **Border Color**: Choose border color (if not gradient)

**C. Background Pattern**
- **None**: Plain background
- **Dots**: Dotted pattern
- **Circles**: Circular pattern
- **Grid**: Grid pattern
- **Pattern Color**: Choose pattern color

**D. Logo (Optional)**
1. Click **"Choose Logo"** button
2. Select image file (PNG, JPG, SVG)
3. Use slider to adjust logo size (5% - 30%)
4. Logo appears centered with white background
5. Click **"Remove Logo"** to delete

**E. File Name**
- Enter custom name for downloaded file
- Default: "qrcode"
- No need to add extension (.png or .svg)

**Step 4: Generate QR Code**

1. Click the **"Generate QR Code"** button
2. QR code appears in preview area
3. Scannable immediately
4. All customizations applied

**Step 5: Download**

Two download options:

1. **📥 Download PNG**
   - Raster image format
   - Best for: Digital use, printing at fixed size
   - Includes all decorations, borders, logo
   - High resolution (480x480 px)

2. **📥 Download SVG**
   - Vector format
   - Best for: Scaling, professional printing
   - Infinitely scalable without quality loss
   - Smaller file size

### 4. Home/Reset Button

- Click **"Home"** in the header
- Resets all fields and settings to default
- Clears the generated QR code
- Scrolls to top of page

### 5. Google Maps QR Code Landing Page

When someone scans a Google Maps QR code:

**Display:**
```
╔═══════════════════════════════╗
║   Blue gradient background    ║
║                               ║
║      Restaurant Name          ║ ← Title
║                               ║
╠═══════════════════════════════╣
║  ┌─────────────────────────┐  ║
║  │ Location             →  │  ║ ← Opens Maps
║  ├─────────────────────────┤  ║
║  │ Meeting at 2pm       →  │  ║ ← Note
║  └─────────────────────────┘  ║
╚═══════════════════════════════╝
```

**Features:**
- Clean, modern design
- Matches chosen language (Vietnamese/English)
- Both buttons open Google Maps
- Responsive on all devices
- Beautiful gradient header

---

## 🌟 Features Overview

### QR Code Types

| Type | Input | Output | Use Case |
|------|-------|--------|----------|
| **URL** | Website link | Direct link | Marketing, product info |
| **Phone** | Phone number | Direct call | Contact cards, ads |
| **Maps** | Location + info | Landing page → Maps | Events, meetups |
| **VCard** | Contact info | Auto-save contact | Business cards |
| **WiFi** | Network credentials | Auto-connect | Offices, cafes |

### Customization Options

**Visual Customization:**
- ✅ Foreground color (QR modules)
- ✅ Background color
- ✅ Border styles (4 types)
- ✅ Border colors
- ✅ Background patterns (4 types)
- ✅ Pattern colors
- ✅ Logo upload and sizing
- ✅ Custom file naming

**Quality Settings:**
- ✅ High error correction (Level H)
- ✅ 30% damage tolerance
- ✅ Optimized for scanning
- ✅ Professional appearance

### Multi-language Support

**Supported Languages:**
- 🇻🇳 Vietnamese (Tiếng Việt)
- 🇬🇧 English

**Translated Elements:**
- UI labels and buttons
- Placeholder text
- Error messages
- Landing pages
- Footer information

### Company Branding

**Footer Display:**
- Company name: HLHV Company
- Usage restriction: Internal use only
- Copyright: © 2025 HLHV Company. All rights reserved.
- Multi-language support

---

## 🚀 Build & Deployment

### Building for Production

**Command:**
```bash
npm run build
```

**Process:**
1. TypeScript compilation
2. Code optimization and minification
3. Asset optimization
4. Tree shaking (removing unused code)
5. Output to `dist/` folder

**Build Time:** 20-60 seconds

**Output Structure:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── map-landing.html
```

### Preview Production Build

**Command:**
```bash
npm run preview
```

- Serves the `dist/` folder
- Simulates production environment
- Opens at `http://localhost:4173`
- Test before deployment

### Deployment Options

#### Option 1: Vercel (Recommended)

1. Create Vercel account at [vercel.com](https://vercel.com)
2. Connect Git repository
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy automatically on git push

#### Option 2: Netlify

1. Create Netlify account at [netlify.com](https://netlify.com)
2. Drag & drop `dist/` folder
3. Or connect Git repository
4. Configure build settings

#### Option 3: GitHub Pages

1. Build the project: `npm run build`
2. Push `dist/` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

#### Option 4: Self-hosted

1. Build: `npm run build`
2. Copy `dist/` folder to web server
3. Configure web server (Apache/Nginx)
4. Serve `index.html` for all routes

### Production Checklist

- [ ] Test all QR code types
- [ ] Test both languages
- [ ] Verify downloads (PNG & SVG)
- [ ] Test on mobile devices
- [ ] Check landing page display
- [ ] Verify QR codes are scannable
- [ ] Test with different browsers
- [ ] Check console for errors

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue 1: "npm: command not found"

**Cause:** Node.js not installed or not in PATH

**Solution:**
1. Download Node.js from [nodejs.org](https://nodejs.org)
2. Install with default settings
3. Restart terminal
4. Verify: `node --version`

---

#### Issue 2: "Port 5173 is already in use"

**Cause:** Another application using the port

**Solution A:** Kill the process
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

**Solution B:** Change port in `vite.config.ts`

---

#### Issue 3: Dependencies installation fails

**Cause:** Network issues, corrupted cache

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

#### Issue 4: QR code not generating

**Possible Causes & Solutions:**

1. **Empty input fields**
   - Fill all required fields
   - Check for validation errors

2. **Invalid data format**
   - URLs should start with http:// or https://
   - Phone numbers should include country code
   - VCard fields should not be empty

3. **Browser console errors**
   - Press F12 to open DevTools
   - Check Console tab for errors
   - Report errors with screenshots

---

#### Issue 5: QR code not scannable

**Solutions:**

1. **Check contrast**
   - Use dark QR color on light background
   - Avoid similar colors
   - Recommended: Black on white

2. **Logo too large**
   - Reduce logo size to 20% or less
   - Smaller logo = better scannability

3. **Pattern interference**
   - Background patterns should be subtle
   - Try removing pattern if scan fails

4. **Print quality**
   - Print at minimum 2x2 cm (0.8x0.8 inches)
   - Use high-quality printer
   - Avoid glossy paper if possible

---

#### Issue 6: "Cannot read properties of null"

**Cause:** Component not fully loaded

**Solution:**
1. Refresh page (F5)
2. Clear browser cache (Ctrl+Shift+Del)
3. Try different browser

---

#### Issue 7: SSL/HTTPS certificate errors

**Cause:** Self-signed certificate not trusted

**Solution:**
1. This is normal for local development
2. Click "Advanced" in browser warning
3. Click "Proceed to localhost"
4. Or use HTTP mode: `npm run dev`

---

#### Issue 8: Landing page not displaying

**Possible Causes:**

1. **File not deployed**
   - Ensure `map-landing.html` is in `public/` folder
   - Check it's included in build output

2. **Wrong URL**
   - QR should contain full URL with parameters
   - Check browser DevTools Network tab

3. **CORS issues**
   - Ensure landing page is on same domain
   - Check server CORS configuration

---

### Getting Help

**Before asking for help:**
1. Check this documentation
2. Search for error message online
3. Check browser console (F12)
4. Try in different browser
5. Verify Node.js version

**When reporting issues, include:**
- Operating System & version
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Browser & version
- Complete error message
- Steps to reproduce
- Screenshots if applicable

---

## 🛠 Technical Stack

### Frontend Framework
- **React 18+**: Modern UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformations
- **Autoprefixer**: Browser compatibility

### QR Code Generation
- **qrcode**: Robust QR code generation
- **Canvas API**: Custom drawing and styling
- **Error Correction Level H**: 30% damage tolerance

### Icons & UI
- **lucide-react**: Beautiful, consistent icons
- **Custom components**: Reusable UI elements

### Development Tools
- **ESLint**: Code linting
- **TypeScript Compiler**: Type checking
- **Vite Dev Server**: Hot module replacement

### Build & Deployment
- **Vite Build**: Optimized production builds
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Optimal loading

### File Structure
```
app_qr_code/
├── public/              # Static files
│   └── map-landing.html # Landing page for Maps
├── src/
│   ├── App.tsx         # Main component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind config
└── HUONG_DAN.md        # This file
```

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📄 License & Credits

**Developed by:** HLHV Company  
**Year:** 2025  
**Usage:** Internal use only  
**Copyright:** © 2025 HLHV Company. All rights reserved.

---

## 🎉 Conclusion

You now have everything you need to use the QR Code Generator application! This guide covers:

- ✅ Complete installation process
- ✅ Configuration options
- ✅ Detailed usage instructions
- ✅ All features and capabilities
- ✅ Build and deployment steps
- ✅ Troubleshooting common issues

**Quick Start Reminder:**
```bash
npm install    # Install dependencies
npm run dev    # Start development server
```

Happy QR Code creating! 🚀

---

*Last updated: 2025*  
*Version: 1.0.0*
