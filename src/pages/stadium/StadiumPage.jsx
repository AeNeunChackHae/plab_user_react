import React from "react";
import { useParams } from "react-router-dom";
import ContentHeader from "../../components/contentheader/ContentHeader";
import StadiumDetails from "../../components/stadium/stadiumdetails/StadiumDetails";
import styles from "./StadiumPage.module.css";

const StadiumPage = () => {
  const { stadium_id } = useParams();
  console.log(`stadium_id ${stadium_id}`)

  return (
    <section className={styles.stadiumPage}>
      <ContentHeader stadiumId={stadium_id} />
      <div className={styles.mainContent}>
        <StadiumDetails />
      </div>
    </section>
  );
};

export default StadiumPage;
