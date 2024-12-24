import React from 'react';

// 추후 수정 필요
const Schedule = ({ schedule }) => (
  <div>
    {schedule.length === 0 ? (
      <p>대기 중인 일정이 없어요</p>
    ) : (
      <ul>
        {schedule.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);

export default Schedule;
