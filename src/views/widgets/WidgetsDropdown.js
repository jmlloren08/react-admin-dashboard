import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBook, cilOpentype, cibHackerrank, cibPagekit } from '@coreui/icons'
import Axios from 'axios'
import Swal from 'sweetalert2'

const WidgetsDropdown = () => {
  const [bookStats, setBookStats] = useState([])
  const fetchBookStats = async () => {
    try {
      const response = await Axios.get('http://localhost:4000/API/Posts/count')
      setBookStats(response.data)
    } catch (error) {
      Swal.fire('Error fetching book count', error.message, 'error')
    }
  }
  useEffect(() => {
    fetchBookStats()
  }, [])
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              {bookStats.bookCount}{' '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilBook} />
              </span>
            </>
          }
          title="Total Books"
          style={{ paddingBottom: '20px' }}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              {bookStats.totalPageCount}{' '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cibPagekit} />
              </span>
            </>
          }
          title="Total Pages"
          style={{ paddingBottom: '20px' }}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              {bookStats && bookStats.totalGenres && bookStats.totalGenres.length}{' '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilOpentype} />
              </span>
            </>
          }
          title="Total Genres"
          style={{ paddingBottom: '20px' }}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              {bookStats.totalRating}{' '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cibHackerrank} />
              </span>
            </>
          }
          title="Total Rating"
          style={{ paddingBottom: '20px' }}
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
