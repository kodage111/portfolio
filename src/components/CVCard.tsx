import { Github, Linkedin, MailIcon, FileDown, Contact } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IconContainer from './icon-container';

interface CVCardProps {
    devNameLong: string;
    email: string;
    linkedin: string;
    github: string;
    cvCardVisible: boolean;
    cvCardRef: React.RefObject<HTMLDivElement>;
}

export default function CVCard({
    devNameLong,
    email,
    linkedin,
    github,
    cvCardVisible,
    cvCardRef
}: CVCardProps) {
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
        <div className="w-full max-w-md">
            <div
                ref={cvCardRef}
                className={`bg-white/10 rounded-2xl border gap-y-4 border-white/5 p-4 h-[calc(100vh-200px)] flex flex-col items-center justify-between transition-all duration-1000 transform ${cvCardVisible
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
                            href={`mailto:${email}`}
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

                <div className="flex flex-col xxs:flex-row w-full gap-3 lg:gap-4">
                    <a
                        href={`download.pdf`}
                        className="bg-white text-black px-4 py-3 lg:py-4 rounded-lg w-full font-rajdhani font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-white/10 flex justify-center items-center space-x-2 text-sm lg:text-base"
                    >
                        <FileDown className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span>Download CV</span>
                    </a>
                    <a
                        href="/#contact"
                        onClick={handleContactClick}
                        className="bg-green-600 text-white px-4 py-3 lg:py-4 rounded-lg w-full font-rajdhani font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-green-600/20 flex justify-center items-center space-x-2 text-sm lg:text-base"
                    >
                        <Contact className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span>Contact Me</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
