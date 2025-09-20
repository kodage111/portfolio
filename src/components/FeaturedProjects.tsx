import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { AppConstants } from '../utilities/app_constants';
import PlatformTags from './PlatformTags';

export default function FeaturedProjects() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [animatedProjects, setAnimatedProjects] = useState<number[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);

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
                AppConstants.featuredProjects.forEach((_, index) => {
                    setTimeout(() => {
                        setAnimatedProjects(prev => [...prev, index]);
                    }, index * 200);
                });
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [visible]);

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
        <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white text-center mb-16 font-oswald">Projects</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {AppConstants.topProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`transform transition-all duration-700 ${animatedProjects.includes(index)
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <div
                                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                                onClick={() => navigate(`/project/${project.id}`)}
                            >
                                <div className={`h-64 bg-gradient-to-br ${project.backgroundGradient} relative overflow-hidden`}>
                                    {/* Logo/Title Overlay */}
                                    <div className="absolute top-4 left-4 z-10 flex items-center space-x-3">
                                        {project.logo ? (
                                            <img
                                                src={project.logo}
                                                alt={`${project.name} logo`}
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

                                <div className="p-6 bg-black/20">
                                    <h3 className="text-2xl font-bold text-white font-oswald mb-2">{project.name}</h3>
                                    <p className="text-gray-400 text-sm mb-2 font-rajdhani">
                                        {project.category} • {project.pageCount} Pages
                                    </p>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <span className="text-green-300 text-xs font-rajdhani font-semibold uppercase tracking-wide">
                                            Platform:
                                        </span>
                                        <PlatformTags osTypes={project.osTypes} />
                                    </div>

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
                    ))}
                </div>

                <div className="flex flex-col items-center space-y-6">
                    <img
                        src="/icons/menu-panel-seperator.svg"
                        alt="separator"
                        className="w-32 h-8 opacity-60"
                    />
                    <button
                        onClick={() => navigate('/projects')}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-green-600/20 font-rajdhani"
                    >
                        Show More
                    </button>
                </div>
            </div>
        </section>
    );
}
