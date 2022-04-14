import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, InputBase, Menu, Divider } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import options from "./data";
import { Link, useNavigate } from "react-router-dom";

import "./location.css";
const useStyles = makeStyles((theme) => ({
  DropDownButton: {
    // margin: "50px 50px",
    fontSize: "1.125rem",
    width: "275px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "2px solid #007bff",
    borderRadius: "10px",
    backgroundColor: "white",
    cursor: "pointer",
    padding: "0px 20px",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: "20px",
    marginLeft: 0,
    width: "100%",
    border: "1px solid grey",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  MuiPaper: {
    left: "400px",
  },
  searchBarContainer: {
    minWidth: "inherit",
    display: "flex",
    justifyContent: "space-evenly",
    cursor: "default",
    "&.MuiListItem-button": {
      "&:hover": {
        backgroundColor: "white",
      },
    },
  },
  menuDivider: {
    margin: "0 20px",
  },
  dashboardSelectMenu: {
    "& .MuiPopover-paper": {
      minWidth: "80px",
      maxWidth: "fit-content",
    },
  },
  externalLinkIcon: {
    borderLeft: "1px solid var(--color-gray-eighty-five)",
    padding: "10px 0px 10px 10px",
    color: "var(--color-primary)",
    cursor: "pointer",
  },
  checkedItem: {
    color: "indigo",
  },
}));

function Location() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selection, setSelection] = useState("");



  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.target.innerText !== selection && e.target.innerText !== "") {
      setSelection(e.target.innerText);
      window.localStorage.setItem("county", e.target.innerText);
    }
    setSearchText("");
    setAnchorEl(null);
  };
  const location = window.localStorage.getItem("county");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  function SubmitButton() {
    if (selection) {
      return (
        <Button variant="primary" type="link" to="/dashboard">
          <Link className="alink" to="/dashboard">
            Continue
          </Link>
        </Button>
      );
    } else {
      return (
        <Button variant="primary" type="submit" disabled>
          Continue
        </Button>
      );
    }
  }

  const [show, setShow] = useState(false);
  const handleClosed = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="container">
      <div className="card">
        <h2>Please select your location</h2>
        <br />
        <br />

        <Button
          type="button"
          className={classes.DropDownButton}
          onClick={handleMenuOpen}
        >
          {selection}
          <i className="fas fa-chevron-down" />
        </Button>
        {renderDashboardMenu()}
      </div>
    </div>
  );

  function renderDashboardMenu() {
    const displayOptions = options
      .map((item) => {
        if (item.label.toLowerCase().includes(searchText.toLowerCase())) {
          return item;
        }
      })
      .filter((item) => item !== undefined);

    function renderOption(value) {
      if (selection === value) {
        return (
          <div className={classes.checkedItem}>
            <CheckIcon />
            {value}
          </div>
        );
      }
      return value;
    }

    return (
      <>
        <div className="dropdowncontainer">
          <Menu
            anchorEl={anchorEl}
            keepMounted={true}
            open={!!anchorEl}
            onClose={handleClose}
            className={classes.dashboardSelectMenu}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 150, left: 720 }}
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
              className={classes.searchBarContainer}
              disableTouchRipple={true}
            >
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <i className="fas fa-search " />
                </div>
                <InputBase
                  placeholder="SEARCH..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
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
                  <Divider className={classes.menuDivider} />
                </div>
              );
            })}
          </Menu>
        </div>
        <br />
        <h3>{selection} </h3> <br />
        <br />
        {SubmitButton()}
      </>
    );
  }
}

export default Location;
