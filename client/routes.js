import React from "react";
import { Route } from "react-router";
import SignUp from "./containers/SignUp";

const getRoutes = () => (
  <Route path='/' component={SignUp} />
);

export default getRoutes;
