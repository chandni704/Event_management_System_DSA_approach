import React from 'react';
import './Footer.css'; // We'll create this

const Footer = () => {
    return (
        <div className="footer">
            <div className="social-links">
                <a href="#twitter"><i className="fa-brands fa-square-twitter"></i></a>
                <a href="#email"><i className="fa-solid fa-envelope"></i></a>
                <a href="#insta"><i className="fa-brands fa-instagram"></i></a>
                <a href="#linked"><i className="fa-brands fa-linkedin"></i></a>
                <a href="#facebook"><i className="fa-brands fa-facebook"></i></a>
            </div>
            <div className="footer-links">
                <a href="#privacy-policy">Legal Disclaimer |</a>
                <a href="#privacy-policy">Privacy Policy |</a>
                <a href="#terms">Terms of Use |</a>
                <a href="#support">Privacy & Cookies |</a>
                <a href="#support">Support |</a>
                <a href="Contactus"><i className="fa-solid fa-phone"></i> +91 8050018611</a>
            </div>
        </div>
    );
};

export default Footer;
