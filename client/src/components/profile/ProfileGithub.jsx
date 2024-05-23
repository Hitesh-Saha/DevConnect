import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileGithub = ({ username }) => {
  const [repos, setRepos] = useState([]);

  const clientId = '26c196bacea7db10cf48';
  const clientSecret = '0885cb690e07d2a93a6afb0891fb552fd9f7aa53';
  const count = 5;
  const sort = 'created: asc';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        );
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRepos();
  }, [username]);

  const repoItems = repos.map(repo => (
    <div key={repo.id} className="card card-body mb-2">
      <div className="row">
        <div className="col-md-6">
          <h4>
            <Link to={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer">
              {repo.name}
            </Link>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">
            Forks: {repo.forks_count}
          </span>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems}
    </div>
  );
};

export default ProfileGithub;
