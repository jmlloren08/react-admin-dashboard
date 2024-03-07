import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { DocsExample } from 'src/components'

const Buttons = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/buttons#block-buttons">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="primary" className="me-md-2">
                  Button
                </CButton>
                <CButton color="primary">Button</CButton>
              </div>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Buttons
