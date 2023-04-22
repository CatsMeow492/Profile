import React, { FC } from 'react';
import styles from './Header.module.css';

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <a href="#" className={styles.logo}>Your Logo</a>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <a href="#home" className={styles.navLink}>Home</a>
                    </li>
                    <li className={styles.navItem}>
                        <a href="#about" className={styles.navLink}>About</a>
                    </li>
                    <li className={styles.navItem}>
                        <a href="#services" className={styles.navLink}>Services</a>
                    </li>
                    <li className={styles.navItem}>
                        <a href="#contact" className={styles.navLink}>Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
