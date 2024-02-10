import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Collapsible = ({ heading, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`collapsible-section ${isOpen ? "open" : ""}`}>
      <div
        className={
          isOpen ? "collapsible-header text-blue-400" : "collapsible-header"
        }
        onClick={toggleCollapsible}
      >
        <div className="header-content">
          <h2>{heading}</h2>
          <span className="toggle-symbol">
            {isOpen ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </div>
      </div>
      <div className="collapsible-content">
        {isOpen && <div className="content-inner">{content}</div>}
      </div>
    </div>
  );
};

export default Collapsible;
