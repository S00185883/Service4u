import React, { useEffect, useState } from "react";

import options from "../Location/data";
import AppNavbar from "../Utils/AppNavbar";
import CheckIcon from "@material-ui/icons/Check";

import {
  Button,

  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import ProviderInfo from "../Home/Providerinfo";
import { Divider, InputBase, Menu, MenuItem } from "@mui/material";
function Dashboard() {
 

  const refreshPage = () => {
    return window.localStorage.getItem( "value" ); // !! : cast to boolean
  };

  const [ value, setValue ] = useState( refreshPage() );
  const handleSelect = ( e ) => {
    console.log( e );
    setValue( e );
    window.localStorage.setItem( "value", e );
    window.location.reload( false );
  };
  const [ anchorEl, setAnchorEl ] = useState( null );
  const [ searchText, setSearchText ] = useState( "" );
  const [ selection, setSelection ] = useState( "" );

  useEffect( () => {
    setSelection( options[ 0 ].label );
  }, [] );

  const handleMenuOpen = ( event ) => {
    setAnchorEl( event.currentTarget );
  };

  const handleClose = ( e ) => {
    if ( e.target.innerText !== selection && e.target.innerText !== "" ) {
      setSelection( e.target.innerText );
    }
    setSearchText( "" );
    setAnchorEl( null );
  };

  const handleSearchChange = ( e ) => {
    setSearchText( e.target.value );
  };


  return (
    <div>
      <AppNavbar />

      <h2>Please select your location</h2>
      <Button type="button" onClick={handleMenuOpen}>
        {selection}
        <i className="fas fa-chevron-down" />
      </Button>
      {renderDashboardMenu()}
    </div>
  );

  function renderDashboardMenu() {
    const displayOptions = options
      // eslint-disable-next-line
      .map((item) => {
        if (item.label.toLowerCase().includes(searchText.toLowerCase())) {
          return item;
        }
      })
      .filter((item) => item !== undefined);

    function renderOption( value ) {
      if ( selection === value ) {
        return (
          <div>
            <CheckIcon />
            { value }
          </div>
        );
      }
      return value;
    }
    return (
      <>
        <Menu
          anchorEl={anchorEl}
          keepMounted={true}
          open={!!anchorEl}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 110, left: 240 }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem
            disableTouchRipple={true}
          >
            <div >
              <div >
                <i className="fas fa-search " />
              </div>
              <InputBase
                placeholder="SEARCH..."
               
                onChange={handleSearchChange}
                value={searchText}
              />
            </div>
          </MenuItem>
          <Divider />
          {displayOptions.map((item, index) => {
            return (
              <div key={index}>
                <MenuItem onClick={(e) => handleClose(e)}>
                  {renderOption(item.label)}
                </MenuItem>
                <Divider  />
              </div>
            );
          })}
        </Menu>
        <DropdownButton alignRight title={value} onSelect={handleSelect}>
          <Dropdown.Item eventKey="All">All Services</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="Taxi">Taxi</Dropdown.Item>
          <Dropdown.Item eventKey="Plumbing">Plumbing</Dropdown.Item>
          <Dropdown.Item eventKey="PetCare">Pet Care</Dropdown.Item>
          <Dropdown.Item eventKey="Electrician">Electrician</Dropdown.Item>
          <Dropdown.Item eventKey="Carpentry">Carpentry</Dropdown.Item>
        </DropdownButton>

        {ProviderInfo(value)}

      </>
    );
  }
}
export default Dashboard;
