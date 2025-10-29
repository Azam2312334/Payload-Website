import React from 'react';

interface TimePickerProps {
  value?: string;
  onChange: (val: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  return (
    <input
      type="time"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', padding: '8px', fontSize: '1rem' }}
    />
  );
};

export default TimePicker;
