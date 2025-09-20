import { Layers } from 'lucide-react';
import { AppConstants } from '../utilities/app_constants';
import { Stack } from '../utilities/types';

interface StacksProps {
    stacksVisible: boolean;
    animatedStacks: number[];
    stackProgress: { [key: number]: number };
    stacksRef: React.RefObject<HTMLDivElement>;
    loadedImages: Set<string>;
    handleImageLoad: (src: string) => void;
}

export default function Stacks({
    stacksVisible,
    animatedStacks,
    stackProgress,
    stacksRef,
    loadedImages,
    handleImageLoad
}: StacksProps) {
    return (
        <section className="px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center my-12">
                    <Layers className="w-8 h-8 text-white mr-4" />
                    <h2 className="text-4xl font-bold text-white font-oswald">Stacks</h2>
                </div>

                <div ref={stacksRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {AppConstants.stacks
                        .sort((a, b) => b.skillLevel - a.skillLevel)
                        .map((stack: Stack) => (
                            <div
                                key={stack.id}
                                className={`bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-500 group transform ${animatedStacks.includes(stack.id)
                                    ? 'opacity-100 translate-y-0 scale-100'
                                    : 'opacity-0 translate-y-8 scale-95'
                                    }`}
                            >
                                <div className="flex items-center space-x-4 mb-4">

                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white/10">
                                        {loadedImages.has(stack.icon) ? (
                                            <img
                                                src={stack.icon}
                                                alt={`${stack.name} icon`}
                                                className="w-8 h-8 object-contain"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 bg-gray-600 rounded animate-pulse flex items-center justify-center">
                                                <span className="text-white text-xs">⏳</span>
                                            </div>
                                        )}
                                        <img
                                            src={stack.icon}
                                            alt={`${stack.name} icon`}
                                            className="w-8 h-8 object-contain hidden"
                                            onLoad={() => handleImageLoad(stack.icon)}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white font-oswald mb-1">
                                            {stack.name}
                                        </h3>
                                        <p className="text-gray-300 font-rajdhani text-sm">
                                            {stack.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full group-hover:from-green-400 group-hover:to-green-300"
                                            style={{
                                                width: `${stackProgress[stack.id] || 0}%`
                                            }}
                                        ></div>
                                    </div>

                                    <div className="absolute -top-8 right-0 bg-white text-black px-2 py-1 rounded text-xs font-semibold font-rajdhani opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        {Math.round(stackProgress[stack.id] || 0)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}
