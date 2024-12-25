import React from "react";
import "./MainMenu.css";

const MainMenu = ({ hideLevel, toggleHideLevel }) => {
  const menuItems = [
    {
      category: "나의 플랩",
      items: [
        { name: "신청 내역", icon: "📄", link: "/applications" },
        { name: "블랙리스트 관리", icon: "🚫", link: "/blacklist" },
        { name: "프로필 수정", icon: "✏️", link: "/edit-profile" },
        { name: "설정", icon: "⚙️", link: "/settings" },
      ],
    },
    {
      category: "고객센터",
      items: [
        { name: "이용 문의", icon: "❓", link: "/inquiries" },
        { name: "공지사항", icon: "📢", link: "/announcements" },
      ],
    },
    {
      category: "더보기",
      items: [
        { name: "플랩포털 소개", icon: "ℹ️", link: "/about" },
        { name: "매니저 지원", icon: "🤝", link: "/manager-support" },
        { name: "구장 제휴", icon: "🏟️", link: "/partnerships" },
      ],
    },
  ];

  return (
    <div className="main-menu">
      {menuItems.map((menu, index) => (
        <div key={index} className="menu-category">
          <div className="menu-header">
            <h3>{menu.category}</h3>
          </div>
          <div className="menu-items">
            <ul>
              {menu.items.map((item, idx) => (
                <li key={idx}>
                  <a href={item.link} className="menu-link">
                    <span className="icon">{item.icon}</span> {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainMenu;
