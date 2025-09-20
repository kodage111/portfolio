import { Github, Linkedin, Mail } from "lucide-react";
import { CustomHeroProps } from "./custom-hero-sm";
import { useState, useEffect } from "react";
import { AppConstants } from "../utilities/app_constants";
import { useNavigate } from "react-router-dom";

export interface DevIcons {
    name: string;
    icon: string;
}

function CustomHeroMD({ devName, role, email, github, linkedin }: CustomHeroProps) {
    const [currentIconIndex, setCurrentIconIndex] = useState(18);
    const [isAnimating, setIsAnimating] = useState(false);
    const devIcons = AppConstants.devIcons;
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);

            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * devIcons.length);
                setIsAnimating(false);
                setCurrentIconIndex(randomIndex);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, [devIcons.length]);

    return (
        <div className="relative w-full h-screen bg-background overflow-hidden md:block hidden duration-300 ease-in">
            <div
                className="absolute bg-black w-screen h-[150vh] left-[50%] rotate-12 "
            />

            <div
                className="absolute bottom-0 right-0 bg-red- w-[50vw] h-full flex justify-center items-end pb-[100px] duration-75 ease-in-out">
                <img
                    src="image.png"
                    alt="Profile"
                    className="h-[calc(100vh-15px-20px)] w-auto object-cover"
                    style={{
                        maxHeight: 'calc(100vh - 15px - 180px)'
                    }}
                />
            </div>

            <div
                className="absolute flex flex-row justify-between z-20 px-16 bg-[#1D1F1D] w-screen h-[65%] max-h-[150px] bottom-0 gap-x-4 overflow-hidden"
            >
                <div className="relative w-[70%] flex flex-col justify-center items-start gap-y-4">
                    <h1 className="text-white text-xl font-bold font-rajdhani underline">The Person Behind</h1>
                    <span className="text-white text-xs lg:text-sm italic font-rajdhani">
                        <span>I'm a passionate and curious {role.toLowerCase()} who loves turning ideas into interactive experiences. Whether it’s crafting sleek UIs, designing APIs, automating cloud deployments or combining and bringing electronic components to life,
                            I’m always excited to build, learn and experiment with new technologies and inovative solutions. Lately I've been focusing on building mobile applications and ...</span>
                        <span
                            className="text-white font-bold hover:text-blue-500 hover:cursor-pointer text-sm italic font-rajdhani"
                            onClick={() => navigate('/about')}
                        >Read more</span>
                    </span>
                </div>
                <div className="relative w-[180px] h-[180px] rotate-[26deg]">
                    <img
                        src={devIcons[currentIconIndex].icon}
                        alt={devIcons[currentIconIndex].name}
                        className={`w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-700 ${isAnimating ? 'opacity-100 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'
                            }`}
                    />
                </div>
            </div>

            <div className="absolute flex flex-col px-16 justify-center items-start w-[50vw] h-screen top-0 left-0 gap-y-1 bg-green-">
                <text className="italic text-black text-[27px] font-rajdhani">Hi, I am</text>
                <span className="font-rajdhani text-black text-[27px] font-rajdhani leading-[40px] font-medium">
                    <p className="font-limelight text-[30px]">{devName}</p>
                    {role}
                </span>

                <div className="relative flex w-max justify-center bg-black text-white px-4 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer hover:shadow-gray-900/25 hover:bg-gray-700 group" onClick={() => navigate('/about')}>
                    <span className="relative z-10 font-semibold">More about me</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-950 to-blue-900 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                </div>

                <div className="flex flex-row justify-start gap-x-4 items-start pt-6">
                    <a
                        href={`mailto:${email}`}
                        className="text-black hover:text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        onClick={() => { }}
                    >
                        <Mail style={{ width: '50px', height: '50px' }} className="filter grayscale hover:grayscale-0 transition-all duration-300" />
                    </a>
                    <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        onClick={() => { }}
                    >
                        <Github style={{ width: '50px', height: '50px' }} className="filter grayscale hover:grayscale-0 transition-all duration-300" />
                    </a>
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        onClick={() => { }}
                    >
                        <Linkedin style={{ width: '50px', height: '50px' }} className="filter grayscale hover:grayscale-0 transition-all duration-300" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CustomHeroMD;