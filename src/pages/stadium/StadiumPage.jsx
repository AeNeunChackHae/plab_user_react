import React from 'react';
import styles from './StadiumPage.module.css'
import StadiumDetails from '../components/Stadium/StadiumDetails/StadiumDetails';
import ContentHeader from '../components/ContentHeader/ContentHeader';



const StadiumPage = () => {
  

  return (
    <>
      <section className={styles.stadiumpage} >
        <ContentHeader />
        <div className={styles.mainContent}>
            <StadiumDetails/>
          
        </div>
      </section>
    </>
  );
};

export default StadiumPage;
