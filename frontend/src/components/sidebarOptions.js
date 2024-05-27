import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '@mui/icons-material';
import './sidebaroptions.css';
import { setSelectedCategory } from '../features/optionsSlice';

function SidebarOptions() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
  const categories = [
    "Interview",
    "Data Science",
    "Data structures",
    "DBMS",
    "OOP",
    "Operating System",
    "Conferences",
    "Hackathons",
    "CN",
    "Web Technology"
  ];

  // Get the selected category from Redux state
  const selectedCategory = useSelector(state => state.options.selectedCategory);

  // Function to handle option click
  const handleOptionClick = (category, index) => {
    if (selectedOption === index) {
      dispatch(setSelectedCategory(null)); // Toggle off the selected category
      setSelectedOption(null); // Clear selected option
    } else {
      dispatch(setSelectedCategory(category)); // Dispatch action to set selected category
      setSelectedOption(index); // Set selected option index
    }
  };

  return (
    <div className="sidebarOptions">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`sidebarOption ${selectedOption === index ? 'selected' : ''}`} // Apply 'selected' class if this option is selected
          onClick={() => handleOptionClick(category, index)}
        >
          <img alt="" />
          <p>{category}</p>
        </div>
      ))}
      <div className="sidebarOption">
        <Add />
        <p className="text">Discover Spaces</p>
      </div>
    </div>
  );
}

export default SidebarOptions;
