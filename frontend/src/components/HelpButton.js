import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa'; // Import the question mark icon

const HelpButton = ({ section }) => {
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate(`/faq#${section}`);
  };

  return (
    <button
      className="btn btn-info d-flex align-items-center gap-2"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        justifyContent: 'center',
      }}
      onClick={handleHelpClick}
    >
      <FaQuestionCircle size={24} />
    </button>
  );
};

export default HelpButton;