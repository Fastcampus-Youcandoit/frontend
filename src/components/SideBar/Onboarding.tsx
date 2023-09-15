import { Link } from "react-router-dom";
import { Text } from "../../styles/SideBarStyle";

const ReadingList = () => {
  return <div>신입사원 필독서 내용</div>;
};

const Topics = () => {
  return <div>온보딩 주제 내용</div>;
};

const Onboarding = () => {
  return (
    <div>
      <Link to="reading-list">
        <Text>신입사원 필독서</Text>
      </Link>
      <Link to="topics">
        <Text>온보딩 주제</Text>
      </Link>
    </div>
  );
};

export { Onboarding, ReadingList, Topics };
