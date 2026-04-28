import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type = 'dashboard' }) => {
  if (type === 'dashboard') {
    return (
      <div className="sk-container">
        {/* Header Skeleton */}
        <div className="sk-header-row">
          <div>
            <div className="sk-bar sk-w-200 sk-h-24 sk-mb-8"></div>
            <div className="sk-bar sk-w-300 sk-h-14"></div>
          </div>
          <div className="sk-bar sk-w-120 sk-h-40"></div>
        </div>

        {/* Stats Grid */}
        <div className="sk-stats-grid">
          {[1,2,3,4].map(i => (
            <div key={i} className="sk-card">
              <div className="sk-card-row">
                <div className="sk-circle sk-w-44"></div>
                <div className="sk-bar sk-w-60 sk-h-20"></div>
              </div>
              <div className="sk-bar sk-w-120 sk-h-14 sk-mt-12"></div>
              <div className="sk-bar sk-w-80 sk-h-28 sk-mt-8"></div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="sk-main-grid">
          <div className="sk-card sk-tall">
            <div className="sk-bar sk-w-180 sk-h-18 sk-mb-16"></div>
            {[1,2,3].map(i => (
              <div key={i} className="sk-list-item">
                <div className="sk-bar sk-w-60 sk-h-20 sk-mb-8"></div>
                <div className="sk-bar sk-w-full sk-h-16"></div>
                <div className="sk-bar sk-w-200 sk-h-12 sk-mt-8"></div>
              </div>
            ))}
          </div>
          <div className="sk-card sk-tall">
            <div className="sk-bar sk-w-180 sk-h-18 sk-mb-16"></div>
            <div className="sk-bar sk-w-full sk-h-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="sk-container">
        <div className="sk-header-row">
          <div>
            <div className="sk-bar sk-w-200 sk-h-24 sk-mb-8"></div>
            <div className="sk-bar sk-w-300 sk-h-14"></div>
          </div>
        </div>
        <div className="sk-card">
          <div className="sk-table-row sk-table-header">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="sk-bar sk-w-100 sk-h-12"></div>
            ))}
          </div>
          {[1,2,3,4].map(i => (
            <div key={i} className="sk-table-row">
              {[1,2,3,4,5].map(j => (
                <div key={j} className="sk-bar sk-w-100 sk-h-14"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="sk-container">
        <div className="sk-detail-grid">
          <div className="sk-card sk-tall">
            <div className="sk-bar sk-w-100 sk-h-20 sk-mb-12"></div>
            <div className="sk-bar sk-w-full sk-h-28 sk-mb-16"></div>
            <div className="sk-bar sk-w-full sk-h-300"></div>
          </div>
          <div className="sk-card sk-tall">
            <div className="sk-bar sk-w-180 sk-h-20 sk-mb-16"></div>
            <div className="sk-bar sk-w-full sk-h-40 sk-mb-12"></div>
            <div className="sk-bar sk-w-full sk-h-40 sk-mb-12"></div>
            <div className="sk-bar sk-w-full sk-h-120 sk-mb-12"></div>
            <div className="sk-bar sk-w-full sk-h-40"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Skeleton;
