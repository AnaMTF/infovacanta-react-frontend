import React from 'react';
import '../css/scrollToTopButton.css';

export const ScrollToTopButton = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button className="scroll-to-top-button" onClick={handleScrollToTop}>
            ↑
        </button>
    );
};

