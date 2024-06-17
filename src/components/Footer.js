import React, { Component } from 'react';

import "../css/styles.css";
import "../css/header.css";
import "../css/footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footercontainer">
                <span className="text-muted">© InfoVacanță Țițeche Anamaria-Florentina {new Date().getFullYear()}</span>
            </div>
        </footer>
    );
};