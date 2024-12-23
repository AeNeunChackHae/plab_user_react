import React from 'react';

const UserInfo = ({ email }) => {
  return (
    <div>
      <h1>1개의 아이디가 있어요</h1>
      <h3>비밀번호를 변경해주세요</h3>
      <p>이메일 인증을 마친 이메일: <strong>{email}</strong></p>
    </div>
  );
};

export default UserInfo;