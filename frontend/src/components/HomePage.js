import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { getAssets, getDebts } from '../services/api';
import '../styles/home.css';

function HomePage() {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [recentlyCompleted, setRecentlyCompleted] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsResponse = await getAssets();
        const debtsResponse = await getDebts();

        const assets = assetsResponse.data;
        const debts = debtsResponse.data;

        const tasks = [];
        const completed = [];
        let totalSteps = 0;
        let completedSteps = 0;

        const assetSteps = [
          { key: 'inventoried', task: 'Inventory', past: 'Inventoried' },
          { key: 'valued', task: 'Value', past: 'Valued' },
          { key: 'marshalled', task: 'Marshal', past: 'Marshaled' },
          { key: 'administered', task: 'Administer', past: 'Administered' },
        ];

        // Process assets
        assets.forEach((asset) => {
          let nextTaskAdded = false;

          assetSteps.forEach(({ key, task, past }, index) => {
            totalSteps++;

            if (!asset[key] && !nextTaskAdded) {
              tasks.push({
                text: `${task} asset:`,
                name: asset.name,
                link: '/assets',
              });
              nextTaskAdded = true; // Only add the first unmet step for this asset
            } else if (asset[key]) {
              completed.push({
                text: `${past} asset:`,
                name: asset.name,
                link: '/assets',
              });
              completedSteps++;
            }
          });
        });

        // Process debts
        debts.forEach((debt) => {
          totalSteps++;

          if (debt.status === 'Unpaid') {
            tasks.push({ text: 'Pay debt:', name: debt.name, link: '/debts' });
          } else if (debt.status === 'Partially Paid') {
            tasks.push({
              text: 'Complete payment for debt:',
              name: debt.name,
              link: '/debts',
            });
          } else if (debt.status === 'Paid') {
            completed.push({
              text: 'Paid off debt:',
              name: debt.name,
              link: '/debts',
            });
            completedSteps++;
          }
        });

        const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

        setUpcomingTasks(tasks.slice(0, 5)); // Show up to 5 tasks
        setRecentlyCompleted(completed);
        setProgress(progressPercentage);

        // Redirect to FAQ page if user has no tasks and they came from sign-in
        if (tasks.length === 0 && completed.length === 0 && location.state?.fromSignIn) {
          navigate('/faq#overview', { state: { fromSignIn: true } });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.state, navigate]);

  const handleTaskClick = (link) => {
    navigate(link);
  };

  return (
    <div className="container mt-5">
      <Header />

      <div className="text-center mb-5">
        <h1 className="display-4">Estate Management</h1>
        <p className="text-muted">Stay on top of your estate tasks and progress.</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container mb-5 px-4">
        <div className="progress bg-light shadow-sm">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className="text-center mt-2">{Math.round(progress)}% Complete</p>
      </div>

      <div className="tasks-container px-4">
        {/* Upcoming Tasks */}
        <div className="task-section mb-5">
          <h2 className="text-primary mb-4">Upcoming Tasks</h2>
          <div className="task-list shadow-sm bg-light rounded p-4">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task, index) => (
                <React.Fragment key={index}>
                  <div
                    className="task-item d-flex justify-content-between align-items-center p-2 rounded"
                    onClick={() => handleTaskClick(task.link)}
                    style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
                  >
                    <span>
                      <strong>{task.text}</strong> <em>{task.name}</em>
                    </span>
                    <span className="badge bg-secondary">To Do</span>
                  </div>
                  {index < upcomingTasks.length - 1 && <hr className="task-divider" />}
                </React.Fragment>
              ))
            ) : (
              <p className="text-muted text-center">
                No upcoming tasks at the moment. Start by adding a{' '}
                <span
                  style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate('/debts')}
                >
                  debt
                </span>{' '}
                or an{' '}
                <span
                  style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate('/assets')}
                >
                  asset
                </span>
                .
              </p>
            )}
          </div>
        </div>

        {/* Recently Completed */}
        <div className="task-section">
          <h2 className="text-success mb-4">Recently Completed</h2>
          <div className="task-list shadow-sm bg-light rounded p-4">
            {recentlyCompleted.length > 0 ? (
              recentlyCompleted.map((task, index) => (
                <React.Fragment key={index}>
                  <div
                    className="task-item d-flex justify-content-between align-items-center p-2 rounded"
                    onClick={() => handleTaskClick(task.link)}
                    style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
                  >
                    <span>
                      <strong>{task.text}</strong> <em>{task.name}</em>
                    </span>
                    <span className="badge bg-success">Completed</span>
                  </div>
                  {index < recentlyCompleted.length - 1 && <hr className="task-divider" />}
                </React.Fragment>
              ))
            ) : (
              <p className="text-muted text-center">No recently completed tasks.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;