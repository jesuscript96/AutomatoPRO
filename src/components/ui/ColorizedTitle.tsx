'use client';

import React, { useEffect, useState } from 'react';

interface ColorizedTitleProps {
    text: string;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const COLORS = ['#F5CC00', '#753B67', '#35A09E'];

export default function ColorizedTitle({ text, className = '', tag = 'h1' }: ColorizedTitleProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Deterministic random function based on seed
    const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    const words = text.split(' ');

    const content = words.map((word, wordIndex) => {
        // Use word content and index as seed for consistency
        const wordSeed = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + wordIndex;

        // Decide if this word should be colored (50% chance)
        const shouldColor = seededRandom(wordSeed) > 0.5;

        if (!shouldColor) {
            return <span key={wordIndex} className="inline-block mr-[0.25em]">{word}</span>;
        }

        // Select one color for this word
        const colorIndex = Math.floor(seededRandom(wordSeed + 1) * COLORS.length);
        const selectedColor = COLORS[colorIndex];

        // Split word into letters
        const letters = word.split('');

        return (
            <span key={wordIndex} className="inline-block mr-[0.25em]">
                {letters.map((letter, letterIndex) => {
                    // Decide if this letter should be colored (40% chance)
                    const letterSeed = wordSeed + letterIndex + 100;
                    const isColored = seededRandom(letterSeed) > 0.6;

                    return (
                        <span
                            key={letterIndex}
                            style={{ color: isColored ? selectedColor : 'inherit' }}
                        >
                            {letter}
                        </span>
                    );
                })}
            </span>
        );
    });

    const Tag = tag as any;

    if (!mounted) {
        return <Tag className={className}>{text}</Tag>;
    }

    return (
        <Tag className={className}>
            {content}
        </Tag>
    );
}
