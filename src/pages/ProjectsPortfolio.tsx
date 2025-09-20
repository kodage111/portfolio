import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Filter } from 'lucide-react';
import { AppConstants } from '../utilities/app_constants';
import Navigation from '../components/Navigation';
import PlatformTags from '../components/PlatformTags';

export default function ProjectsPortfolio() {
    const navigate = useNavigate();
    const devNameShort = import.meta.env.VITE_NAME_SHORT;
    const [visible, setVisible] = useState(false);
    const [animatedProjects, setAnimatedProjects] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const sectionRef = useRef<HTMLDivElement>(null);

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(AppConstants.featuredProjects.map(p => p.category)))];

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === 'All'
        ? AppConstants.featuredProjects
        : AppConstants.featuredProjects.filter(p => p.category === selectedCategory);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !visible) {
                    setVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [visible]);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                filteredProjects.forEach((_, index) => {
                    setTimeout(() => {
                        setAnimatedProjects(prev => [...prev, index]);
                    }, index * 150);
                });
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [visible, filteredProjects]);

    const getDeviceIcon = (deviceType: string) => {
        switch (deviceType) {
            case 'desktop':
                return '🖥️';
            case 'tablet':
                return '📱';
            case 'mobile':
                return '📱';
            default:
                return '💻';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background-dark to-black">
            <Navigation devName={devNameShort} />

            <div className="py-36 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <h1 className="text-5xl font-bold text-green-400 font-oswald">Projects Portfolio</h1>
                        </div>
                        <p className="text-xl text-gray-300 font-rajdhani max-w-3xl mx-auto">
                            Explore my collection of projects showcasing modern web development,
                            mobile applications and innovative solutions.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setAnimatedProjects([]);
                                }}
                                className={`px-6 py-3 rounded-full font-rajdhani font-semibold transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`transform transition-all duration-700 ${animatedProjects.includes(index)
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                    }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10  overflow-hidden transition-all duration-300 group cursor-pointer"
                                    onClick={() => navigate(`/project/${project.id}`)}>
                                    {/* Visual Section */}
                                    <div className={`h-[350px] bg-gradient-to-br ${project.backgroundGradient} overflow-hidden relative`}>
                                        {/* Logo/Title Overlay */}
                                        <div className="absolute top-4 left-4 z-10 flex items-center space-x-3">
                                            {true ? (
                                                <img
                                                    src={project.logo}
                                                    alt={`$project.name logo`}
                                                    className="w-8 h-8 rounded-lg"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-lg">{getDeviceIcon(project.deviceType)}</span>
                                                </div>
                                            )}
                                            <h3 className="text-xl font-bold text-gray-800 font-oswald">{project.name}</h3>
                                        </div>

                                        {/* Full-size Preview Image */}
                                        <div className='absolute -bottom-2 overflow-hidden max-h-[80%] w-full translate-x-1/2 right-1/2'>
                                            <img
                                                src={project.previewImage}
                                                alt={`${project.name} preview`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Information Section */}
                                    <div className="p-6 bg-black/20">
                                        <h3 className="text-2xl font-bold text-white font-oswald mb-2 group-hover:text-green-300 transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-2 font-rajdhani">
                                            {project.category} • {project.pageCount} Pages
                                        </p>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <span className="text-green-300 text-xs font-rajdhani font-semibold uppercase tracking-wide">
                                                Platform:
                                            </span>
                                            <PlatformTags osTypes={project.osTypes} />
                                        </div>
                                        <p className="text-gray-300 text-sm mb-4 font-rajdhani line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack Bubbles */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.techStack.slice(0, 3).map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full font-rajdhani border border-green-500/30"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && (
                                                <span className="px-3 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full font-rajdhani border border-gray-500/30">
                                                    +{project.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/project/${project.id}`);
                                                }}
                                                className="text-green-400 hover:text-green-300 font-rajdhani text-sm font-semibold transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <a
                                                href={project.repoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 group-hover:scale-105"
                                            >
                                                <ExternalLink className="w-5 h-5 text-white" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16">
                            <Filter className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-400 mb-2 font-oswald">No Projects Found</h3>
                            <p className="text-gray-500 font-rajdhani">
                                No projects match the selected category. Try selecting a different filter.
                            </p>
                        </div>
                    )}

                    {/* Back to Home */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-green-600/20 font-rajdhani"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
