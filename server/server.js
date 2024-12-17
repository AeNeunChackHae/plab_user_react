const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // MySQL 클라이언트
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// MySQL 데이터베이스 연결 설정
const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // MySQL 사용자 이름
  password: '1234', // MySQL 비밀번호
  database: 'kdt_project', // 사용할 데이터베이스 이름
});

// API endpoint for match data
app.get('/match/:match_id', async (req, res) => {
  const matchId = req.params.match_id;

  try {
    // PFB_USER에서 match_id에 해당하는 유저 데이터 가져오기
    const [users] = await db.query('SELECT * FROM PFB_USER WHERE status = 0');
    
    // POM 카드 개수 가져오기
    const [pomResult] = await db.query(
      'SELECT COUNT(*) AS pomCount FROM PFB_CARD WHERE card_type = "POM"'
    );

    const pomCount = pomResult[0].pomCount;

    res.json({ users, pomCount });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch match data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
