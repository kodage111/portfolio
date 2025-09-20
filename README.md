# 🚀 Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This project showcases professional skills, projects, and provides an elegant way for potential clients and employers to get in touch.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.3-38B2AC)

## ✨ Features

### 🎨 **Modern Design**

- **Glassmorphism UI**: Beautiful backdrop blur effects and translucent elements
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Professional dark color scheme with green accents
- **Smooth Animations**: Elegant transitions and hover effects

### 📱 **Multi-Page Navigation**

- **Home Page**: Hero section, skills showcase, featured projects, and contact
- **About Page**: Detailed experience, education, and technical stacks
- **Projects Page**: Comprehensive portfolio with detailed project information
- **Smart Navigation**: Intelligent routing that works across all pages

### 🛠️ **Technical Skills Showcase**

- **Categorized Skills**: Organized into Languages, Frameworks & Libraries, Databases, and Tools & Platform
- **Skill Level Indicators**: Visual progress bars showing proficiency levels
- **Interactive Elements**: Hover effects and smooth animations

### 📂 **Project Portfolio**

- **Detailed Project Cards**: Comprehensive information about each project
- **Image Galleries**: Multiple screenshots and previews for each project
- **Technology Stack**: Clear display of technologies used
- **Live Links**: Direct access to repositories and live demos

### 📞 **Contact Integration**

- **Direct Contact Info**: Email and phone number prominently displayed
- **Multiple Contact Methods**: Email, WhatsApp, SMS integration
- **Social Links**: GitHub and LinkedIn integration

## 🛠️ Tech Stack

### **Frontend**

- **React 18.2.0** - Modern UI library
- **TypeScript 5.0.2** - Type-safe development
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **React Router DOM 7.9.1** - Client-side routing
- **Lucide React** - Beautiful icon library

### **Development Tools**

- **Vite 4.4.5** - Fast build tool and dev server
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### **Styling & Design**

- **Custom Fonts**: Rajdhani, Oswald, Limelight
- **Responsive Breakpoints**: Mobile-first design approach
- **Custom Color Palette**: Professional green and dark theme
- **Glassmorphism Effects**: Modern UI design patterns

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_NAME_SHORT=Your Name
   VITE_NAME_LONG=Your Full Name
   VITE_ROLE=Your Professional Role
   VITE_EMAIL=your.email@example.com
   VITE_PHONE=+1234567890
   VITE_LINKEDIN=https://linkedin.com/in/yourprofile
   VITE_GITHUB=https://github.com/yourusername
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the website

## 📁 Project Structure

```
portfolio-website/
├── public/
│   ├── icons/                 # SVG icons and separators
│   ├── logos/                 # Project and company logos
│   └── projects/              # Project images and assets
├── src/
│   ├── components/            # Reusable React components
│   │   ├── Contact.tsx        # Contact section component
│   │   ├── FeaturedProjects.tsx # Projects showcase
│   │   ├── Navigation.tsx     # Navigation bar
│   │   ├── Stacks.tsx         # Skills display component
│   │   └── ...               # Other components
│   ├── pages/                 # Page components
│   │   ├── Home.tsx          # Home page
│   │   ├── About.tsx         # About page
│   │   ├── Projects.tsx      # Projects page
│   │   └── ProjectDetail.tsx # Individual project details
│   ├── utilities/             # Utility files
│   │   ├── app_constants.ts  # Application constants and data
│   │   └── types.d.ts        # TypeScript type definitions
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## 🎨 Customization

### **Personal Information**

Update your personal details in `src/utilities/app_constants.ts`:

- Work experience
- Education history
- Skills and technologies
- Project portfolio

### **Styling**

Modify the design in:

- `tailwind.config.js` - Color scheme and fonts
- `src/index.css` - Global styles
- Individual component files for specific styling

### **Content**

- **Projects**: Add your projects in the `featuredProjects` array
- **Skills**: Update the `stacks` array with your technologies
- **Experience**: Modify the `workExperience` array
- **Education**: Update the `education` array

## 📱 Responsive Design

The website is fully responsive with breakpoints for:

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🚀 Deployment

### **Build for Production**

```bash
npm run build
# or
yarn build
```

### **Preview Production Build**

```bash
npm run preview
# or
yarn preview
```

### **Deploy to Vercel**

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### **Deploy to Netlify**

1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Google Fonts](https://fonts.google.com/)
- **Icons**: [Devicons](https://devicons.github.io/devicon/)
- **Design Inspiration**: Modern portfolio designs and glassmorphism trends

---

⭐ **Star this repository if you found it helpful!**

_Built with ❤️ using React, TypeScript, and Tailwind CSS_
