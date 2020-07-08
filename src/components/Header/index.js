import React from "react";

function Header(props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="Filter">Filter: </label>
        <input
          onChange={props.handleInputChange}
          name="search"
          type="text"
          className="form-control"
          placeholder="..."
          id="search"
        />
      </div>
    </form>
  );
}

export default Header;
