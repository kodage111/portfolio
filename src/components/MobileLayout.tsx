import { MailIcon, Github, Linkedin, FileDown, Contact } from 'lucide-react';
import Statistics from './Statistics';
import Experience from './Experience';
import Stacks from './Stacks';
import Education from './Education';
import IconContainer from './icon-container';
import { useNavigate } from 'react-router-dom';

interface MobileLayoutProps {
    devNameLong: string;
    devRole: string;
    devLocation: string;
    email: string;
    linkedin: string;
    github: string;
    cvCardVisible: boolean;
    cvCardRef: React.RefObject<HTMLDivElement>;
    isVisible: boolean;
    projectsCount: number;
    experienceCount: number;
    clientsCount: number;
    statsRef: React.RefObject<HTMLDivElement>;
    experienceVisible: boolean;
    animatedExperience: number[];
    experienceRef: React.RefObject<HTMLDivElement>;
    stacksVisible: boolean;
    animatedStacks: number[];
    stackProgress: { [key: number]: number };
    stacksRef: React.RefObject<HTMLDivElement>;
    loadedImages: Set<string>;
    handleImageLoad: (src: string) => void;
    educationVisible: boolean;
    animatedEducation: number[];
    educationRef: React.RefObject<HTMLDivElement>;
    devNameShort: string;
}

export default function MobileLayout({
    devNameLong,
    devRole,
    devLocation,
    email,
    linkedin,
    github,
    cvCardVisible,
    cvCardRef,
    isVisible,
    projectsCount,
    experienceCount,
    clientsCount,
    statsRef,
    experienceVisible,
    animatedExperience,
    experienceRef,
    stacksVisible,
    animatedStacks,
    stackProgress,
    stacksRef,
    loadedImages,
    handleImageLoad,
    educationVisible,
    animatedEducation,
    educationRef,
    devNameShort
}: MobileLayoutProps) {
    const navigate = useNavigate();

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    };

    return (
        <div className="lg:hidden">
            <section className="pb-20 pt-36 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-white font-oswald mb-2">
                                I'm {devNameLong},
                            </h1>
                            <h2 className="text-4xl md:text-5xl font-bold text-white font-oswald mb-2">
                                <span className="text-green-400">{devRole}</span> <span className="text-white">|</span>
                            </h2>
                            <p className="text-xl text-gray-300 font-rajdhani">
                                Based in {devLocation}
                            </p>
                        </div>
                        <p className="text-lg text-gray-300 font-rajdhani leading-relaxed max-w-3xl">
                            I specialize in crafting clean, intuitive digital experiences that merge creativity with functionality. With a strong foundation in interactive design, I focus on building interfaces and systems that not only look great but also deliver seamless, engaging user interactions—bringing ideas to life with precision and flair.
                        </p>
                    </div>

                    <div className="mb-12">
                        <span className="text-green-400">🚀
                            <text className="text-xl underline font-semibold text-green-400 font-rajdhani leading-relaxed max-w-3xl">
                                What Drives Me
                            </text>
                        </span>
                        <p className="text-lg text-gray-300 font-rajdhani leading-relaxed max-w-3xl">
                            Lately, I've been diving deep into mobile application development—creating responsive, high-performance apps that solve real-world problems and elevate user experiences. I'm particularly interested in cross-platform frameworks, scalable architectures, and integrating cloud-native features to ensure flexibility and future-readiness
                        </p>
                    </div>

                    <div className="mb-12">
                        <span className="text-green-400">🌐
                            <text className="text-xl underline font-semibold text-green-400 font-rajdhani leading-relaxed max-w-3xl">
                                Beyond the Code
                            </text>
                        </span>
                        <p className="text-lg text-gray-300 font-rajdhani leading-relaxed max-w-3xl">
                            I believe in continuous learning, collaboration, and building solutions that make a meaningful impact. Whether working solo or as part of a team, I bring a hands-on, problem-solving mindset to every project.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-14 px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-green-400 text-center mb-20 font-oswald">Curriculum Vitae</h2>
                <div className="max-w-md mx-auto mb-16">
                    <div
                        ref={cvCardRef}
                        className={`bg-white/10 rounded-2xl border gap-y-4 border-white/5 p-4 h-[calc(100vh-150px)] flex flex-col items-center justify-between transition-all duration-1000 transform ${cvCardVisible
                            ? 'opacity-100 translate-y-0 scale-100'
                            : 'opacity-0 translate-y-8 scale-95'
                            }`}
                        style={{
                            animation: cvCardVisible ? 'bounce 1s ease-out' : 'none'
                        }}
                    >
                        <div className="h-[95%] w-[100%] rounded-xl border border-white/5 shadow-lg overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-bl from-gray-600 via-gray-500 to-gray-800 opacity-30"></div>
                            <img
                                src="image.png"
                                alt="Profile"
                                className="w-full h-full object-cover relative z-10"
                            />
                        </div>

                        <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-2 border border-white/20">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                            <span className="text-white font-rajdhani text-sm font-semibold">Available for work</span>
                        </div>

                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-white font-limelight">{devNameLong}</h1>
                        </div>

                        <div className="flex w-full justify-around gap-x-4">
                            <IconContainer content={
                                <a
                                    href={email}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white group-hover:text-green-400"
                                >
                                    <MailIcon className="w-6 h-6" />
                                </a>
                            } />
                            <IconContainer content={
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white group-hover:text-green-400"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                            } />
                            <IconContainer content={
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white group-hover:text-green-400"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            } />
                        </div>

                        <div className="flex flex-col xxs:flex-row w-full gap-3 sm:gap-4">
                            <a
                                href={`download.pdf`}
                                className="bg-white text-black px-4 sm:px-6 py-3 sm:py-4 rounded-lg w-full font-rajdhani font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-white/10 flex justify-center items-center space-x-2 text-sm sm:text-base"
                            >
                                <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Download CV</span>
                            </a>
                            <a
                                href="/#contact"
                                onClick={handleContactClick}
                                className="bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg w-full font-rajdhani font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-green-600/20 flex justify-center items-center space-x-2 text-sm sm:text-base"
                            >
                                <Contact className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Contact Me</span>
                            </a>
                        </div>
                    </div>

                    <Statistics
                        isVisible={isVisible}
                        projectsCount={projectsCount}
                        experienceCount={experienceCount}
                        clientsCount={clientsCount}
                        statsRef={statsRef}
                    />
                </div>
            </section>

            <Experience
                experienceVisible={experienceVisible}
                animatedExperience={animatedExperience}
                experienceRef={experienceRef}
            />

            <Stacks
                stacksVisible={stacksVisible}
                animatedStacks={animatedStacks}
                stackProgress={stackProgress}
                stacksRef={stacksRef}
                loadedImages={loadedImages}
                handleImageLoad={handleImageLoad}
            />

            <Education
                educationVisible={educationVisible}
                animatedEducation={animatedEducation}
                educationRef={educationRef}
            />

            <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-bg-dark border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-400 font-rajdhani">
                        © 2024 {devNameShort}. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
