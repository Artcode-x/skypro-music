import style from "./MainSidebar.module.css";
import SidebarPersonal from "./sidebarPersonal/sidebarPersonal";
import SidebarBlock from "./sidebarBlock/sidebarBlock";

function MainSidebar({ loading }) {
  return (
    <div className={style.main__sidebar}>
      <SidebarPersonal />
      <SidebarBlock loading={loading} />
    </div>
  );
}

export default MainSidebar;
