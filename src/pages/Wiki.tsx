import { Outlet } from "react-router-dom";
import { WikiSideBar } from "../components/sidebar/SideBar";

const Wiki = () => {
  return (
    <>
      <WikiSideBar />
      <Outlet />
      {/* <Wikis /> */}
    </>
  );
};

export default Wiki;
