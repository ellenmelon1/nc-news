import '../ToggleSwitch.css';
import { useState } from 'react';

const ToggleSwitch = ({ label, setOrder }) => {
  const [checked, setChecked] = useState(true);
  const handleToggle = (setOrder) => {
    setChecked(!checked);
    checked ? setOrder('asc') : setOrder('desc');
  };

  return (
    <div className="container ph3 pv2">
      {label}{' '}
      <div className="toggle-switch">
        <input
          type="checkbox"
          onChange={() => {
            handleToggle(setOrder);
          }}
          className="checkbox"
          name={label}
          id={label}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
