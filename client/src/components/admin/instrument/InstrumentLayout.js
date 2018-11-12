import React from "react"
import { Header } from "semantic-ui-react"

import InstrumentCreateButton from "./InstrumentCreateButton"
import InstrumentCreateForm from "./InstrumentCreateForm"
import InstrumentList from "./InstrumentList"
import MappingDeleteSuccessMessage from "./mapping/MappingDeleteSuccessMessage"
import MappingDeleteErrorMessage from "./mapping/MappingDeleteErrorMessage"
import InstrumentCreateSuccessMessage from "./InstrumentCreateSuccessMessage"
import InstrumentCreateErrorMessage from "./InstrumentCreateErrorMessage"
import InstrumentUpdateForm from "./InstrumentUpdateForm"
import InstrumentDeleteSuccessMessage from "./InstrumentDeleteSuccessMessage"
import InstrumentUpdateSuccessMessage from "./InstrumentUpdateSuccessMessage"
import InstrumentUpdateErrorMessage from "./InstrumentUpdateErrorMessage"
import InstrumentDeleteErrorMessage from "./InstrumentDeleteErrorMessage"
import InstrumentListErrorMessage from "./InstrumentListErrorMessage"

const InstrumentLayout = () => (
  <div>
    <Header as="h3">Instrument List</Header>

    <InstrumentListErrorMessage />

    <InstrumentCreateButton />
    <InstrumentCreateForm />
    <InstrumentCreateSuccessMessage />
    <InstrumentCreateErrorMessage />

    <InstrumentUpdateForm />
    <InstrumentUpdateSuccessMessage />
    <InstrumentUpdateErrorMessage />

    <InstrumentDeleteSuccessMessage />
    <InstrumentDeleteErrorMessage />

    <InstrumentList />

    <MappingDeleteSuccessMessage />
    <MappingDeleteErrorMessage />
  </div>
)

export default InstrumentLayout
