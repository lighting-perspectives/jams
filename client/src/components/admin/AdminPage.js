import React from 'react'
import { Container, Menu } from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom'
import SamplePage from './sample/SamplePage'
import AdminHomePage from './AdminHomePage'
import InstrumentPage from './instrument/InstrumentPage'

const AdminPage = ({match, location}) => {
  return (
    <Container style={{marginTop: '5em'}}>
      <Menu secondary>
        <Menu.Item
          as={Link}
          to={`${match.url}/samples`}
          active={/^\/admin\/samples$/.test(location.pathname)}
        >
        Samples
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={`${match.url}/instruments`}
          active={/^\/admin\/instruments$/.test(location.pathname)}
        >
        Instruments
        </Menu.Item>
      </Menu>

      <Route path={`${match.url}/samples`} component={SamplePage} />
      <Route path={`${match.url}/instruments`} component={InstrumentPage} />
      <Route exact path={match.url} component={AdminHomePage} />

    </Container>
  )
}

export default AdminPage
