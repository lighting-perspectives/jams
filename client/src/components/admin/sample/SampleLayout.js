import React from 'react'
import { Header } from 'semantic-ui-react'

import SampleList from './SampleList'
import SampleCreateForm from './SampleCreateForm'
import SampleUpdateForm from './SampleUpdateForm'
import SampleCreateButton from './SampleCreateButton'

const SampleLayout = () => (
  <div>
    <Header as='h3'>Sample List</Header>
    <SampleCreateButton />
    <SampleCreateForm />
    <SampleUpdateForm />
    <SampleList />
  </div>
)

export default SampleLayout
