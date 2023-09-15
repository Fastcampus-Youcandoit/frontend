import { Link } from "react-router-dom";
import { Text } from "../../styles/SideBarStyle";

const OfficePhoto = () => {
  return <div>내부사진 내용</div>;
};

const Business = () => {
  return <div>협력사 내용</div>;
};

const JobPosting = () => {
  return <div>채용공고 내용</div>;
};

const Photos = () => {
  return (
    <div>
      <Link to="office-photo">
        <Text>내부 사진</Text>
      </Link>
      <Link to="business">
        <Text>협력사</Text>
      </Link>
      <Link to="job-posting">
        <Text>내부 사진</Text>
      </Link>
    </div>
  );
};

export { Photos, OfficePhoto, Business, JobPosting };
