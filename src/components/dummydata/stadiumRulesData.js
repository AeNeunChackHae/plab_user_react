const STADIUM_RULES_DATA = {
    facilities: [
      { name: "샤워실", available: true, icon: "ic_info_shower.svg" },
      { name: "유료주차", available: true, icon: "ic_info_park.svg" },
      { name: "풋살화 대여", available: false, icon: "ic_info_shoes.svg" },
      { name: "조끼 대여", available: true, icon: "ic_info_bibs.svg" },
      { name: "음료 판매", available: true, icon: "ic_info_beverage.svg" },
      { name: "풋살공 대여", available: false, icon: "ic_info_ball.svg" },
      { name: "화장실", available: true, icon: "ic_info_toilet.svg" },
    ],
  
    rules: [
      { id: 1, content: "화장실: 7층 화장실 이용" },
      { id: 2, content: "풋살화 대여: 가능" },
      { id: 3, content: "대기실 난방 사용 금지" },
      { id: 4, content: "대기실 일반 대관, 소셜 매치 공동 사용 가능" },
    ],
  };
  
  export default STADIUM_RULES_DATA;
  