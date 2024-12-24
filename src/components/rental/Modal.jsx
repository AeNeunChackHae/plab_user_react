import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ title, onClose, children }) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{title}</h2>
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
