import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

import "./index.css";

const Home = () => {
  const navigate = useNavigate();

  const onClickFindJobs = () => {
    navigate("/jobs");
  };

  return (
    <>
      <div className="home-container">
        <Header />
        <h1 className="heading">
          Find The Job That <br />
          Fits Your Life
        </h1>
        <p className="home-page-desc">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button
            type="button"
            className="find-job-button"
            onClick={onClickFindJobs}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
