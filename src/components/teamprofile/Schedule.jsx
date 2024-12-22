import React from 'react';

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
