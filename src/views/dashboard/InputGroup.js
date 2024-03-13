import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormSelect,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cibSuperuser,
  cilEnvelopeLetter,
  cilLockLocked,
  cilPencil,
  cilTrash,
  cibStatuspage,
  cilOptions,
} from '@coreui/icons'
import Swal from 'sweetalert2'

const Select = () => {
  const [users, setUsers] = useState([])
  const [visible, setVisible] = useState(false)
  const [firstname, setFname] = useState('')
  const [middlename, setMname] = useState('')
  const [lastname, setLname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [userRole, setUserRole] = useState('Choose...')
  const [userStatus, setUserStatus] = useState('Choose...')
  const [userId, setUserId] = useState(undefined)
  useEffect(() => {
    fetchUsers()
  }, [])
  const fetchUsers = async () => {
    try {
      const response = await Axios.get('https://react-occ.vercel.app/API/Users')
      setUsers(response.data)
    } catch (error) {
      Swal.fire('Error fetching users', error.message, 'error')
    }
  }
  const handleSave = async (e) => {
    e.preventDefault()
    try {
      if (
        !firstname ||
        !middlename ||
        !lastname ||
        !username ||
        !email ||
        !password ||
        !userRole ||
        !userStatus
      ) {
        Swal.fire('Warning', 'Please fill out all fields', 'warning')
        return
      }
      if (typeof userId === 'undefined') {
        const response = await Axios.post('https://react-occ.vercel.app/API/Users/register', {
          firstname,
          middlename,
          lastname,
          username,
          email,
          password,
          userRole,
          userStatus,
        })
        setUsers([...users, response.data]) // add new user to users state
        Swal.fire('Success', 'user has been added successfully', 'success')
        setVisible(false)
      } else {
        const response = await Axios.put(`https://react-occ.vercel.app/API/Users/${userId}`, {
          firstname,
          middlename,
          lastname,
          username,
          email,
          password,
          userRole,
          userStatus,
        })
        setUsers(users.map((u) => (u._id === response.data._id ? response.data : u))) // update user in users state
        Swal.fire('Successs', 'Your user has been updated successfully', 'success')
        setUserId(undefined)
        setVisible(false)
      }
      setFname('')
      setMname('')
      setLname('')
      setUsername('')
      setEmail('')
      setPass('')
      setUserRole('Choose...')
      setUserStatus('Choose...')
    } catch (error) {
      Swal.fire('Error adding user', error.message, 'error')
    }
  }
  const handleUpdate = async (user) => {
    setVisible(true)
    setFname(user.firstname)
    setMname(user.middlename)
    setLname(user.lastname)
    setUsername(user.username)
    setEmail(user.email)
    setPass(user.password)
    setUserRole(user.userRole)
    setUserStatus(user.userStatus)
    setUserId(user._id)
  }
  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    })
    if (confirmation.isConfirmed) {
      try {
        await Axios.delete(`https://react-occ.vercel.app/API/Users/${id}`)
        setUsers(users.filter((user) => user._id !== id))
        Swal.fire('Successful', 'Your user has been deleted', 'success')
      } catch (error) {
        Swal.fire(`Couldn't delete the user!`, error.message, 'error')
      }
    } else {
      Swal.fire('Cancelled', 'Your user is safe.', 'error')
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>List of Users</strong>
          </CCardHeader>
          <CCardBody>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <CButton color="primary" className="me-md-2" onClick={() => setVisible(!visible)}>
                Add New
              </CButton>
              <CModal
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="AddNewuser"
              >
                <CModalHeader>
                  <CModalTitle id="AddNewuser">User Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CForm>
                    <CRow className="mb-1">
                      <CInputGroup className="mb-1">
                        <CInputGroupText id="firstname">
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          id="firstname"
                          value={firstname}
                          onChange={(e) => setFname(e.target.value)}
                          placeholder="First name"
                        />
                      </CInputGroup>
                    </CRow>
                    <CRow className="mb-1">
                      <CInputGroup className="mb-1">
                        <CInputGroupText id="middlename">
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          id="middlename"
                          value={middlename}
                          onChange={(e) => setMname(e.target.value)}
                          placeholder="Middle name"
                        />
                      </CInputGroup>
                    </CRow>
                    <CRow className="mb-1">
                      <CInputGroup className="mb-1">
                        <CInputGroupText id="lastname">
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          id="lastname"
                          value={lastname}
                          onChange={(e) => setLname(e.target.value)}
                          placeholder="Last name"
                        />
                      </CInputGroup>
                    </CRow>
                    <CRow className="mb-1">
                      <CInputGroup className="mb-1">
                        <CInputGroupText id="username">
                          <CIcon icon={cibSuperuser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                        />
                      </CInputGroup>
                    </CRow>
                    <CRow className="mb-1">
                      <CInputGroup className="mb-1">
                        <CInputGroupText id="eMail">
                          <CIcon icon={cilEnvelopeLetter} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          id="eMail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address"
                        />
                      </CInputGroup>
                    </CRow>
                    <CRow className="mb-1">
                      <CInputGroup className="mb-1">
                        <CInputGroupText id="pAssword">
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          id="pAssword"
                          value={password}
                          onChange={(e) => setPass(e.target.value)}
                          placeholder="Password"
                        />
                      </CInputGroup>
                    </CRow>
                    <CRow className="mb-1">
                      <CInputGroup className="mb-1">
                        <CInputGroupText id="userRole">
                          <CIcon icon={cilOptions} />
                        </CInputGroupText>
                        <CFormSelect
                          id="userRole"
                          value={userRole}
                          onChange={(e) => setUserRole(e.target.value)}
                        >
                          <option selected disabled>
                            Choose...
                          </option>
                          <option value="User">User</option>
                          <option value="Administrator">Administrator</option>
                          <option value="Undefined">Undefined</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CRow>
                    <CRow className="mb-1">
                      <CInputGroup className="mb-1">
                        <CInputGroupText id="userStatus">
                          <CIcon icon={cibStatuspage} />
                        </CInputGroupText>
                        <CFormSelect
                          id="userStatus"
                          value={userStatus}
                          onChange={(e) => setUserStatus(e.target.value)}
                        >
                          <option selected disabled>
                            Choose...
                          </option>
                          <option value="Unverified">Unverified</option>
                          <option value="Verified">Verified</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CRow>
                  </CForm>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" onClick={handleSave}>
                    Save
                  </CButton>
                </CModalFooter>
              </CModal>
            </div>
            <DocsExample href="components/table#hoverable-rows">
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Fullname</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email Adress</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((user, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{`${user.firstname} ${user.middlename} ${user.lastname}`}</CTableDataCell>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>
                        <input
                          type="password"
                          value={user.password}
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            padding: '0',
                            outline: 'none',
                          }}
                          disabled
                        />
                      </CTableDataCell>
                      <CTableDataCell>{user.userRole}</CTableDataCell>
                      <CTableDataCell>{user.userStatus}</CTableDataCell>
                      <CTableDataCell>
                        <CButton onClick={() => handleUpdate(user)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton onClick={() => handleDelete(user._id)}>
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Select
