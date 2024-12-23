import React from 'react';

const ChangePasswordButton = () => {
  const handleClick = () => {
    // 비밀번호 변경 로직을 여기 추가할 수 있음
    alert("비밀번호 변경 페이지로 이동");
  };

  return (
    <button onClick={handleClick}>비밀번호 변경</button>
  );
};

export default ChangePasswordButton;