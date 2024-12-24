import React from 'react';
import styles from './Members.module.css';

const Members = ({ members }) => (
  <div className={styles.container}>
    <ul className={styles.memberList}>
      {members.map((member) => (
        <li key={member.id} className={styles.memberItem}>
          <img
            src={member.photo}
            alt={`${member.name} 프로필 사진`}
            className={styles.profileImage}
          />
          <div className={styles.memberInfo}>
            <div className={styles.memberHeader}>
              <span className={styles.memberName}>{member.name}</span>
              {member.role === 'teamLeader' && (
                <span className={styles.badge}>운영진</span>
              )}
            </div>
            <span className={styles.memberLevel}>{member.level}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Members;
