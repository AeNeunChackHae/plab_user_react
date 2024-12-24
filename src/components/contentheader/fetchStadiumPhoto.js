export const fetchStadiumPhoto = async (stadium_id) => {
    try {
      console.log("Sending POST request to fetch photo for stadium_id:", stadium_id);
  
      const response = await fetch("http://localhost:8080/stadium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stadium_id }),
      });
  
      console.log("Server response status:", response.status);
  
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Server response data:", data);
  
      // 데이터 구조에 따라 photo를 반환
      return data.photo || null;
    } catch (error) {
      console.error("Error in fetchStadiumPhoto:", error);
      throw error;
    }
  };
  