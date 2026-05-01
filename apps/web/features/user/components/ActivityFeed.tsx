import React from 'react';
import { GitCommit, Rocket, CheckCircle2, AlertCircle } from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: 'deploy',
      title: 'Production Deployment Successful',
      description: 'Deployed v2.4.1 to production cluster',
      time: '2 hours ago',
      icon: <Rocket size={16} />,
      color: 'var(--accent-green)',
    },
    {
      id: 2,
      type: 'commit',
      title: 'Pushed to main',
      description: 'fix: resolved memory leak in logging service',
      time: '5 hours ago',
      icon: <GitCommit size={16} />,
      color: 'var(--text-primary)',
    },
    {
      id: 3,
      type: 'error',
      title: 'Build Failed',
      description: 'Staging build failed due to test coverage drop',
      time: '1 day ago',
      icon: <AlertCircle size={16} />,
      color: 'var(--accent-red)',
    },
    {
      id: 4,
      type: 'success',
      title: 'Environment Variables Updated',
      description: 'Updated production database credentials',
      time: '2 days ago',
      icon: <CheckCircle2 size={16} />,
      color: 'var(--accent-blue)',
    },
  ];

  return (
    <div className="feedContainer">
      {activities.map((activity, idx) => (
        <div key={activity.id} className="feedItem">
          {idx !== activities.length - 1 && <div className="feedLine" />}

          <div
            className="feedIcon"
            style={{
              backgroundColor: `${activity.color}15`,
              color: activity.color,
            }}
          >
            {activity.icon}
          </div>

          <div className="feedContent">
            <div className="feedHeader">
              <h4 className="feedTitle">{activity.title}</h4>
              <span className="feedTime">{activity.time}</span>
            </div>
            <p className="feedDesc">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
