import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SettingPage.module.css';

const generateOptions = (start, end) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push(i.toString().padStart(2, '0'));
  }
  return options;
};

const SettingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const navigate = useNavigate();

  const years = generateOptions(1900, new Date().getFullYear());
  const months = generateOptions(1, 12);
  const days = generateOptions(1, 31);

  // 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/mypage/change/general', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        if (data.success) {
          const birthDateParts = data.data.birth_date.split('-');
          setEmail(data.data.email);
          setBirthYear(birthDateParts[0]);
          setBirthMonth(birthDateParts[1]);
          setBirthDay(birthDateParts[2]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // 비밀번호 수정 버튼 핸들
  const handlePassWordChange = () => {
    navigate('/mypage/change/pw');
  }

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/auth/logout', {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('로그아웃 되었습니다.');
        localStorage.removeItem('authToken'); // 토큰 삭제
        localStorage.removeItem('id'); // 토큰 삭제
        navigate('/'); // 메인 페이지로 이동
      } else {
        alert(data.message || '로그아웃에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  // 탈퇴 핸들러
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('정말로 계정을 삭제하시겠습니까? 진행 예정 매치가 있을 경우 탈퇴가 불가능합니다.');
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://127.0.0.1:8080/auth/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('계정이 성공적으로 삭제되었습니다.');
        localStorage.removeItem('authToken');
        navigate('/');
      } else if (data.data) {
        // 진행 예정 매치가 있는 경우
        alert('진행 예정인 매치가 있습니다:\n' + 
              data.data.map(match => `${match.match_start_time} - ${match.match_end_time}`).join('\n'));
      } else {
        alert(data.message || '계정 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
      alert('계정 삭제 중 오류가 발생했습니다.');
    }
  };

  // 모달 제어
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/mypage/change/general/birthdate', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          birthDate: `${birthYear}-${birthMonth}-${birthDay}`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update birth date');
      }

      const data = await response.json();
      if (data.success) {
        alert('생년월일이 성공적으로 수정되었습니다.');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating birth date:', error);
      alert('생년월일 수정에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>기본 설정</h2>
      <div className={styles.section}>
        <div className={styles.item}>
          <span className={styles.label}>이메일</span>
          <span className={styles.value}>{email}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>생년월일</span>
          <span className={styles.value}>{`${birthYear}-${birthMonth}-${birthDay}`}</span>
          <button className={styles.button} onClick={handleModalOpen}>수정</button>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>비밀번호 바꾸기</span>
          <button className={styles.button} onClick={handlePassWordChange}>수정</button>
        </div>
      </div>

      <h2 className={styles.title}>계정 관리</h2>
      <div className={styles.section}>
        <button className={styles.linkButton} onClick={handleLogout}>로그아웃</button>
        <button className={styles.linkButton} onClick={handleDeleteAccount}>탈퇴하기</button>
      </div>

      {/* 생년월일 수정 모달 */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>생년월일 수정</h3>
            <div className={styles.modalContent}>
              <label>
                년:
                <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </label>
              <label>
                월:
                <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
                  {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </label>
              <label>
                일:
                <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.button} onClick={handleSave}>저장</button>
              <button className={styles.button} onClick={handleModalClose}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingPage;
