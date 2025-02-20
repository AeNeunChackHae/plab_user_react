import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import styles from "./MatchDetails.module.css";
import LocationProvider from "../../location/LocationProvider";
import KakaoMap from "../../kakaomap/KakaoMap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { config } from "../../../config";


const MatchDetails = ({ match_id }) => {
  const api = config.aws.ec2_host_user
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState("");
  const [matchDetails, setMatchDetails] = useState(null);
  const [matchStatusCode, setMatchStatusCode] = useState(null);
  const [error, setError] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const fetchMatchDetails = useCallback(async () => {
    const response = await fetch(`${api}/match/details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id }),
    });
    if (!response.ok) throw new Error("매치 데이터를 가져오는 데 실패했습니다.");
    return response.json();
}, [match_id]);

const fetchMatchStatus = useCallback(async () => {
    const response = await fetch(`${api}/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id }),
    });
    if (!response.ok) throw new Error("매치 상태 데이터를 가져오는 데 실패했습니다.");
    return response.json();
}, [match_id]);

const checkApplicationStatus = useCallback(async () => {
  const userId = localStorage.getItem("id");

  // 유저 ID가 없을 경우 기본값 반환
  if (!userId) {
      console.warn("User ID가 로컬스토리지에 없습니다. 기본값을 반환합니다.");
      return { isApplied: false }; // 기본값
  }

  const response = await fetch(`${api}/match/application-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ match_id, user_id: userId }),
  });

  if (!response.ok) throw new Error("신청 여부 확인 요청 실패");

  const data = await response.json();
  return data || { isApplied: false }; // 응답이 없으면 기본값 반환
}, [match_id]);

  // Fetch and set data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("id");
        const [details, statusData, application] = await Promise.all([
          fetchMatchDetails(),
          fetchMatchStatus(),
          userId ? checkApplicationStatus() : { isApplied: false }, // 로그인 여부에 따라 호출
        ]);

        const now = new Date(); 
        const startTime = new Date(details.match_start_time); // 매치 시작 시간
        const endTime = new Date(details.end_time); 
        const earlyBirdStart = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); 

        if (now > endTime) {
          console.log('now와 endTime',now,endTime)
          setStatus("past"); // 종료된 매치로 상태 설정
        } else if (startTime >= earlyBirdStart) {
          // 매치 시작 날짜가 오늘로부터 10일 이후라면 얼리버드 상태
          setStatus("earlyBird");
        }
         else {
          switch (statusData.status_code) {
            case 0:
              setStatus(userId && application.isApplied ? "closed" : "recruiting");
              break;
            case 1:
            case 4:
              setStatus("closed");
              break;
            case 2:
              setStatus("play");
              break;
            case 3:
              setStatus("past");
              break;
            default:
              setStatus("unknown");
              break;
          }
        }
  
  
        setMatchDetails(details);
        setIsAlreadyApplied(userId ? application.isApplied : false);
        setMatchStatusCode(statusData.status_code);
        console.log(statusData.status_code)
      } catch (error) {
        console.error("데이터 로드 오류:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
  
    if (match_id) {
      fetchData();
    }
  }, [fetchMatchDetails, fetchMatchStatus, checkApplicationStatus, match_id]);
  
  const checkLoginAndRedirect = () => {
    const userId = localStorage.getItem("id"); // 로컬스토리지에서 id 확인
    if (!userId) {
      alert("로그인해야 이용할 수 있습니다!");
      navigate("/auth/login", { state: { from: location.pathname } }); // 로그인 페이지로 이동
      return false; // 로그인되지 않음을 반환
    }
    return true; // 로그인되어 있음을 반환
  };

  const handleApplyClick = async () => {
    // console.log("신청 버튼 클릭됨!"); 
    if (!checkLoginAndRedirect()) return;
  
    const userId = localStorage.getItem("id");
    // console.log("로그인된 사용자 ID:", userId); 
  
    try {
      // 블랙리스트 확인 요청
      console.log("블랙리스트 확인 요청 시작");
      const response = await fetch(`${api}/match/blacklist-check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ match_id, user_id: userId }),
      });

      if (!response.ok) {
        throw new Error("블랙리스트 확인 요청 실패");
      }

      const data = await response.json();
      // console.log("블랙리스트 확인 응답:", data);

      if (data.isBlacklisted) {
        const proceed = window.confirm(
          "블랙리스트에 등록된 사용자가 이 매치에 이미 신청했습니다. 그래도 신청하시겠습니까?"
        );
        if (!proceed) {
          return; // "아니오" 선택 시 신청 중단
        }
      }

      // 팀 경기일 경우 팀장 확인 로직 추가
      if (matchDetails.match_type === 1) {
        console.log("팀경기임: 팀장 확인 요청 실행")
        const teamResponse = await fetch(`${api}/match/team-check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ match_id, user_id: userId }),
        });

        if (!teamResponse.ok) {
          throw new Error("팀장 확인 요청 실패");
        }

        const teamData = await teamResponse.json();

        if (!teamData.isTeamLeader) {
          alert("팀장만 신청 가능합니다!");
          return; // 팀장이 아닌 경우 신청 중단
        }
      }

      // 블랙리스트가 없거나 팀장이면 결제 페이지로 이동
      if (status === "earlyBird" || status === "regular" || status === "recruiting") {
        console.log("결제 페이지로 이동");
        navigate(`/order/${userId}`, {
          state: { 
            from: `/match/${match_id}`,
            match_id,
            earlyBird: status === "earlyBird" },
        });
      }
    } catch (error) {
      console.error("신청 처리 중 오류 발생:", error);
      alert("신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log("현재 매치 상태(status):", status);


  const handleToggleMap = () => {
    setShowMap((prev) => !prev);
  };

  const pricing = useMemo(() => {
    if (!matchDetails) return {};
    const matchType = matchDetails.match_type;
    if (matchType === 0) {
      return {
        regularPrice: 10000,
        discountPrice: 8000,
        discountText: "지금 신청하면 20% 할인!",
      };
    } else if (matchType === 1) {
      return {
        regularPrice: 80000,
        discountPrice: 64000,
        discountText: "지금 신청하면 20% 할인!",
      };
    }
    return {
      regularPrice: 0,
      discountPrice: 0,
      discountText: "",
    };
  }, [matchDetails]);


  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!matchDetails) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  const { match_start_time, stadium_name, full_address, stadium_id } = matchDetails;
  // console.log('matchStatusCode', matchStatusCode)
  // console.log('마지막status', status)

  return (
    <div ref={stickyRef} className={`${styles.matchDetails} ${isSticky ? styles.sticky : ""}`}>
      <div className={styles.matchTime}>
        {new Date(match_start_time).toLocaleString("ko-KR", {
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
      </div>
      <div className={styles.matchPlace}>
        <h1 className={styles.title}>
          <Link to={`/stadium/${stadium_id}/info/`}>{stadium_name}</Link>
        </h1>
        <div className={styles.wtgTool}>
          <span className={styles.address}>{full_address}</span>
          <span
            className={styles.copy}
            onClick={() => {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(full_address)
                  .then(() => {
                    alert("주소가 복사되었습니다!");
                  })
                  .catch((err) => {
                    console.error("주소 복사 실패:", err);
                    alert("주소 복사 중 오류가 발생했습니다.");
                  });
              } else {
                // 호환되지 않는 브라우저의 경우
                prompt("주소 복사가 지원되지 않는 환경입니다. 아래 텍스트를 복사하세요:", full_address);
              }
            }}
          >
            주소 복사
          </span>

          <span id="toggleMap" onClick={handleToggleMap} className={styles.map}>
            {showMap ? "지도 닫기" : "지도 보기"}
          </span>
        </div>
      </div>
      {showMap && (
        <LocationProvider full_address={full_address}>
          {(location) => {
            return location ? (
              <KakaoMap latitude={location.latitude} longitude={location.longitude} />
            ) : null;
          }}
        </LocationProvider>
      )}
      <div className={styles.matchFee}>
  {localStorage.getItem("id") ? ( // 로그인 여부 확인
    status === "past" ? ( // 종료된 매치
      <div className={styles.statusBlock}>
        <div className={styles.contentBlock}>
          <span className={styles.money}>
            {pricing.regularPrice.toLocaleString()}원
          </span>
          <span> / 2시간</span>
          <div className={styles.matchClosed}>종료된 매치입니다</div>
        </div>
        <button className={styles.disabledButton} disabled>
          종료
        </button>
      </div>
    ) : isAlreadyApplied ? ( // 이미 신청한 경우
      <div className={styles.statusBlock}>
        <div className={styles.contentBlock}>
          <span className={styles.money}>
            {pricing.regularPrice.toLocaleString()}원
          </span>
          <span> / 2시간</span>
        </div>
        <button className={styles.disabledButton} disabled>
          이미 신청한 매치입니다!
        </button>
      </div>
    ) : status === "play" ? ( // 매치 진행 중
      <div className={styles.statusBlock}>
        <div className={styles.contentBlock}>
          <span className={styles.money}>
            {pricing.regularPrice.toLocaleString()}원
          </span>
          <span> / 2시간</span>
          <div className={styles.matchLive}>매치가 진행 중입니다!</div>
        </div>
        <button className={styles.disabledButton} disabled>
          진행 중
        </button>
      </div>
    ) : status === "closed" ? ( // 신청 마감
      <div className={styles.statusBlock}>
        <div className={styles.contentBlock}>
          <span className={styles.money}>
            {pricing.regularPrice.toLocaleString()}원
          </span>
          <span> / 2시간</span>
          <div className={styles.matchClosed}>신청이 마감되었습니다</div>
        </div>
        <button className={styles.disabledButton} disabled>
          신청 불가
        </button>
      </div>
    ) : status === "earlyBird" ? ( // 얼리버드 상태
      <div className={styles.statusBlock}>
        <div className={styles.contentBlock}>
          <span className={`${styles.money} ${styles.strikeThrough}`}>
            {pricing.regularPrice.toLocaleString()}원
          </span>
          <span className={styles.money}>
            {pricing.discountPrice.toLocaleString()}원
          </span>
          <div className={styles.discountText}>얼리버드 할인 적용 중! 20% 할인 혜택</div>
        </div>
        <button className={styles.applyButton} onClick={handleApplyClick}>
          신청하기
        </button>
      </div>
    ) : status === "regular" || status === "recruiting" ? ( // 모집 중 상태
      <div className={styles.statusBlock}>
        <div className={styles.contentBlock}>
          <span className={styles.money}>
            {pricing.regularPrice.toLocaleString()}원
          </span>
          <span> / 2시간</span>
          <div className={styles.discountText}>매치 시작 3시간 전까지 신청 가능</div>
        </div>
        <button className={styles.applyButton} onClick={handleApplyClick}>
          신청하기
        </button>
      </div>
    ) : (
      <div className={styles.statusBlock}>
        <div className={styles.contentBlock}>
          <span className={styles.money}>상태를 확인할 수 없습니다</span>
        </div>
        <button className={styles.disabledButton} disabled>
          신청 불가
        </button>
      </div>
    )
  ) : ( // 로그인하지 않은 경우
    <div className={styles.statusBlock}>
      <button
        className={styles.applyButton}
        onClick={() => {
          alert("로그인해야 신청이 가능합니다!");
          navigate("/auth/login", { state: { from: location.pathname } });
        }}
      >
        로그인 후 신청 가능
      </button>
    </div>
  )}
</div>

    </div>
  );
  
};

export default MatchDetails;
