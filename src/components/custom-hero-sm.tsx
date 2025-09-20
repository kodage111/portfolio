import { Github, Linkedin, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface CustomHeroProps {
    devName: string;
    role: string;
    email: string;
    github: string;
    linkedin: string;
}

function CustomHeroSM({ devName, role, email, github, linkedin }: CustomHeroProps) {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-[85vh] bg-black overflow-hidden block md:hidden">
            <div
                className="absolute w-[800px] h-[822px] bg-[#D7D7D7] bottom-0 left-0 xxs:-left-1 sm:left-10 top-[65%] xxs:top-[55%] rotate-0 xxs:rotate-[-102deg] transition-all duration-300 ease-in-out"
            />

            <div
                className="absolute bottom-0 -right-[22px] xs:-right-[140px] duration-200 ease-in">
                <img
                    src="image.png"
                    alt="Profile"
                    className="h-[calc(100vh-15px-64px)] w-auto object-cover"
                    style={{
                        maxHeight: 'calc(100vh - 15px - 64px)'
                    }}
                />
            </div>

            <div
                className="absolute bg-black bg-opacity-[56%] w-[800px] h-[822px] bottom-0 left-0 xxs:-left-1 sm:left-10 top-[65%] xxs:top-[55%] rotate-0 xxs:rotate-[-102deg] transition-all duration-300 ease-in-out"
            />

            <div
                className="absolute flex flex-wrap justify-between items-end w-screen bottom-0 left-0 px-4 sm:px-8 pb-3 ">
                <div className="flex flex-col justify-center gap-y-2">
                    <text className="text-white text-xl italic font-rajdhani">Hi, I am</text>
                    <span className="text-white text-2xl font-rajdhani">
                        <p className="font-limelight text-2xl">{devName}</p>{role}
                    </span>
                    <div className="relative flex w-max justify-center bg-black text-white px-4 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer hover:shadow-gray-900/25 hover:bg-gray-700 group" onClick={() => navigate('/about')}>
                        <span className="relative z-10 font-semibold">More about me</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-green-950 to-blue-900 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                    </div>
                </div>

                <div className="flex-row xxs:flex-col justify-start xxs:justify-center w-full xxs:w-auto gap-y-2 hidden xxs:flex transition-all duration-300 ease-in-out">
                    <a
                        href={`mailto:${email}`}
                        className="text-white hover:text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        onClick={() => { }}
                    >
                        <Mail style={{ width: '50px', height: '50px' }} />
                    </a>
                    <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        onClick={() => { }}
                    >
                        <Github style={{ width: '50px', height: '50px' }} />
                    </a>
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        onClick={() => { }}
                    >
                        <Linkedin style={{ width: '50px', height: '50px' }} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CustomHeroSM;