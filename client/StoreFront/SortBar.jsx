import React from 'react';
import '../styles/components/sortBar';
const { func, object } = React.PropTypes;

const SortBar = (props) => (
  <div id="sortBar">
    {
      props.sortOptions.map((option) => (
        <div className="sortCheck"
          key={ option }
        >
          <input
            id={ `${option}Box` }
            checked={ props.sortType === option }
            onChange={ props.handleSortClick }
            type="checkbox"
            value={ option }
          />
          <p>
            { option[0].toUpperCase() + option.slice(1) }
          </p>
        </div>
      ))
    }
  </div>
);
SortBar.propTypes = {
  handleSortClick: func,
  sortOptions: object
};

export default SortBar;
