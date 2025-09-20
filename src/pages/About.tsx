import Navigation from '../components/Navigation';
import DesktopLayout from '../components/DesktopLayout';
import MobileLayout from '../components/MobileLayout';
import { useState, useEffect, useRef } from 'react';
import { AppConstants } from '../utilities/app_constants';

function About() {
    const devNameShort = import.meta.env.VITE_NAME_SHORT;
    const devNameLong = import.meta.env.VITE_NAME_LONG;
    const devRole = import.meta.env.VITE_ROLE;
    const devLocation = import.meta.env.VITE_LOCATION;
    const email = import.meta.env.VITE_EMAIL;
    const linkedin = import.meta.env.VITE_LINKEDIN;
    const github = import.meta.env.VITE_GITHUB;

    const [isVisible, setIsVisible] = useState(false);
    const [projectsCount, setProjectsCount] = useState(0);
    const [experienceCount, setExperienceCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const statsRef = useRef<HTMLDivElement>(null);

    const [stacksVisible, setStacksVisible] = useState(false);
    const [animatedStacks, setAnimatedStacks] = useState<number[]>([]);
    const [stackProgress, setStackProgress] = useState<{ [key: number]: number }>({});
    const stacksRef = useRef<HTMLDivElement>(null);


    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    const [cvCardVisible, setCvCardVisible] = useState(false);
    const cvCardRef = useRef<HTMLDivElement>(null);

    const [experienceVisible, setExperienceVisible] = useState(false);
    const [animatedExperience, setAnimatedExperience] = useState<number[]>([]);
    const experienceRef = useRef<HTMLDivElement>(null);

    const [educationVisible, setEducationVisible] = useState(false);
    const [animatedEducation, setAnimatedEducation] = useState<number[]>([]);
    const educationRef = useRef<HTMLDivElement>(null);

    const [introVisible, setIntroVisible] = useState(false);
    const introRef = useRef<HTMLDivElement>(null);


    const handleImageLoad = (src: string) => {
        setLoadedImages(prev => new Set(prev).add(src));
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            const duration = 100;
            const steps = 60;
            const stepDuration = duration / steps;

            const projectsInterval = setInterval(() => {
                setProjectsCount(prev => {
                    if (prev >= AppConstants.numberOfProjects) {
                        clearInterval(projectsInterval);
                        return AppConstants.numberOfProjects;
                    }
                    return prev + 1;
                });
            }, stepDuration);

            const experienceInterval = setInterval(() => {
                setExperienceCount(prev => {
                    if (prev >= AppConstants.numberOfExperience) {
                        clearInterval(experienceInterval);
                        return AppConstants.numberOfExperience;
                    }
                    return prev + 1;
                });
            }, stepDuration * 10);

            const clientsInterval = setInterval(() => {
                setClientsCount(prev => {
                    if (prev >= AppConstants.numberOfClients) {
                        clearInterval(clientsInterval);
                        return AppConstants.numberOfClients;
                    }
                    return prev + 1;
                });
            }, stepDuration * 2);

            return () => {
                clearInterval(projectsInterval);
                clearInterval(experienceInterval);
                clearInterval(clientsInterval);
            };
        }
    }, [isVisible]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !cvCardVisible) {
                    setCvCardVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (cvCardRef.current) {
            observer.observe(cvCardRef.current);
        }

        return () => observer.disconnect();
    }, [cvCardVisible]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !experienceVisible) {
                    setExperienceVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (experienceRef.current) {
            observer.observe(experienceRef.current);
        }

        return () => observer.disconnect();
    }, [experienceVisible]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !educationVisible) {
                    setEducationVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (educationRef.current) {
            observer.observe(educationRef.current);
        }

        return () => observer.disconnect();
    }, [educationVisible]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !stacksVisible) {
                    setStacksVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (stacksRef.current) {
            observer.observe(stacksRef.current);
        }

        return () => observer.disconnect();
    }, [stacksVisible]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !introVisible) {
                    setIntroVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (introRef.current) {
            observer.observe(introRef.current);
        }

        return () => observer.disconnect();
    }, [introVisible]);

    useEffect(() => {
        if (experienceVisible) {

            const allExperienceIds = AppConstants.workExperience.map(exp => exp.id);
            setAnimatedExperience(allExperienceIds);
        }
    }, [experienceVisible]);

    useEffect(() => {
        if (educationVisible) {

            const allEducationIds = AppConstants.education.map(edu => edu.id);
            setAnimatedEducation(allEducationIds);
        }
    }, [educationVisible]);

    useEffect(() => {
        if (stacksVisible) {

            const allStackIds = AppConstants.stacks.map(stack => stack.id);
            setAnimatedStacks(allStackIds);


            AppConstants.stacks.forEach((stack) => {
                setStackProgress(prev => ({
                    ...prev,
                    [stack.id]: stack.skillLevel
                }));
            });
        }
    }, [stacksVisible]);

    useEffect(() => {
        const timer = setTimeout(() => {

            if (window.innerWidth >= 1024) {
                if (!cvCardVisible && cvCardRef.current) {
                    setCvCardVisible(true);
                }
                if (!isVisible && statsRef.current) {
                    setIsVisible(true);
                }
                if (!experienceVisible && experienceRef.current) {
                    setExperienceVisible(true);
                }
                if (!educationVisible && educationRef.current) {
                    setEducationVisible(true);
                }
                if (!stacksVisible && stacksRef.current) {
                    setStacksVisible(true);
                }
                if (!introVisible && introRef.current) {
                    setIntroVisible(true);
                }
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black">
            <Navigation devName={devNameShort} />

            <DesktopLayout
                devNameLong={devNameLong}
                devRole={devRole}
                devLocation={devLocation}
                email={email}
                linkedin={linkedin}
                github={github}
                cvCardVisible={cvCardVisible}
                cvCardRef={cvCardRef}
                isVisible={isVisible}
                projectsCount={projectsCount}
                experienceCount={experienceCount}
                clientsCount={clientsCount}
                statsRef={statsRef}
                animatedExperience={animatedExperience}
                experienceRef={experienceRef}
                animatedStacks={animatedStacks}
                stackProgress={stackProgress}
                stacksRef={stacksRef}
                loadedImages={loadedImages}
                handleImageLoad={handleImageLoad}
                animatedEducation={animatedEducation}
                educationRef={educationRef}
                devNameShort={devNameShort}
                introVisible={introVisible}
                introRef={introRef}
            />

            <MobileLayout
                devNameLong={devNameLong}
                devRole={devRole}
                devLocation={devLocation}
                email={email}
                linkedin={linkedin}
                github={github}
                cvCardVisible={cvCardVisible}
                cvCardRef={cvCardRef}
                isVisible={isVisible}
                projectsCount={projectsCount}
                experienceCount={experienceCount}
                clientsCount={clientsCount}
                statsRef={statsRef}
                animatedExperience={animatedExperience}
                experienceRef={experienceRef}
                animatedStacks={animatedStacks}
                stackProgress={stackProgress}
                stacksRef={stacksRef}
                loadedImages={loadedImages}
                handleImageLoad={handleImageLoad}
                animatedEducation={animatedEducation}
                educationRef={educationRef}
                devNameShort={devNameShort}
            />
        </div>
    );
}

export default About;