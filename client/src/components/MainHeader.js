import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Image, Menu } from 'semantic-ui-react'
import logo from '../logo.svg'
import './MainHeader.css'

const MainHeader = ({location}) => {
  return (
    <Menu fixed='top' inverted>
      <Menu.Item as='a' header>
        <Image
          size='mini'
          className='App-logo'
          src={logo}
          style={{ marginRight: '1.5em' }}
        />
        JAMS
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/'
        active={/^\/$/.test(location.pathname)}
      >
        Home
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/dashboard'
        active={/^\/dashboard$/.test(location.pathname)}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/session'
        active={/^\/session$/.test(location.pathname)}
      >
        Session
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/admin'
        active={/^\/admin/.test(location.pathname)}
      >
        Admin
      </Menu.Item>
    </Menu>
  )
}

export default withRouter(MainHeader)
