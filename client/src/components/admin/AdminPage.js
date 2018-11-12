import React from "react"
import { Menu } from "semantic-ui-react"
import { Link } from "@reach/router"

const AdminPage = ({ children }) => {
  return (
    <div className="container ui" style={{ marginTop: "5em" }}>
      <Menu secondary>
        <Menu.Item as={Link} to="samples">
          Samples
        </Menu.Item>
        <Menu.Item as={Link} to="instruments">
          Instruments
        </Menu.Item>
      </Menu>

      {children}
    </div>
  )
}

export default AdminPage
