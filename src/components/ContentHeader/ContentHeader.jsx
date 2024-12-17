import React from 'react';
import styles from './ContentHeader.module.css';

const ContentHeader = () => {
  return (
    <div className={styles.imageContainer}>
      <img src="https://d31wz4d3hgve8q.cloudfront.net/media/ydp_thef_goal.jpeg?w=1920" alt="your-image-url.jpg" />
    </div>
  );
};

export default ContentHeader;
