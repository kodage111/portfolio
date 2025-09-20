import { Code, Database, Layers, Wrench } from 'lucide-react'
import CustomHeroSM from '../components/custom-hero-sm';
import CustomHeroMD from '../components/custom-hero-md';
import Navigation from '../components/Navigation';
import Contact from '../components/Contact';
import FeaturedProjects from '../components/FeaturedProjects';
import { AppConstants } from '../utilities/app_constants';
import { Stack } from '../utilities/types';

function Home() {
    const devNameShort = import.meta.env.VITE_NAME_SHORT;
    const devNameLong = import.meta.env.VITE_NAME_LONG;
    const role = import.meta.env.VITE_ROLE;
    const email = import.meta.env.VITE_EMAIL;
    const linkedin = import.meta.env.VITE_LINKEDIN;
    const github = import.meta.env.VITE_GITHUB;
    const phone = import.meta.env.VITE_PHONE;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background-dark to-black">
            <Navigation devName={devNameShort} />

            <CustomHeroSM devName={devNameLong} role={role} email={email} github={github} linkedin={linkedin} />
            <CustomHeroMD devName={devNameLong} role={role} email={email} github={github} linkedin={linkedin} />

            <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-16 font-oswald">Skills & Technologies</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                            {
                                category: "Languages",
                                icon: Code,
                                stacks: AppConstants.stacks.filter(stack => stack.category === "Languages").sort((a, b) => b.skillLevel - a.skillLevel)
                            },
                            {
                                category: "Frameworks & Libraries",
                                icon: Layers,
                                stacks: AppConstants.stacks.filter(stack => stack.category === "Frameworks & Libraries").sort((a, b) => b.skillLevel - a.skillLevel)
                            },
                            {
                                category: "Databases",
                                icon: Database,
                                stacks: AppConstants.stacks.filter(stack => stack.category === "Databases").sort((a, b) => b.skillLevel - a.skillLevel)
                            },
                            {
                                category: "Tools & Platform",
                                icon: Wrench,
                                stacks: AppConstants.stacks.filter(stack => stack.category === "Tools & Platform").sort((a, b) => b.skillLevel - a.skillLevel)
                            }
                        ].map((categoryData) => {
                            const IconComponent = categoryData.icon;
                            return (
                                <div key={categoryData.category} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                                    <div className="flex items-center mb-6">
                                        <IconComponent className="w-8 h-8 text-green-400 mr-3" />
                                        <h3 className="text-2xl font-bold text-white font-oswald">{categoryData.category}</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {categoryData.stacks.map((stack: Stack) => (
                                            <div key={stack.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 flex-shrink-0">
                                                        <img
                                                            src={stack.icon}
                                                            alt={`${stack.name} icon`}
                                                            className="w-6 h-6 object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="text-white font-semibold font-rajdhani text-sm truncate">
                                                                {stack.name}
                                                            </h4>
                                                            <span className="text-green-400 font-semibold font-rajdhani text-xs">
                                                                {stack.skillLevel}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
                                                                style={{ width: `${stack.skillLevel}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <FeaturedProjects />

            <Contact email={email} phone={phone} />

            <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-400 font-rajdhani">
                        © 2024 {devNameShort}. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Home
