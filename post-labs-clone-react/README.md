# Post Labs Clone - React

A modern, responsive React clone of the Post Labs website built with Vite, featuring smooth animations and a sleek design.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: Powered by GSAP for professional-grade animations
- **Modern UI**: Clean, minimalist design inspired by Post Labs
- **Fast Development**: Built with Vite for lightning-fast development and builds
- **Component-Based Architecture**: Modular React components for easy maintenance
- **ESLint Integration**: Code quality and consistency with ESLint

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Animations**: GSAP (GreenSock Animation Platform)
- **Styling**: CSS with external stylesheet integration
- **Development Tools**: ESLint, TypeScript types
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd post-labs-clone-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🏃‍♂️ Usage

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Lint Code
```bash
npm run lint
```
Runs ESLint to check code quality and style.

## 📁 Project Structure

```
post-labs-clone-react/
├── public/
│   └── ... (static assets)
├── src/
│   ├── assets/
│   │   ├── hero-glow.svg
│   │   └── react.svg
│   ├── components/
│   │   ├── AnnouncementBar.jsx
│   │   ├── Cards.jsx
│   │   ├── FloatingGrid.jsx
│   │   └── Header.jsx
│   ├── sections/
│   │   ├── About.jsx
│   │   ├── BottomVideo.jsx
│   │   ├── Building.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   └── VideoCurtain.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

### Key Components

- **AnnouncementBar**: Top notification bar
- **HeroSection**: Main landing section with hero content
- **About**: About section
- **VideoCurtain**: Video display section
- **Building**: Building/features section
- **BottomVideo**: Additional video content
- **Contact**: Contact information
- **Footer**: Site footer

## 🎨 Customization

### Styling
The project uses external stylesheets from the original Post Labs site. To customize styles:

1. Modify the linked CSS files in `index.html`
2. Add custom styles in `src/index.css`
3. Override component-specific styles as needed

### Animations
GSAP is used for animations. Key animation files and configurations can be found in the respective components.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes only. Please respect the original Post Labs website's intellectual property.

## 🙏 Acknowledgments

- Original design by [Post Labs](https://postlabs.com)
- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Animations by [GSAP](https://greensock.com/gsap/)

---

**Note**: This is a clone project created for learning and demonstration purposes. Not affiliated with the original Post Labs company.
