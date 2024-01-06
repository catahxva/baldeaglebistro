import { Outlet } from "react-router-dom";

import RootAuthContent from "../UI/RootAuthComponents/RootAuthContent";

function RootAuth() {
  return (
    <>
      <RootAuthContent outlet={<Outlet />} />
    </>
  );
}

export default RootAuth;
