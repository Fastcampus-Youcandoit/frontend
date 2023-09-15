import { Link } from "react-router-dom";
import { Text } from "../../styles/SideBarStyle";

const InProject = () => {
  return <div>진행중인 프로젝트 내용</div>;
};
const UpComing = () => {
  return <div>예정된 프로젝트 내용</div>;
};
const Completed = () => {
  return <div>완료된 프로젝트 내용</div>;
};

const Project = () => {
  return (
    <div>
      <Link to="in-progress">
        <Text>진행중인 프로젝트</Text>
      </Link>
      <Link to="upcoming">
        <Text>예정된 프로젝트</Text>
      </Link>
      <Link to="completed">
        <Text>완료된 프로젝트</Text>
      </Link>
    </div>
  );
};

export { Project, InProject, UpComing, Completed };
