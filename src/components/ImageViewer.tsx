import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ImageViewerProps {
    images: Array<{
        id: number;
        image: string;
        description: string;
    }>;
    isOpen: boolean;
    onClose: () => void;
    initialIndex?: number;
}

export default function ImageViewer({ images, isOpen, onClose, initialIndex = 0 }: ImageViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [controlBgColor, setControlBgColor] = useState('bg-white/10');
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setCurrentIndex(initialIndex);
        setZoom(1);
        setRotation(0);
    }, [initialIndex, isOpen]);

    useEffect(() => {
        if (imageRef.current && imageRef.current.complete) {
            detectImageColor(imageRef.current);
        }
    }, [currentIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
                case '+':
                case '=':
                    e.preventDefault();
                    setZoom(prev => Math.min(prev + 0.25, 3));
                    break;
                case '-':
                    e.preventDefault();
                    setZoom(prev => Math.max(prev - 0.25, 0.5));
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    setRotation(prev => (prev + 90) % 360);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
        setZoom(1);
        setRotation(0);
    };

    const goToNext = () => {
        setCurrentIndex(prev => (prev + 1) % images.length);
        setZoom(1);
        setRotation(0);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = images[currentIndex].image;
        link.download = `${images[currentIndex].description.replace(/\s+/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const resetView = () => {
        setZoom(1);
        setRotation(0);
    };

    const detectImageColor = (imageElement: HTMLImageElement) => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = 100;
            canvas.height = 100;

            ctx.drawImage(imageElement, 0, 0, 100, 100);
            const imageData = ctx.getImageData(0, 0, 100, 100);
            const data = imageData.data;

            let totalR = 0, totalG = 0, totalB = 0;
            let pixelCount = 0;

            for (let i = 0; i < data.length; i += 4) {
                const x = (i / 4) % 100;
                const y = Math.floor((i / 4) / 100);

                if (x >= 30 && x <= 70 && y >= 30 && y <= 70) {
                    totalR += data[i];
                    totalG += data[i + 1];
                    totalB += data[i + 2];
                    pixelCount++;
                }
            }

            if (pixelCount === 0) return;

            const avgR = totalR / pixelCount;
            const avgG = totalG / pixelCount;
            const avgB = totalB / pixelCount;

            const brightness = (avgR * 0.299 + avgG * 0.587 + avgB * 0.114);

            const isLight = brightness > 128;

            if (isLight) {
                setControlBgColor('bg-black/30 backdrop-blur-md');
            } else {
                setControlBgColor('bg-white/20 backdrop-blur-md');
            }
        } catch (error) {
            console.log('Color detection failed:', error);
            setControlBgColor('bg-white/10 backdrop-blur-sm');
        }
    };

    const handleImageLoad = () => {
        setIsLoading(false);
        if (imageRef.current) {
            detectImageColor(imageRef.current);
        }
    };

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <div className="fixed inset-0 z-50  bg-gradient-to-br from-black via-background-dark to-black flex items-center justify-center">
            {/* Close Button */}
            <button
                onClick={onClose}
                className={`absolute top-4 right-4 z-10 w-12 h-12 ${controlBgColor} hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group`}
            >
                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 ${controlBgColor} hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group`}
                    >
                        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={goToNext}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 ${controlBgColor} hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group`}
                    >
                        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </>
            )}

            {/* Image Container */}
            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                <div className="relative">
                    <img
                        ref={imageRef}
                        src={currentImage.image}
                        alt={currentImage.description}
                        className="max-w-full max-h-[80vh] object-contain transition-all duration-300"
                        style={{
                            transform: `scale(${zoom}) rotate(${rotation}deg)`,
                            transformOrigin: 'center',
                        }}
                        onLoad={handleImageLoad}
                        onLoadStart={() => setIsLoading(true)}
                    />

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 ${controlBgColor} rounded-full px-6 py-3`}>
                {/* Zoom Controls */}
                <button
                    onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.5))}
                    className={`w-10 h-10 ${controlBgColor} hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group`}
                    disabled={zoom <= 0.5}
                >
                    <ZoomOut className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>

                <span className="text-white font-rajdhani text-sm min-w-[3rem] text-center">
                    {Math.round(zoom * 100)}%
                </span>

                <button
                    onClick={() => setZoom(prev => Math.min(prev + 0.25, 3))}
                    className={`w-10 h-10 ${controlBgColor} hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group`}
                    disabled={zoom >= 3}
                >
                    <ZoomIn className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>

                {/* Rotate */}
                <button
                    onClick={() => setRotation(prev => (prev + 90) % 360)}
                    className={`w-10 h-10 ${controlBgColor} hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group`}
                >
                    <RotateCw className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>

                {/* Reset */}
                <button
                    onClick={resetView}
                    className={`w-10 h-10 ${controlBgColor} hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group`}
                >
                    <span className="text-white text-sm font-bold">R</span>
                </button>

                {/* Download */}
                <button
                    onClick={handleDownload}
                    className={`w-10 h-10 ${controlBgColor} hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group`}
                >
                    <Download className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
                <div className={`absolute top-4 left-4 ${controlBgColor} rounded-full px-4 py-2`}>
                    <span className="text-white font-rajdhani text-sm">
                        {currentIndex + 1} / {images.length}
                    </span>
                </div>
            )}

            {/* Image Description */}
            <div className={`absolute top-6 left-1/2 -translate-x-1/2 ${controlBgColor} rounded-lg px-4 py-2 max-w-md`}>
                <p className="text-white font-rajdhani text-sm text-center">
                    {currentImage.description}
                </p>
            </div>

            {/* Thumbnail Strip */}
            {/* {images.length > 1 && (
                <div className="hidden md:flex absolute bottom-4 left-4 space-x-2 max-w-[80vw] overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => {
                                setCurrentIndex(index);
                                setZoom(1);
                                setRotation(0);
                            }}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === currentIndex
                                ? 'border-green-400 scale-110'
                                : 'border-white/20 hover:border-white/40'
                                }`}
                        >
                            <img
                                src={image.image}
                                alt={image.description}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )} */}
        </div>
    );
}
