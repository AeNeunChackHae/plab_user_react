import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { config } from "../../config";

const AboutPage = () => {
  const api = config.aws.ec2_host_user
  const navigate = useNavigate();
  
  const [fileValue, setFileValue] = useState(""); // 파일 입력 값 관리
  const fileInputRef = useRef(null); // file input을 위한 ref 생성

  const formRef = useRef(); // 폼 참조 생성

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    
    const formData = new FormData(formRef.current);
    formData.append('requestTable', 'stadium');

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch(`${api}/stadium/regist`, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response data:', data);
      if (data.status) {
        navigate(data.url)
      } else {
        alert(`예외가 발생했습니다!\n${data.error}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  const handleFileClick = () => {
    fileInputRef.current.click(); // file input 참조를 사용하여 클릭 이벤트 트리거
  };

  // 파일 입력 값 변경 감지
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    // 파일이 성공적으로 읽히면 실행될 이벤트 핸들러를 정의합니다.
    reader.onload = function(e) {
      // e.target.result는 읽힌 파일의 데이터를 base64 문자열로 포함하고 있습니다.
      // 이 값을 setBackgroundImage 함수에 전달하여 상태를 업데이트합니다.
      setFileValue(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    console.log('fileValue: ', fileValue)
  }, [fileValue])

  const match_time_arr = [
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
  ];

  return (
    <div className={styles.main_container}>
      <h3>구장 제휴 요청</h3>
      <form id="stadium_form" ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <p className={styles.label_text}>구장 사진</p>
          <div id={styles.img_canvas} onClick={handleFileClick} style={{backgroundImage: `url(${fileValue})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <input
            type="file"
            name="profile_path"
            id="profile_path"
            accept=".png, .jpg, .jpeg"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label_text}>구장 타입</p>
          <select
            id="ground_type"
            name="ground_type"
            className={styles.form_selectbox}
          >
            <option value="">Select</option>
            <option value="0">인조잔디</option>
            <option value="1">천연잔디</option>
            <option value="2">인도어</option>
            <option value="3">맨땅</option>
          </select>
        </div>
        <div className={styles.row}>
          <p className={styles.label_text}>구장 이름</p>
          <input
            type="text"
            id="stadium_name"
            name="stadium_name"
            className={styles.form_text}
            placeholder="예 : 서울 노원 RC 풋살 스타디움"
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label_text}>주소</p>
          <input
            type="text"
            id="full_address"
            name="full_address"
            className={styles.form_text}
            placeholder="예 : 서울특별시 노원구 노원로238 4층"
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label_text}>이메일</p>
          <input
            type="text"
            id="contact_email"
            name="contact_email"
            className={styles.form_text}
            placeholder="구장주님의 Email을 입력해주세요"
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label_text}>가로</p>
          <input
            type="number"
            id="width"
            name="width"
            className={styles.form_text}
            placeholder="m단위"
          />
          <p className={styles.label_text}>세로</p>
          <input
            type="number"
            id="height"
            name="height"
            className={styles.form_text}
            placeholder="m단위"
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label_text}>주소 대분류</p>
          <select
            id="main_region"
            name="main_region"
            className={styles.form_selectbox}
          >
            <option value="">Select</option>

            <option value="0">서울</option>

            <option value="1">부산</option>

            <option value="2">대구</option>

            <option value="3">인천</option>

            <option value="4">광주</option>

            <option value="5">대전</option>

            <option value="6">울산</option>

            <option value="7">세종</option>

            <option value="8">경기</option>

            <option value="9">강원</option>

            <option value="10">충북</option>

            <option value="11">충남</option>

            <option value="12">전북</option>

            <option value="13">전남</option>

            <option value="14">경북</option>

            <option value="15">경남</option>

            <option value="16">제주</option>
          </select>
          <p className={styles.label_text}>주소 소분류</p>
          <select
            id="sub_region"
            name="sub_region"
            className={styles.form_selectbox}
          >
            <option value="">Select</option>
            <option value="0">강남구</option>
            <option value="1">강동구</option>
            <option value="2">강북구</option>
            <option value="3">강서구</option>
            <option value="4">관악구</option>
            <option value="5">광진구</option>
            <option value="6">구로구</option>
            <option value="7">금천구</option>
            <option value="8">노원구</option>
            <option value="9">도봉구</option>
            <option value="10">동대문구</option>
            <option value="11">동작구</option>
            <option value="12">마포구</option>
            <option value="13">서대문구</option>
            <option value="14">서초구</option>
            <option value="15">성동구</option>
            <option value="16">성북구</option>
            <option value="17">송파구</option>
            <option value="18">양천구</option>
            <option value="19">영등포구</option>
            <option value="20">용산구</option>
            <option value="21">은평구</option>
            <option value="22">종로구</option>
            <option value="23">중구</option>
            <option value="24">중랑구</option>
          </select>
        </div>

      <div className={styles.radio_section}>
        <div className={styles.row}>
          <p className={styles.label_text}>샤워실</p>
          <div className={styles.row}>
            <label className={styles.radio_option}>
              <input type="radio" name="shower_yn" value="Y" />
              <span class="checkmark"></span>Y
            </label>
            <label className={styles.radio_option}>
              <input type="radio" name="shower_yn" value="N" checked/>
              <span class="checkmark"></span>N
            </label>
          </div>
        </div>
            
        <div className={styles.row}>
          <p className={styles.label_text}>음료 판매</p>
          <div className={styles.row}>
            <label className={styles.radio_option}>
              <input type="radio" name="sell_drink_yn" value="Y" />
              <span class="checkmark"></span>Y
            </label>
            <label className={styles.radio_option}>
              <input type="radio" name="sell_drink_yn" value="N" checked/>
              <span class="checkmark"></span>N
            </label>
          </div>
        </div>

        <div className={styles.row}>
          <p className={styles.label_text}>풋살화 대여</p>
          <div className={styles.row}>
            <label className={styles.radio_option}>
              <input type="radio" name="lend_shoes_yn" value="Y" />
              <span class="checkmark"></span>Y
            </label>
            <label className={styles.radio_option}>
              <input type="radio" name="lend_shoes_yn" value="N" checked/>
              <span class="checkmark"></span>N
            </label>
          </div>
        </div>
        <div className={styles.row}>
            
          <p className={styles.label_text}>화장실</p>
          <div className={styles.row}>
            <label className={styles.radio_option}>
              <input type="radio" name="toilet_yn" value="Y" />
              <span class="checkmark"></span>Y
            </label>
            <label className={styles.radio_option}>
              <input type="radio" name="toilet_yn" value="N" checked/>
              <span class="checkmark"></span>N
            </label>
          </div>
        </div>
        <div className={styles.row}>
          <p className={styles.label_text}>주차가능여부</p>
          <div className={styles.row}>
            <label className={styles.radio_option}>
              <input type="radio" name="parking_yn" value="Y" />
              <span class="checkmark"></span>Y
            </label>
            <label className={styles.radio_option}>
              <input type="radio" name="parking_yn" value="N" checked/>
              <span class="checkmark"></span>N
            </label>
          </div>
        </div>
      </div>
        <div className={styles.row}>
          <p className={styles.label_text}>구장 특이사항</p>
          <textarea name="notice" id={styles.notice}></textarea>
        </div>
        <div className={styles.row}>
          <p className={styles.label_text_center}>매치 시간</p>
          <p className={styles.label_text_center}>매치 타입</p>
          <p className={styles.label_text_center}>성별 구분</p>
          <p className={styles.label_text_center}>레벨 제한</p>
        </div>
        <div className={`${styles.column} ${styles.justify_end}  ${styles.margin_x_10}`}>
          {match_time_arr.map((time_value, index) => (
            <div
            id={`match_time_arr_container_${index}`}
            className={`${styles.row} ${styles.margin_x_10}`}
            >
              <div
                className={`${styles.flex_child_quartern} ${styles.row} ${styles.justify_center}  ${styles.margin_x_10}`}
              >
                <input
                  type="text"
                  readOnly
                  id={`match_start_time_${index}`}
                  name={`match_start_time_${index}`}
                  value={time_value}
                  className={`${styles.form_text} ${styles.w_50}`}
                />
              </div>
              <div
                className={`${styles.flex_child_quartern} ${styles.row} ${styles.justify_center}  ${styles.margin_x_10}`}
              >
                <select
                  id={`match_type_${index}`}
                  name={`match_type_${index}`}
                  className={`${styles.form_selectbox} ${styles.w_90}`}
                >
                  <option value="0">소셜매치</option>
                  <option value="1">팀매치</option>
                </select>
              </div>
              <div
                className={`${styles.flex_child_quartern} ${styles.row} ${styles.justify_center}  ${styles.margin_x_10}`}
              >
                <select
                  id={`allow_gender_${index}`}
                  name={`allow_gender_${index}`}
                  className={`${styles.form_selectbox} ${styles.w_90}`}
                >
                  <option value="0">남성</option>
                  <option value="1">여성</option>
                  <option value="2">혼성</option>
                </select>
              </div>
              <div
                className={`${styles.flex_child_quartern} ${styles.row} ${styles.justify_center}  ${styles.margin_x_10}`}
              >
                <select
                  id={`level_criterion_${index}`}
                  name={`level_criterion_${index}`}
                  className={`${styles.form_selectbox} ${styles.w_90}`}
                >
                  <option value="0">모든레벨</option>
                  <option value="1">아마추어1이하</option>
                  <option value="2">아마추어2이상</option>
                </select>
              </div>
            </div>
          ))}
          <div className={`${styles.row} ${styles.justify_end}`}>
            <button type="submit" id="submit_btn" className={styles.btn_success}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AboutPage;
