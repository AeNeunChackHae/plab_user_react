const fetchWithIsAuth = async (url, options = {}) => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      alert("로그인이 필요합니다.");
      localStorage.removeItem("id"); // 로컬스토리지에서 id 삭제
      window.location.href = "/auth/login"; // 로그인 페이지로 리디렉션
      throw new Error("토큰이 존재하지 않습니다.");
    }
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    try {
      const response = await fetch(url, { ...options, headers });
  
      if (response.status === 401) {
        // 토큰 만료 처리
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("authToken"); // 토큰 삭제
        localStorage.removeItem("id"); // id 삭제
        window.location.href = "/auth/login"; // 로그인 페이지로 리디렉션
        throw new Error("인증 실패: 토큰이 유효하지 않거나 만료되었습니다.");
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "요청 중 오류 발생");
      }
  
      return response.json();
    } catch (error) {
      console.error("fetchWithAuth 에러:", error);
      throw error;
    }
  };
  
  export default fetchWithIsAuth;
  