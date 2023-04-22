import React, { FC } from 'react';
import styles from './SocialMediaButtons.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const SocialMediaButtons: FC = () => {
    console.log('SocialMediaButtons loaded')
    return (
        <div className={styles.socialMediaButtons}>
            <a href="https://www.instagram.com/your_username" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://github.com/your_username" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.linkedin.com/in/your_username" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
            {/* Add more social media links as needed */}
        </div>
    );
};

export default SocialMediaButtons;
