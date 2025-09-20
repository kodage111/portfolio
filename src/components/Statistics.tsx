interface StatisticsProps {
    isVisible: boolean;
    projectsCount: number;
    experienceCount: number;
    clientsCount: number;
    statsRef: React.RefObject<HTMLDivElement>;
}

export default function Statistics({
    isVisible,
    projectsCount,
    experienceCount,
    clientsCount,
    statsRef
}: StatisticsProps) {
    return (
        <section className="pt-20 px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div
                    ref={statsRef}
                    className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`} style={{ transitionDelay: '0.2s' }}>
                        <div className="text-5xl lg:text-6xl font-bold text-white font-oswald mb-4">
                            {projectsCount}+
                        </div>
                        <div className="text-gray-300 font-rajdhani text-lg">Completed Projects</div>
                    </div>

                    <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`} style={{ transitionDelay: '0.4s' }}>
                        <div className="text-5xl lg:text-6xl font-bold text-white font-oswald mb-4">
                            {experienceCount}+
                        </div>
                        <div className="text-gray-300 font-rajdhani text-lg">Years of Experience</div>
                    </div>

                    <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`} style={{ transitionDelay: '0.6s' }}>
                        <div className="text-5xl lg:text-6xl font-bold text-white font-oswald mb-4">
                            {clientsCount}+
                        </div>
                        <div className="text-gray-300 font-rajdhani text-lg">Happy Clients</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
