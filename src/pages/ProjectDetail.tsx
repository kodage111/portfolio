import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, User, Code, Globe } from 'lucide-react';
import { AppConstants } from '../utilities/app_constants';
import Navigation from '../components/Navigation';
import ImageViewer from '../components/ImageViewer';
import PlatformTags from '../components/PlatformTags';

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const devNameShort = import.meta.env.VITE_NAME_SHORT;
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const project = AppConstants.featuredProjects.find(p => p.id === parseInt(id || '0'));

    const openImageViewer = (index: number) => {
        setSelectedImageIndex(index);
        setIsImageViewerOpen(true);
    };

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background-dark to-black">
                <Navigation devName={devNameShort} />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4 font-oswald">Project Not Found</h1>
                        <p className="text-gray-300 mb-8 font-rajdhani">The project you're looking for doesn't exist.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 font-rajdhani"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 mb-8 font-rajdhani"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        <div className={`h-96 bg-gradient-to-br ${project.backgroundGradient} rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden`}>
                            <div className="flex items-center space-x-4">
                                {project.logo ? (
                                    <img
                                        src={project.logo}
                                        alt={`${project.name} logo`}
                                        className="w-12 h-12 rounded-lg"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-2xl">{getDeviceIcon(project.deviceType)}</span>
                                    </div>
                                )}
                                <h1 className="text-3xl font-bold text-gray-800 font-oswald">{project.name}</h1>
                            </div>

                            {/* Large Preview Image */}
                            <div className="flex justify-center items-center">
                                <div className="absolute -bottom-2 overflow-hidden  rounded-lg  shadow-2xl max-h-[80%]">
                                    <img
                                        src={project.previewImage}
                                        alt={`${project.name} preview`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-4xl font-bold text-white mb-4 font-oswald">{project.name}</h2>
                            <p className="text-xl text-gray-300 mb-6 font-rajdhani leading-relaxed">
                                {project.description}
                            </p>

                            {/* Project Meta */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300 font-rajdhani">{project.category}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <User className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300 font-rajdhani">{project.pageCount} Pages</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Globe className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300 font-rajdhani capitalize">{project.deviceType} Application</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Code className="w-5 h-5 text-green-400" />
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-300 font-rajdhani">Platform:</span>
                                        <PlatformTags osTypes={project.osTypes} />
                                    </div>
                                </div>
                            </div>

                            {/* External Link Button */}
                            <a
                                href={project?.liveLink || project.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-green-600/20 font-rajdhani"
                            >
                                <ExternalLink className="w-5 h-5" />
                                <span>View Live Project</span>
                            </a>
                        </div>
                    </div>

                    {/* Tech Stack Section */}
                    <div className="mb-16">
                        <div className="flex items-center space-x-3 mb-8">
                            <Code className="w-8 h-8 text-green-400" />
                            <h3 className="text-3xl font-bold text-white font-oswald">Technologies Used</h3>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {project.techStack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-6 py-3 bg-green-500/20 text-green-300 text-lg rounded-full font-rajdhani border border-green-500/30 hover:bg-green-500/30 transition-all duration-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Project Images Gallery */}
                    <div className="mb-16">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                                <span className="text-black text-sm">📱</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white font-oswald">Project Screenshots</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.images.map((image, index) => (
                                <div
                                    key={image.id}
                                    onClick={() => openImageViewer(index)}
                                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={image.image}
                                            alt={image.description}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-300 text-sm font-rajdhani text-center">
                                            {image.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project Description */}
                    <div className="mb-16">
                        <h3 className="text-3xl font-bold text-white mb-8 font-oswald">About This Project</h3>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                            <p className="text-lg text-gray-300 leading-relaxed font-rajdhani mb-6">
                                {project.description}
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed font-rajdhani">
                                {project.functionality}
                            </p>
                        </div>
                    </div>

                    {/* Related Projects */}
                    <div className="mb-16">
                        <h3 className="text-3xl font-bold text-white mb-8 font-oswald">Other Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {AppConstants.featuredProjects
                                .filter(p => p.id !== project.id)
                                .slice(0, 2)
                                .map((relatedProject) => (
                                    <div
                                        key={relatedProject.id}
                                        onClick={() => navigate(`/project/${relatedProject.id}`)}
                                        className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className="flex items-center space-x-4 mb-4">
                                            {relatedProject.logo ? (
                                                <img
                                                    src={relatedProject.logo}
                                                    alt={`${relatedProject.name} logo`}
                                                    className="w-10 h-10 rounded-lg"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-lg">{getDeviceIcon(relatedProject.deviceType)}</span>
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="text-xl font-bold text-white font-oswald group-hover:text-green-300 transition-colors">
                                                    {relatedProject.name}
                                                </h4>
                                                <p className="text-gray-400 text-sm font-rajdhani">
                                                    {relatedProject.category} • {relatedProject.pageCount} Pages
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 font-rajdhani">
                                            {relatedProject.description.substring(0, 100)}...
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Viewer Modal */}
            <ImageViewer
                images={project.images}
                isOpen={isImageViewerOpen}
                onClose={() => setIsImageViewerOpen(false)}
                initialIndex={selectedImageIndex}
            />
        </div>
    );
}
