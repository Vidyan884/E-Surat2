import React from 'react';

const Skeleton = ({ type = 'dashboard' }) => {
  if (type === 'dashboard') {
    return (
      <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-full">
            <div className="h-8 bg-slate-200 rounded-md w-48 mb-3 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded-md w-72 animate-pulse"></div>
          </div>
          <div className="h-10 bg-slate-200 rounded-lg w-32 shrink-0 animate-pulse"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-200 animate-pulse"></div>
                <div className="h-5 w-12 bg-slate-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-4 w-24 bg-slate-200 rounded-md mb-2 animate-pulse"></div>
              <div className="h-8 w-16 bg-slate-200 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
            <div className="h-5 w-40 bg-slate-200 rounded-md mb-6 animate-pulse"></div>
            <div className="flex flex-col gap-3">
              {[1,2,3].map(i => (
                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="h-4 w-16 bg-slate-200 rounded-md mb-2 animate-pulse"></div>
                  <div className="h-4 w-full bg-slate-200 rounded-md mb-1 animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-slate-200 rounded-md mb-3 animate-pulse"></div>
                  <div className="flex justify-between">
                    <div className="h-3 w-32 bg-slate-200 rounded-md animate-pulse"></div>
                    <div className="h-6 w-6 rounded-full bg-slate-200 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
            <div className="h-6 w-48 bg-slate-200 rounded-md mb-2 animate-pulse"></div>
            <div className="h-4 w-64 bg-slate-200 rounded-md mb-8 animate-pulse"></div>
            <div className="flex-1 min-h-[200px] bg-slate-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-full">
            <div className="h-8 bg-slate-200 rounded-md w-48 mb-3 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded-md w-72 animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex-1 h-4 bg-slate-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="divide-y divide-slate-100">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="p-4 flex gap-4">
                {[1,2,3,4,5].map(j => (
                  <div key={j} className="flex-1 h-4 bg-slate-100 rounded animate-pulse"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="h-6 w-32 bg-slate-200 rounded-md mb-4 animate-pulse"></div>
            <div className="h-8 w-full bg-slate-200 rounded-md mb-6 animate-pulse"></div>
            <div className="h-64 w-full bg-slate-100 rounded-xl animate-pulse"></div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <div className="h-5 w-40 bg-slate-200 rounded-md mb-2 animate-pulse"></div>
            <div className="h-12 w-full bg-slate-100 rounded-lg animate-pulse"></div>
            <div className="h-12 w-full bg-slate-100 rounded-lg animate-pulse"></div>
            <div className="h-32 w-full bg-slate-100 rounded-lg animate-pulse"></div>
            <div className="h-10 w-full bg-slate-200 rounded-lg mt-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Skeleton;
