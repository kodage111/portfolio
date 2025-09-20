import { Star, GraduationCap } from 'lucide-react';
import { AppConstants } from '../utilities/app_constants';
import { Education as EducationType } from '../utilities/types';

interface EducationProps {
    animatedEducation: number[];
    educationRef: React.RefObject<HTMLDivElement>;
}

export default function Education({
    animatedEducation,
    educationRef
}: EducationProps) {
    return (
        <section className="px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center my-12">
                    <Star className="w-8 h-8 text-white mr-4" />
                    <h2 className="text-4xl font-bold text-white font-oswald">Education</h2>
                </div>

                <div ref={educationRef} className="space-y-6">
                    {AppConstants.education.map((education: EducationType) => (
                        <div
                            key={education.id}
                            className={`bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-500 transform ${animatedEducation.includes(education.id)
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-8 scale-95'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white font-oswald mb-1">
                                            {education.field}, {education.degree}
                                        </h3>
                                        <p className="text-gray-300 font-rajdhani mb-1">
                                            {education.institution}
                                        </p>
                                        <p className="text-gray-400 font-rajdhani text-sm">
                                            {education.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold font-rajdhani whitespace-nowrap ml-4">
                                    {education.dates}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
