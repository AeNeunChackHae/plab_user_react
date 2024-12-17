use kdt_project;

CREATE TABLE PFB_USER (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    status TINYINT(1) NOT NULL, -- 0: Active, 1: Inactive
    level VARCHAR(20) NOT NULL
);

CREATE TABLE PFB_CARD (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    card_type VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES PFB_USER(id)
);

-- 샘플 데이터 삽입
INSERT INTO PFB_USER (name, status, level) VALUES
('유저1', 0, '비기너'),
('유저2', 0, '아마추어'),
('유저3', 0, '세미프로'),
('유저4', 1, '프로');

INSERT INTO PFB_CARD (user_id, card_type) VALUES
(1, 'POM'),
(2, 'POM'),
(3, 'POM');
