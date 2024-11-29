import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpButton = ({ section }) => {
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate(`/faq#${section}`);
  };

  return (
    <button
      className="btn btn-info"
      style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      onClick={handleHelpClick}
    >
      Help
    </button>
  );
};

export default HelpButton;