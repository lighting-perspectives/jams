import React from 'react'
import { Container, Header } from 'semantic-ui-react'

import SampleViewList from './SampleViewList'
import SampleForm from './SampleForm'
import SampleUpdateForm from './SampleUpdateForm'

const SampleLayout = () => (
  <Container style={{marginTop: '3em'}}>
    <Header as='h3'>Sample List</Header>
    <SampleForm />
    <SampleUpdateForm />
    <SampleViewList />
  </Container>
)

export default SampleLayout
