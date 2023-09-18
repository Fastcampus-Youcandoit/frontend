import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text } from "../../styles/SideBarStyle";

const Div = styled.div`
  height: 300px;
`;

const OfficePhoto = () => {
  return <Div>내부사진 내용</Div>;
};

const Business = () => {
  return <div>협력사 내용</div>;
};

const JobPosting = () => {
  return <div>채용공고 내용</div>;
};

const Photos = () => {
  return (
    <>
      <Link to="/gallery/photos/office-photo">
        <Text>내부 사진</Text>
      </Link>
      <Link to="/gallery/photos/business">
        <Text>협력사</Text>
      </Link>
      <Link to="/gallery/photos/job-posting">
        <Text>채용공고</Text>
      </Link>
    </>
  );
};

export { Photos, OfficePhoto, Business, JobPosting };
