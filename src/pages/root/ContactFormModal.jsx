import React, { useState } from 'react';
import './ContactFormModal.css';

const ContactFormModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(title, content);
        setTitle('');
        setContent('');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>문의하기</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">제목:</label>
                    <input
                        id="title"
                        className="input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="제목을 입력하세요."
                    />
                    <label htmlFor="content">내용:</label>
                    <textarea
                        id="content"
                        className="textarea"
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        placeholder="내용을 입력하세요."
                    />
                    <div className="modal-footer">
                        <button className="cancel-button" type="button" onClick={onClose}>
                            취소
                        </button>
                        <button className="submit-button" type="submit">
                            등록하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactFormModal;
