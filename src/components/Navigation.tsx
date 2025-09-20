import { useState, useEffect } from 'react';
import { Menu, X, Mail, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationProps {
    devName: string;
}

function Navigation({ devName }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const role = import.meta.env.VITE_ROLE;
    const email = import.meta.env.VITE_EMAIL;
    const linkedin = import.meta.env.VITE_LINKEDIN;
    const github = import.meta.env.VITE_GITHUB;

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const screenHeight = window.innerHeight;
            const threshold = screenHeight * 0.35;
            setIsScrolled(scrollPosition > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if it's open
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    const scrollToSkills = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // If we're not on the home page, navigate to home first
        if (window.location.pathname !== '/') {
            window.location.href = '/#skills';
            return;
        }

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if it's open
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <nav className="fixed top-0 w-full z-50">
                <div className={`mx-auto md:transition-all md:duration-500 md:ease-in-out ${isScrolled ? 'md:px-0' : 'md:px-4 lg:px-8 md:pt-4'
                    }`}>
                    <div className="hidden md:block">
                        <div className={`bg-black/30 backdrop-blur-md border shadow-lg transition-transform duration-500 ease-in-out ${isScrolled
                            ? 'rounded-none border-b-white/20 border-t-0 border-l-0 border-r-0 px-6 py-4'
                            : 'rounded-2xl border-white/20 px-6 py-4'
                            }`}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center cursor-pointer">
                                    <Link to="/" className="text-2xl font-bold text-white font-oswald">{devName}</Link>
                                </div>

                                <div className="flex items-center space-x-8">
                                    <Link to="/" className="relative hover:px-4 hover:py-2 text-white font-rajdhani group transition-all duration-300 hover:text-green-300">
                                        <span className="relative z-10">Home</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                                    </Link>
                                    <Link to="/about" className="relative hover:px-4 hover:py-2 text-white font-rajdhani group transition-all duration-300 hover:text-green-300">
                                        <span className="relative z-10">About</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                                    </Link>
                                    <Link to="/projects" className="relative hover:px-4 hover:py-2 text-white font-rajdhani group transition-all duration-300 hover:text-green-300">
                                        <span className="relative z-10">Projects</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                                    </Link>
                                    <a href="/#skills" onClick={scrollToSkills} className="relative hover:px-4 hover:py-2 text-white font-rajdhani group transition-all duration-300 hover:text-green-300">
                                        <span className="relative z-10">Skills & Tech</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                                    </a>
                                    <a
                                        href="/#contact"
                                        onClick={scrollToContact}
                                        className="relative bg-white text-black px-4 py-2 rounded-full font-rajdhani transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/25 hover:bg-gray-100 group"
                                    >
                                        <span className="relative z-10 font-semibold">Contact Me</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`md:hidden bg-black/20 backdrop-blur-sm transition-all duration-500 ease-in-out`}>
                        <div className="flex justify-between items-center h-16 px-4">
                            <div className="flex items-center cursor-pointer">
                                <Link to="/">
                                    <span className="text-2xl font-bold text-white font-oswald">{devName}</span>
                                </Link>
                            </div>

                            <div className="md:hidden">
                                <button
                                    onClick={toggleMenu}
                                    className="text-white hover:text-green-300 transition-colors p-2"
                                    aria-label="Toggle menu"
                                >
                                    <div className="relative w-6 h-6">
                                        <Menu
                                            className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}
                                        />
                                        <X
                                            className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`}
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${isMenuOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}>
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={closeMenu}
                />

                <div className={`fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm transition-all duration-500 ease-in-out ${isMenuOpen
                    ? 'transform translate-y-0 opacity-100'
                    : 'transform -translate-y-full opacity-0'
                    }`}>
                    <div className="min-h-screen flex flex-col px-4">
                        <div className="flex flex-col justify-start pt-20 space-y-2">
                            {[
                                { href: '/', label: 'Home', isLink: true },
                                { href: '/about', label: 'About Me', isLink: true },
                                { href: '/projects', label: 'Portfolio', isLink: true },
                                { href: '/#skills', label: 'Skills & Technologies', isSkills: true, isLink: false },
                                { href: '/#contact', label: 'Contact Me', isContact: true, isLink: false }
                            ].map((item, index) => {
                                if (item.isLink) {
                                    return (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            className={`group relative h-[57px] flex items-center justify-center text-lg font-rajdhani transition-all duration-300 transform border border-transparent ${item.isContact
                                                ? 'bg-white text-black hover:border-white hover:bg-gray-100'
                                                : 'text-white hover:border-white hover:bg-white/10'
                                                } ${isMenuOpen
                                                    ? 'translate-y-0 opacity-100'
                                                    : 'translate-y-4 opacity-0'
                                                }`}
                                            style={{
                                                transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
                                            }}
                                            onClick={closeMenu}
                                        >
                                            <span className="transition-all duration-300 group-hover:scale-105 group-hover:font-bold">
                                                {item.label}
                                            </span>
                                        </Link>
                                    );
                                } else {
                                    return (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            onClick={item.isContact ? scrollToContact : item.isSkills ? scrollToSkills : closeMenu}
                                            className={`group relative h-[57px] flex items-center justify-center text-lg font-rajdhani transition-all duration-300 transform border border-transparent ${item.isContact
                                                ? 'bg-white text-black hover:border-white hover:bg-gray-100'
                                                : 'text-white hover:border-white hover:bg-white/10'
                                                } ${isMenuOpen
                                                    ? 'translate-y-0 opacity-100'
                                                    : 'translate-y-4 opacity-0'
                                                }`}
                                            style={{
                                                transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
                                            }}
                                        >
                                            <span className="transition-all duration-300 group-hover:scale-105 group-hover:font-bold">
                                                {item.label}
                                            </span>
                                        </a>
                                    );
                                }
                            })}
                        </div>

                        <div className={`mt-24 flex flex-col items-center space-y-6 transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`} style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}>
                            <p className="text-lg text-white text-center">
                                <span className="font-rajdhani">I'm a </span>
                                <span className="font-limelight text-2xl">{role}</span>
                            </p>

                            <div className="flex justify-center" style={{ marginTop: '14px', marginBottom: '25px' }}>
                                <img
                                    src="/icons/menu-panel-seperator.svg"
                                    alt="separator"
                                />
                            </div>

                            <div className="flex justify-center space-x-8">
                                <a
                                    href={`mailto:${email}`}
                                    className="text-white hover:text-green-300 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                    onClick={closeMenu}
                                >
                                    <Mail className="w-6 h-6" />
                                </a>
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-green-300 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                    onClick={closeMenu}
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-green-300 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                    onClick={closeMenu}
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;
