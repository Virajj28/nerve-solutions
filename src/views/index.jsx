import React, { useState } from 'react';
import { dateArray, strategyArray } from '../mockData/data';
import { BsDot } from "react-icons/bs";
import { CustomDropdown } from "../components/customDropdown";

function StrategiesView() {
  const [selectedView, setSelectedView] = useState('Bullish');
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);

  // To Toggle Views
  const viewChangeHandler = (view) => {
    setSelectedView(view);
  };

  // To handle data acc. to date
  const dateChangeHandler = (date) => {
    setSelectedDate(date);
  };

  // Get View from arr
  const views = strategyArray.reduce((acc, strategObj) => {
    acc.push(strategObj.View);
    return acc;
  }, []);

  // Get Startegies according to date
  const getStrategiesForDate = (date) => {
    const viewData = strategyArray.find(strategy => strategy.View === selectedView);
    const strategies = viewData?.Value[date] || [];
    const strategyCounts = strategies.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(strategyCounts).map(([name, count]) => ({ name, count })).sort((a, b) => a.count - b.count);
  };

  // Store startegies in this variable wrt selected date by user
  const strategies = getStrategiesForDate(selectedDate);

  return (
    <div className="selector-container">
      {/* Toggle View Buttons */}
      <div className="toggle-buttons">
        {views.map(view => (
          <button
            key={view}
            className={`toggle-button ${selectedView === view ? 'active' : ''}`}
            onClick={() => viewChangeHandler(view)}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Custom Dropdown for Date  */}
      <CustomDropdown
        options={dateArray}
        selectedValue={selectedDate}
        onChange={dateChangeHandler}
      />

      {/* Strategies Cards */}
      {strategies.length > 0 ? (
        <div className="strategy-cards">
          {strategies.map((strategy, index) => (
            <div key={index} className="strategy-card">
              <p>{strategy.name}</p>
              <p className='strategy-count'><BsDot color="#717A94" width={3} height={3} /> {strategy.count} {strategy.count > 1 ? 'Strategies' : 'Strategy'}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='empty-view'>There are no strategies for <br />
          <strong>{selectedDate}</strong></div>
      )}
    </div>
  );
}

export default StrategiesView;
