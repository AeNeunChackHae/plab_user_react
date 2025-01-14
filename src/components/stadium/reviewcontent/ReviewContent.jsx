import React, { useEffect, useState } from "react";
import styles from "./ReviewContent.module.css";
import { config } from '../../../config.js';

const ReviewContent = ({ stadiumId }) => {
  const api = config.aws.ec2_host_user
  const [reviews, setReviews] = useState({ good: [], bad: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${api}/stadium/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stadiumId }),
        });

        if (!response.ok) throw new Error("리뷰 데이터가 없습니다다.");

        const data = await response.json();
        setReviews(data);
        console.log("리뷰 데이터:", data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err.message);
      }
    };

    fetchReviews();
  }, [stadiumId, api]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.reviewContainer}>
      <h3 className={styles.reviewTitle}>해당 구장 리뷰 Top 3</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.reviewTable}>
          <thead>
            <tr>
              <th>좋았던 점</th>
              <th>아쉬웠던 점</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index}>
                <td>{reviews.good[index] || "-"}</td>
                <td>{reviews.bad[index] || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewContent;
