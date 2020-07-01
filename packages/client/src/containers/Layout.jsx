import React, { Component } from "react"
import AdminContainer from "./AdminContainer"
import HomePage from "./Homepage"

import { loggedIn } from "../utils/hooks"

const Layout = () => {
  if (loggedIn()) {
    return <AdminContainer />
  } else {
    return <HomePage />
  }
}

export default Layout
