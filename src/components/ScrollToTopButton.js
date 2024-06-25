import React from 'react';
import '../css/scrollToTopButton.css';

import "@fortawesome/fontawesome-free";

export const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="scroll-to-top-button" onClick={handleScrollToTop}>
      <i className="fa-solid fa-chevron-up"></i>
    </button>
  );
};

