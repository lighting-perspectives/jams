import React from "react"
import { Router } from "@reach/router"

import MainHeader from "./components/MainHeader"
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import Session from "./components/Session"
import AdminPage from "./components/admin/AdminPage"
import SamplePage from "./components/admin/sample/SamplePage"
import InstrumentPage from "./components/admin/instrument/InstrumentPage"
import AdminHomePage from "./components/admin/AdminHomePage"

const App = () => (
  <div>
    <MainHeader />

    <Router>
      <Home path="/" />
      <Dashboard path="dashboard" />
      <Session path="session" />
      <AdminPage path="admin">
        <SamplePage path="samples" />
        <InstrumentPage path="instruments" />
        <AdminHomePage path="/" />
      </AdminPage>
    </Router>
  </div>
)

export default App
