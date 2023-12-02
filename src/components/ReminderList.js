//ReminderList.js
import React from 'react';

const ReminderList = ({ reminders, onDelete }) => {
  return (
    <div>
      <h2>Medicine Reminders</h2>
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>
            <strong>Medicine:</strong> {reminder.medicineName}<br />
            <strong>Doses:</strong> {reminder.doses.length}<br />
            <strong>Reminder Times:</strong>
            <ul>
              {reminder.doses.map((dose, doseIndex) => (
                <li key={doseIndex}>
                  Dose {dose.dose}: {dose.times.join(', ')}
                </li>
              ))}
            </ul>
            <strong>Days to take the medicine:</strong> {reminder.weekdays.map((weekday) => (
              <span key={weekday} className="checkbox-tile selected">
                {weekday}
                 ,
              </span>
            ))}
            <button onClick={() => onDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
