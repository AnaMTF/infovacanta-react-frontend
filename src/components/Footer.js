import React, { Component } from 'react';

import "../css/styles.css";
import "../css/header.css";
import "../css/footer.css";

export const Footer = () => {
    return (
        <footer class="footer">
            <div class="footercontainer">
                <span class="text-muted">© InfoVacanță Țițeche Anamaria-Florentina {new Date().getFullYear()}</span>
                <a class="btn btn-dark " href="/login" role="button">Ceva</a>
                <a class="btn btn-dark " href="/login" role="button">Altceva</a>
            </div>
        </footer>
    );
};