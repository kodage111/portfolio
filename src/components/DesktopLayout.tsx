import CVCard from './CVCard';
import Statistics from './Statistics';
import Experience from './Experience';
import Stacks from './Stacks';
import Education from './Education';

interface DesktopLayoutProps {
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
    animatedExperience: number[];
    experienceRef: React.RefObject<HTMLDivElement>;
    animatedStacks: number[];
    stackProgress: { [key: number]: number };
    stacksRef: React.RefObject<HTMLDivElement>;
    loadedImages: Set<string>;
    handleImageLoad: (src: string) => void;
    animatedEducation: number[];
    educationRef: React.RefObject<HTMLDivElement>;
    devNameShort: string;
    introVisible: boolean;
    introRef: React.RefObject<HTMLDivElement>;
}

export default function DesktopLayout({
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
    animatedExperience,
    experienceRef,
    animatedStacks,
    stackProgress,
    stacksRef,
    loadedImages,
    handleImageLoad,
    animatedEducation,
    educationRef,
    devNameShort,
    introVisible,
    introRef
}: DesktopLayoutProps) {
    return (
        <div className="hidden lg:flex min-h-screen relative">
            <div className="sticky top-8 xl:left-10 w-[520px] max-w-md h-screen flex items-center justify-center p-8">
                <div className="w-full">
                    <CVCard
                        devNameLong={devNameLong}
                        email={email}
                        linkedin={linkedin}
                        github={github}
                        cvCardVisible={cvCardVisible}
                        cvCardRef={cvCardRef}
                    />
                </div>
            </div>

            <div className="overflow-y-auto xl:ms-20">
                <section className="pb-0 pt-36 px-4 lg:px-8">
                    <div
                        ref={introRef}
                        className={`max-w-7xl mx-auto transition-all duration-1000 transform ${introVisible
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-8'
                            }`}
                        style={{ transitionDelay: '0.3s' }}>
                        <div className="mb-12">
                            <div className="mb-8">
                                <h1 className="text-4xl lg:text-5xl font-bold text-white font-oswald mb-2">
                                    I'm {devNameLong},
                                </h1>
                                <h2 className="text-4xl lg:text-5xl font-bold text-white font-oswald mb-2">
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
                                I'm a passionate and endlessly curious developer who thrives on transforming concepts into interactive realities. Whether it's designing sleek user interfaces, building robust APIs, automating cloud deployments, or integrating electronic components into smart systems, I'm always eager to explore, experiment, and push boundaries with emerging technologies.
                            </p>
                        </div>

                        <div className="mb-12">
                            <span className="text-green-400">📱
                                <text className="text-xl underline font-semibold text-green-400 font-rajdhani leading-relaxed max-w-3xl">
                                    Current Focus
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

                <Statistics
                    isVisible={isVisible}
                    projectsCount={projectsCount}
                    experienceCount={experienceCount}
                    clientsCount={clientsCount}
                    statsRef={statsRef}
                />

                <Experience
                    animatedExperience={animatedExperience}
                    experienceRef={experienceRef}
                />

                <Stacks
                    animatedStacks={animatedStacks}
                    stackProgress={stackProgress}
                    stacksRef={stacksRef}
                    loadedImages={loadedImages}
                    handleImageLoad={handleImageLoad}
                />

                <Education
                    animatedEducation={animatedEducation}
                    educationRef={educationRef}
                />

                <footer className="py-8 px-4 lg:px-8 bg-bg-dark border-t border-white/10">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-gray-400 font-rajdhani">
                            © 2024 {devNameShort}. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
