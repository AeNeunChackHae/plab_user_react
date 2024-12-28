import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ title, onClose, children }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
