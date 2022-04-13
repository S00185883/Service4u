import React, { useEffect, useState } from "react";

import AppNavbar from "../Utils/AppNavbar";
import CheckIcon from "@material-ui/icons/Check";

import { Divider, InputBase, Menu, MenuItem } from "@mui/material";
import Provider from "./provider";
function ProviderPage() {
  const refreshPage = () => {
    return window.localStorage.getItem("value"); // !! : cast to boolean
  };

  const [value, setValue] = useState(refreshPage());
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
    window.localStorage.setItem("value", e);
    window.location.reload(false);
  };

  const location = window.localStorage.getItem("county");

  return (
    <>
      <AppNavbar />
<Provider/>
    </>
  );
}

export default ProviderPage;
