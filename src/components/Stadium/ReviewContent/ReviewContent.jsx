import React from "react";
import styles from "./ReviewContent.module.css";

const reviews = [
  {
    good: "잔디 관리가 잘 되어있어요!",
    bad: "화장실이 멀어요",
  },
  {
    good: "필요 용품이 잘 구비되어있어요!",
    bad: "접근성이 어려워요",
  },
  {
    good: "매니저가 친절해요!",
    bad: "야간에 잘 안보여요",
  },
];

const ReviewContent = () => {
  return (
    <div className={styles.reviewContainer}>
      {/* 제목 */}
      <h3 className={styles.reviewTitle}>해당 구장 리뷰 Top 3</h3>

      {/* 테이블 */}
      <div className={styles.tableWrapper}>
        <table className={styles.reviewTable}>
          <thead>
            <tr>
              <th>좋았던 점</th>
              <th>아쉬웠던 점</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.good}</td>
                <td>{review.bad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewContent;
