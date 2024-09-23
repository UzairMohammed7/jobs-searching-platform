import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { FaBriefcase } from 'react-icons/fa';

import './index.css';

const JobsRoute = props => {
  const { eachJobData } = props;
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachJobData;

  return (
    <li className="job-item-container-link">
      <Link to={`/jobs/${id}`} className="link">
        <div className="first-part-container">
          <div className="img-title-container">
            <img
              src={companyLogoUrl}
              alt={`${title} logo`}  /* More descriptive alt text */
              className="company-img-url"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container-job">
            <div className="location-job-type-container-job">
              <div className="location-container-job">
                <MdLocationOn />
                <p className="location">{location}</p>
              </div>
              <div className="job-type-container-route">
                <FaBriefcase />
                <p className="emp-type">{employmentType}</p>
              </div>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="second-part-job-container">
          <h1 className="desc-heading">Description</h1>
          <p className="desc-job">{jobDescription}</p>
        </div>
      </Link>
    </li>
  );
};

export default JobsRoute;
