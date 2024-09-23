
import { Component } from 'react';
import Cookies from 'js-cookie';
import { Circles } from 'react-loader-spinner';
import { AiOutlineSearch } from 'react-icons/ai';
import Profile from '../Profile';
import JobsRoute from '../JobsRoute';
import Header from '../Header';
import './index.css';

const employmentTypesList = [
  { label: 'Full Time', employmentTypeId: 'FULLTIME' },
  { label: 'Part Time', employmentTypeId: 'PARTTIME' },
  { label: 'Freelance', employmentTypeId: 'FREELANCE' },
  { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
];

const salaryRangesList = [
  { salaryRangeId: '1000000', label: '10 LPA and above' },
  { salaryRangeId: '2000000', label: '20 LPA and above' },
  { salaryRangeId: '3000000', label: '30 LPA and above' },
  { salaryRangeId: '4000000', label: '40 LPA and above' },
];

const locationBasedList = [
  { locationId: 'HYDERABAD', label: 'Hyderabad' },
  { locationId: 'BANGALORE', label: 'Bangalore' },
  { locationId: 'CHENNAI', label: 'Chennai' },
  { locationId: 'DELHI', label: 'Delhi' },
  { locationId: 'MUMBAI', label: 'Mumbai' },
];

const apiJobStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class AllJobs extends Component {
  state = {
    apiJobStatus: apiJobStatusConstants.initial,
    jobsData: [],
    checkBoxInputs: [],
    locationBased: '',
    searchInput: '',
    radioInput: '',
  };

  componentDidMount() {
    this.getJobsData();
  }

  getJobsData = async () => {
    this.setState({ apiJobStatus: apiJobStatusConstants.inProgress });
    const jwtToken = Cookies.get('jwt_token');
    const { searchInput, checkBoxInputs, radioInput, locationBased } = this.state;
    const checkBox = checkBoxInputs.join(',');
    const JobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBox}&minimum_package=${radioInput}&search=${searchInput}&location=${locationBased}`;
    console.log(JobsApiUrl);
    
    const jobsOptions = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: 'GET',
    };
    
    const jobResponse = await fetch(JobsApiUrl, jobsOptions);
    if (jobResponse.ok) {
      const fetchJobData = await jobResponse.json();
      const updatedJobData = fetchJobData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }));
      this.setState({ jobsData: updatedJobData, apiJobStatus: apiJobStatusConstants.success });
    } else {
      this.setState({ apiJobStatus: apiJobStatusConstants.failure });
    }
  };

  getCheckboxInputs = event => {
    // const { checkBoxInputs } = this.state;
    const currentValue = event.target.id;
    this.setState(prevState => {
      const newCheckBoxInputs = prevState.checkBoxInputs.includes(currentValue)
        ? prevState.checkBoxInputs.filter(item => item !== currentValue)
        : [...prevState.checkBoxInputs, currentValue];
      return { checkBoxInputs: newCheckBoxInputs };
    }, this.getJobsData);
  };

  handleLocationChange = event => {
    this.setState({ locationBased: event.target.id }, this.getJobsData);
  };

  getRadioOptions = event => {
    this.setState({ radioInput: event.target.id }, this.getJobsData);
  };

  onGetEmploymentType = () => (
    <ul className="filter-buttons">
      {employmentTypesList.map(eachEmploymentType => (
        <li className="checkbox-list" key={eachEmploymentType.employmentTypeId}>
          <input
            onChange={this.getCheckboxInputs}
            id={eachEmploymentType.employmentTypeId}
            type="checkbox"
          />
          <label htmlFor={eachEmploymentType.employmentTypeId}>
            {eachEmploymentType.label}
          </label>
        </li>
      ))}
    </ul>
  );

  onGetLocationBased = () => (
    <ul className="filter-buttons">
      {locationBasedList.map(eachLocation => (
        <li className="radio-items-list" key={eachLocation.locationId}>
          <input
            onChange={this.handleLocationChange}
            id={eachLocation.locationId}
            type="radio"
            name="location"
          />
          <label htmlFor={eachLocation.locationId}>
            {eachLocation.label}
          </label>
        </li>
      ))}
    </ul>
  );

  onGetSalaryRange = () => (
    <ul className="filter-buttons">
      {salaryRangesList.map(eachRadioItem => (
        <li className="radio-items-list" key={eachRadioItem.salaryRangeId}>
          <input
            onChange={this.getRadioOptions}
            type="radio"
            name="salary"
            id={eachRadioItem.salaryRangeId}
          />
          <label htmlFor={eachRadioItem.salaryRangeId}>
            {eachRadioItem.label}
          </label>
        </li>
      ))}
    </ul>
  );

  renderJobsViewList = () => {
    const { jobsData } = this.state;
    const noJobs = jobsData.length === 0;
    return noJobs ? (
      <div className="no-jobs">
        <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no jobs" />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    ) : (
      <ul>
        {jobsData.map(eachJob => (
          <JobsRoute key={eachJob.id} eachJobData={eachJob} />
        ))}
      </ul>
    );
  };

  onRetryJobs = () => {
    this.getJobsData();
  };

  renderJobFailureView = () => (
    <div className="job-failure-view">
      <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="job-retry" onClick={this.onRetryJobs}>
        Retry
      </button>
    </div>
  );

  renderJobLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Circles type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderJobsStatus = () => {
    const { apiJobStatus } = this.state;
    switch (apiJobStatus) {
      case apiJobStatusConstants.success:
        return this.renderJobsViewList();
      case apiJobStatusConstants.failure:
        return this.renderJobFailureView();
      case apiJobStatusConstants.inProgress:
        return this.renderJobLoadingView();
      default:
        return null;
    }
  };

  onChangeSearchInput = event => {
    this.setState({ searchInput: event.target.value });
  };

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData();
    }
  };

  onClickSearch = () => {
    this.getJobsData();
  };

  render() {
    const { searchInput } = this.state;
    return (
      <>
        <Header />
        <div className="profile-and-job-container">
          <div className='profile-and-filters-container'>
            <Profile />
            <hr />
            <h1 className="emp-type-heading">Type of Employment</h1>
            {this.onGetEmploymentType()}
            <hr />
            <h1 className="salary-heading">Salary Range</h1>
            {this.onGetSalaryRange()}
            <hr />
            <h1 className="salary-heading">Select Location</h1>
            {this.onGetLocationBased()}
          </div>
          <div className="jobs-container-all-jobs">
            <div className="search-bar">
              <input
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
                placeholder="search"
                type="search"
                className="input"
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
                className="search-btn"
              >
                <AiOutlineSearch />
              </button>
            </div>
            {this.renderJobsStatus()}
          </div>
        </div>
      </>
    );
  }
}

export default AllJobs
