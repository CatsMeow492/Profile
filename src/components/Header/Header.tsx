import React, { FC, useState } from 'react';
import styles from './Header.module.css';
import NextImage from 'next/image';
import Link from 'next/link';
import { fallDown as Menu } from 'react-burger-menu';

const Header: FC = () => {
    const logo = '/tbc.svg';
    const [menuOpen, setMenuOpen] = useState(false);

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };

    const menuStyles = {
        bmBurgerButton: {
            position: 'absolute',
            width: '36px',
            height: '30px',
            right: '36px',
            top: '3.7%',
            transform: 'translateY(-50%)',
        },
        bmBurgerBars: {
          background: '#fff',
        },
        bmMenu: {
          background: '#333',
          padding: '2.5em 1.5em 0',
        },
        bmMenuItem: {
          display: 'block',
          padding: '1em',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 'bold',
          outline: 'none',
        },
        bmMenuWrap: {
          top: 0,
        },
      };
      

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoContainer} style={{ maxWidth: 'none' }}>
                        <NextImage src={logo} alt="Your Logo" width="250" height="100" />
                    </div>
                </Link>
                <Menu
                right
                isOpen={menuOpen}
                onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                styles={menuStyles}
                >
                    <span className={styles.closeButton} onClick={() => setMenuOpen(false)}>
                        &times;
                    </span>
                    <a href="#home" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Home
                    </a>
                    <a href="#about" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        About
                    </a>
                    <a href="#services" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Services
                    </a>
                    <a href="#contact" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Contact
                    </a>
                </Menu>
            </nav>
        </header>
    );
};

export default Header;
