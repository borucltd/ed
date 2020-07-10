import React from "react";

function Header(props) {
  return ( 
    <div class="jumbotron">
    <h1 className="text-dark" style={{fontSize: '6rem'}}>Employee directory</h1>
    <form>
      <div className="form-group">
        <label htmlFor="Filter">Search the first name: </label>
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
    </div>
  );
}

export default Header;
