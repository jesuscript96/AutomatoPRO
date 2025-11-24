'use client';
import { useEffect, useState } from 'react';

const COLORS = ['#F5CC00', '#753B67', '#35A09E'];

interface ColoredLinesBackgroundProps {
    lineCount?: number;
    className?: string;
}

export default function ColoredLinesBackground({ lineCount = 9, className = '' }: ColoredLinesBackgroundProps) {
    const [lineColors, setLineColors] = useState<string[]>([]);

    useEffect(() => {
        const colors = [];
        for (let i = 0; i < lineCount; i++) {
            colors.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
        }
        setLineColors(colors);
    }, [lineCount]);

    const getLineStyle = (index: number) => {
        return {
            borderColor: lineColors[index] || '#000000', // Default to black before mount
            transition: 'border-color 0.5s ease'
        };
    };

    return (
        <div className={`absolute inset-0 flex flex-col pointer-events-none z-0 ${className}`}>
            {Array.from({ length: lineCount }).map((_, index) => (
                <div
                    key={index}
                    className="relative w-full flex-1 border-b"
                    style={getLineStyle(index)}
                />
            ))}
        </div>
    );
}
