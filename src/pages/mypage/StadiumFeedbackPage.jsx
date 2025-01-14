import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './StadiumFeedbackPage.module.css';
import { config } from '../../config';

const StadiumReviewForm = () => {
    const api = config.aws.ec2_host_user
    const { matchId } = useParams();
    const navigate = useNavigate();
    const [stadiumInfo, setStadiumInfo] = useState({ stadiumName: '', fullAddress: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [positiveFeedback, setPositiveFeedback] = useState([]);
    const [negativeFeedback, setNegativeFeedback] = useState([]);

    const positiveOptions = [
        { label: '시설 정보가 정확해요', value: 0 },
        { label: '잔디 상태가 좋아요', value: 1 },
        { label: '화장실이 깨끗해요', value: 2 },
        { label: '샤워실이 잘 되어 있어요', value: 3 },
        { label: '대기 공간이 쾌적해요', value: 4 },
        { label: '주차하기 편해요', value: 5 },
        { label: '접근성이 좋아요', value: 6 },
        { label: '가격이 합리적이에요', value: 7 },
    ];

    const negativeOptions = [
        { label: '시설 정보가 달라요', value: 0 },
        { label: '잔디 상태가 안 좋아요', value: 1 },
        { label: '화장실이 청결하지 않아요', value: 2 },
        { label: '샤워실이 쾌적하지 않아요', value: 3 },
        { label: '대기 공간이 불편해요', value: 4 },
        { label: '주차하기 불편해요', value: 5 },
        { label: '접근성이 불편해요', value: 6 },
        { label: '야간 조명이 어두워요', value: 7 },
    ];

    useEffect(() => {
        const fetchStadiumInfo = async () => {
            try {
                const response = await fetch(`${api}/mypage/feedback/${matchId}/stadium`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                      },
                });

                const result = await response.json();
                if (result.success) {
                    setStadiumInfo(result.data);
                } else {
                    throw new Error('Failed to fetch stadium info');
                }
            } catch (err) {
                setError('구장 정보를 불러오는 중 오류가 발생했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStadiumInfo();
    }, [matchId, api]);

    const handleCheckboxChange = (feedbackType, value) => {
        if (feedbackType === 'positive') {
            setPositiveFeedback((prev) =>
                prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
            );
        } else if (feedbackType === 'negative') {
            setNegativeFeedback((prev) =>
                prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
            );
        }
    };

    const handleSubmit = async () => {
        const positivePayload = {
            feedback: positiveFeedback,
        };
        const negativePayload = {
            feedback: negativeFeedback,
        };

        try {
            if (positiveFeedback.length > 0) {
                await fetch(`${api}/mypage/feedback/${matchId}/stadium/good`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify(positivePayload),
                });
            }

            if (negativeFeedback.length > 0) {
                await fetch(`${api}/mypage/feedback/${matchId}/stadium/bad`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify(negativePayload),
                });
            }

            alert('구장 리뷰가 등록되었습니다!');
            navigate('/mypage/myplab');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('리뷰 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const goToMainPage = () => {
        navigate('/');
    };

    if (loading) {
        return <div>구장 정보를 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>구장을 평가해 주세요!</h2>
            <p className={styles.subtitle}>피드백을 남겨 주시면 쾌적한 구장을 만드는 데 도움이 돼요</p>
            <h3 className={styles.stadiumName}>{stadiumInfo.stadiumName}</h3>
            <h4 className={styles.address}>{stadiumInfo.fullAddress}</h4>

            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>😊 이런 점이 좋아요!</h4>
                <div className={styles.checkboxGrid}>
                    {positiveOptions.map((option) => (
                        <div className={styles.checkboxCard} key={option.value}>
                            <input
                                type="checkbox"
                                id={`positive-${option.value}`}
                                value={option.value}
                                checked={positiveFeedback.includes(option.value)}
                                onChange={() => handleCheckboxChange('positive', option.value)}
                                className={styles.checkboxInput}
                            />
                            <label htmlFor={`positive-${option.value}`} className={styles.checkboxLabel}>
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>🤔 이런 점이 아쉬워요!</h4>
                <div className={styles.checkboxGrid}>
                    {negativeOptions.map((option) => (
                        <div className={styles.checkboxCard} key={option.value}>
                            <input
                                type="checkbox"
                                id={`negative-${option.value}`}
                                value={option.value}
                                checked={negativeFeedback.includes(option.value)}
                                onChange={() => handleCheckboxChange('negative', option.value)}
                                className={styles.checkboxInput}
                            />
                            <label htmlFor={`negative-${option.value}`} className={styles.checkboxLabel}>
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={handleSubmit}>
                    구장 리뷰 제출하기
                </button>
                <div className={styles.buttonSecondary} onClick={goToMainPage}>
                    메인 페이지로 가기
                </div>
            </div>
        </div>
    );
};

export default StadiumReviewForm;
