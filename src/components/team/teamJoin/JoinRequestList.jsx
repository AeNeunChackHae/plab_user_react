import React from 'react';
import JoinRequestItem from './JoinRequestItem';
import styles from './JoinRequestList.module.css';

const JoinRequestList = ({ joinRequests, onApprove, onReject }) => {
  return (
    <div className={styles.listContainer}>
      {joinRequests.length > 0 ? (
        joinRequests.map((request) => (
          <JoinRequestItem
            key={request.id}
            request={request}
            onApprove={onApprove}
            onReject={onReject}
          />
        ))
      ) : (
        <p className={styles.noRequests}>가입 신청자가 없습니다.</p>
      )}
    </div>
  );
};

export default JoinRequestList;
