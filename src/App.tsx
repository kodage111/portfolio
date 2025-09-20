import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ProjectDetail from './pages/ProjectDetail'
import ProjectsPortfolio from './pages/ProjectsPortfolio'


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/projects" element={<ProjectsPortfolio />} />
        </Routes>
    )
}

export default App
