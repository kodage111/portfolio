import React from 'react';

interface PlatformTagsProps {
    osTypes: string | string[];
    className?: string;
}

export default function PlatformTags({ osTypes, className = "" }: PlatformTagsProps) {
    const getPlatformText = (os: string): string => {
        switch (os) {
            case 'ios':
                return 'iOS';
            case 'android':
                return 'Android';
            case 'web':
                return 'Web';
            case 'windows':
                return 'Windows';
            default:
                return os;
        }
    };

    const platforms = Array.isArray(osTypes) ? osTypes : [osTypes];

    return (
        <div className={`flex space-x-2 ${className}`}>
            {platforms.map((os, index) => (
                <span
                    key={index}
                    className="px-2 py-1 bg-yellow-500/20 text-white text-xs rounded-full font-rajdhani font-semibold border border-yellow-500/30"
                >
                    {getPlatformText(os)}
                </span>
            ))}
        </div>
    );
}
