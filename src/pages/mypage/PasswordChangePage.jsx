import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PasswordChangePage.module.css';

const PasswordChange = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // 사용자 이메일 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/mypage/change/general', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('사용자 정보를 불러오지 못했습니다.');
        }

        const data = await response.json();
        if (data.success) {
          setEmail(data.data.email);
        } else {
          throw new Error(data.message || '사용자 정보를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert(`오류: ${error.message}`);
      }
    }

    fetchUserInfo();
  }, []);

  // 비밀번호 변경
  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }
  
    if (newPassword.length < 8) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    if (currentPassword === newPassword) {
      alert('새 비밀번호는 기존 비밀번호와 달라야 합니다.');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8080/mypage/change/general/password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        alert(data.message || '비밀번호가 성공적으로 변경되었습니다.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        navigate('/mypage');
      } else {
        alert(data.message || '비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert(`오류: ${error.message}`);
    }
  };
  
  return (
    <div className={styles.container}>
      <p className={styles.email}>{email}</p>

      <div className={styles.section}>
        <label className={styles.label}>기존 비밀번호:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>새 비밀번호:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
        />
        <ul className={styles.passwordHint}>
          <li>비밀번호는 최소 8자 이상이어야 합니다.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>새 비밀번호 (확인):</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
      </div>

      <button className={styles.saveButton} onClick={handleSave}>
        저장하기
      </button>    
    </div>
  );
};

export default PasswordChange;
