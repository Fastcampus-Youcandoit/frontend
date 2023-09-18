import { Link } from "react-router-dom";
import { Text } from "../../styles/SideBarStyle";

const CompanyRules = () => {
  return <div>회사내규 내용</div>;
};

const TeamIntroduction = () => {
  return <div>팀소개 내용</div>;
};

const OrganizationChart = () => {
  return <div>조직도 내용</div>;
};

const OfficeLife = () => {
  return (
    <div>
      <Link to="/wiki/office-life/company-rules">
        <Text>회사내규</Text>
      </Link>
      <Link to="/wiki/office-life/team-introduction">
        <Text>팀소개</Text>
      </Link>
      <Link to="/wiki/office-life/organization-chart">
        <Text>조직도</Text>
      </Link>
    </div>
  );
};

export { OfficeLife, CompanyRules, TeamIntroduction, OrganizationChart };
