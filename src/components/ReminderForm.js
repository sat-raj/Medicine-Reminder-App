//ReminderForm.js

import React, { useState } from 'react';
import NotificationForm from './NotificationForm';


const ReminderForm = ({ onAdd }) => {
  const [medicineName, setMedicineName] = useState('');
  const [doses, setDoses] = useState([{ dose: 1, times: [''] }]);
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  const handleAddDose = () => {
    setDoses([...doses, { dose: doses.length + 1, times: [''] }]);
  };

  const handleAddReminderTime = (doseIndex) => {
    const updatedDoses = [...doses];
    updatedDoses[doseIndex].times.push('');
    setDoses(updatedDoses);
  };

  const handleReminderTimeChange = (doseIndex, timeIndex, value) => {
    const updatedDoses = [...doses];
    updatedDoses[doseIndex].times[timeIndex] = value;
    setDoses(updatedDoses);
  };

  const handleDeleteTime = (doseIndex, timeIndex) => {
    const updatedDoses = [...doses];
    updatedDoses[doseIndex].times.splice(timeIndex, 1);
    setDoses(updatedDoses);
  };

  const handleDeleteDose = (doseIndex) => {
    if (doses.length === 1) {
      return; // Don't delete the last dose
    }
    const updatedDoses = [...doses];
    updatedDoses.splice(doseIndex, 1);
    setDoses(updatedDoses);
  };

  const handleWeekdayCheckboxChange = (weekday) => {
    const updatedWeekdays = [...selectedWeekdays];
    if (updatedWeekdays.includes(weekday)) {
      updatedWeekdays.splice(updatedWeekdays.indexOf(weekday), 1);
    } else {
      updatedWeekdays.push(weekday);
    }
    setSelectedWeekdays(updatedWeekdays);
  };

  const handleAdd = () => {
    if (medicineName.trim() === '' || doses.some((dose) => dose.times.some((time) => time.trim() === ''))) {
      return;
    }

    const reminder = {
      medicineName,
      doses,
      weekdays: selectedWeekdays, // Include selected weekdays
    };

    onAdd(reminder);

    setMedicineName('');
    setDoses([{ dose: 1, times: [''] }]);
    setSelectedWeekdays([]); // Reset selected weekdays
  };
  const [showNotificationForm, setShowNotificationForm] = useState(false); // State to control visibility

  const toggleNotificationForm = () => {
    setShowNotificationForm(!showNotificationForm);
  };
  return (
    <div className="reminder-form">
      <h2>Add a Reminder</h2>
      <input
        type="text"
        placeholder="Medicine Name"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
      />
      <div className="weekday-selector">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
          <label
            key={weekday}
            className={`weekday-tile ${selectedWeekdays.includes(weekday) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={selectedWeekdays.includes(weekday)}
              onChange={() => handleWeekdayCheckboxChange(weekday)}
            />
            {weekday}
          </label>
        ))}
      </div>
      {doses.map((dose, doseIndex) => (
        <div key={doseIndex} className={`dose-input`}>
          <div className="dose-header">
            <h3>Dose {dose.dose}</h3>
            {doseIndex > 0 && (
              <button
                onClick={() => handleDeleteDose(doseIndex)}
                className="delete-dose-btn"
              >
                Delete Dose
              </button>
            )}
          </div>
          <input
            type="number"
            placeholder="Frequency (times per day)"
            value={dose.times.length}
            onChange={(e) => {
              const updatedDoses = [...doses];
              updatedDoses[doseIndex].times.length = e.target.value;
              setDoses(updatedDoses);
            }}
          />
          <button onClick={() => handleAddReminderTime(doseIndex)} className="add-time-btn">
            Add Reminder Time
          </button>
          {dose.times.map((time, timeIndex) => (
            <div key={timeIndex} className={`time-input`}>
              <input
                type="time"
                placeholder="Reminder Time"
                value={time}
                onChange={(e) => handleReminderTimeChange(doseIndex, timeIndex, e.target.value)}
                className="reminder-time-input"
              />
              {timeIndex > 0 && (
                <button
                  onClick={() => handleDeleteTime(doseIndex, timeIndex)}
                  className="delete-time-btn"
                >
                  Delete Time
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleAddDose} className="add-dose-btn">
        Add Another Dose
      </button>
      <button onClick={handleAdd} className="add-reminder-btn">
        Add
      </button>
      <div className="selected-weekdays">
        Selected Days: {selectedWeekdays.join(', ')}
      </div>
      <button onClick={toggleNotificationForm}>
        {showNotificationForm ? 'Hide Notification Form' : 'Show Notification Form'}
      </button>
      {showNotificationForm && <NotificationForm />}
    </div>
  );
};

export default ReminderForm;
