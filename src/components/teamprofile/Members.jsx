import React from 'react';

const Members = ({ members }) => (
  <div>
    <h3>팀 멤버</h3>
    <ul>
      {members.map((member) => (
        <li key={member.id}>
          {member.photo} {member.name} - {member.role}
        </li>
      ))}
    </ul>
  </div>
);

export default Members;
