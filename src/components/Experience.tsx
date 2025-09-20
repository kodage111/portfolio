import { Star, Briefcase } from 'lucide-react';
import { AppConstants } from '../utilities/app_constants';
import { Experience as ExperienceType } from '../utilities/types';

interface ExperienceProps {
    experienceVisible: boolean;
    animatedExperience: number[];
    experienceRef: React.RefObject<HTMLDivElement>;
}

export default function Experience({
    experienceVisible,
    animatedExperience,
    experienceRef
}: ExperienceProps) {
    return (
        <section className="px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center my-12">
                    <Star className="w-8 h-8 text-white mr-4" />
                    <h2 className="text-4xl font-bold text-white font-oswald">Experience</h2>
                </div>

                <div ref={experienceRef} className="space-y-6">
                    {AppConstants.workExperience.map((experience: ExperienceType) => (
                        <div
                            key={experience.id}
                            className={`bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-500 transform ${animatedExperience.includes(experience.id)
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-8 scale-95'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        {experience.id === 1 ? (
                                            <img
                                                src="/logos/spreeloop_logo.png"
                                                alt={`${experience.company} logo`}
                                                className="w-full h-full object-fill rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-green-600 rounded-lg flex items-center justify-center">
                                                <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white font-oswald mb-1">
                                            {experience.title}
                                        </h3>
                                        <p className="text-gray-300 font-rajdhani mb-1">
                                            {experience.company}
                                        </p>
                                        <p className="text-gray-400 font-rajdhani text-sm">
                                            {experience.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold font-rajdhani whitespace-nowrap ml-4">
                                    {experience.dates}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-white font-semibold font-rajdhani mb-2">Responsibilities:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {experience.responsibilities.map((responsibility, index) => (
                                        <li key={index} className="text-gray-300 font-rajdhani text-sm leading-relaxed">
                                            {responsibility}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold font-rajdhani mb-2">Tech Stack:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {experience.techStack.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-xs font-rajdhani border border-green-600/30"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
