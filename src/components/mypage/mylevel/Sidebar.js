import React from "react";
import "./Sidebar.css";

const Sidebar = ({ levelImage }) => {
  return (
    <div className="sidebar">
      {/* levelImage 들어가야 하는 곳 */}
      <div className="sidebar-image-div">
        <img
          className="sidebar-image"
          src="https://d31wz4d3hgve8q.cloudfront.net/media/plab-magazine/article/6/images/img_level_for_user10.png"
          alt="Level table"
        />
      </div>
      {/* 길게 이미지를 넣을 수 있는 div */}
      <div className="sidebar-image-div">
        <img
          className="sidebar-image"
          src="https://d31wz4d3hgve8q.cloudfront.net/media/plab-magazine/article/None/images/img_level_for_user13.png"
          alt="Level table"
        />
      </div>
    </div>
  );
};

export default Sidebar;
