import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import Swal from 'sweetalert2'

const Tables = () => {
  const [books, setBooks] = useState([])
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState(0)
  const [genres, setGenres] = useState([])
  const [rating, setRating] = useState(0)
  const [bookId, setBookId] = useState(undefined)
  useEffect(() => {
    fetchBooks()
  }, [])
  const fetchBooks = async () => {
    try {
      const response = await Axios.get('http://localhost:4000/API/Posts')
      setBooks(response.data)
    } catch (error) {
      Swal.fire('Error fetching books', error.message, 'error')
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!title || !author || !pages || !genres.length || !rating) {
        Swal.fire('Warning', 'Please fill out all fields', 'warning')
        return
      }
      if (typeof bookId === 'undefined') {
        const response = await Axios.post('http://localhost:4000/API/Posts', {
          title,
          author,
          pages,
          genres,
          rating,
        })
        setBooks([...books, response.data]) // add new book to books state
        Swal.fire('Success', 'Book has been added successfully', 'success')
        setVisible(false)
      } else {
        const response = await Axios.put(`http://localhost:4000/API/Posts/${bookId}`, {
          title,
          author,
          pages,
          genres,
          rating,
        })
        setBooks(books.map((b) => (b._id === response.data._id ? response.data : b))) // update book in books state
        Swal.fire('Successs', 'Your book has been updated successfully', 'success')
        setBookId(undefined)
        setVisible(false)
      }
      setTitle('')
      setAuthor('')
      setPages(0)
      setGenres([])
      setRating(0)
    } catch (error) {
      Swal.fire('Error adding book', error.message, 'error')
    }
  }
  const handleGenresChange = (e) => {
    const genresArray = e.target.value.split(', ').map((genre) => genre.trim())
    setGenres(genresArray)
  }
  const handleUpdate = async (book) => {
    setVisible(true)
    setTitle(book.title)
    setAuthor(book.author)
    setPages(book.pages)
    setGenres(book.genres)
    setRating(book.rating)
    setBookId(book._id)
  }
  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this book!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    })
    if (confirmation.isConfirmed) {
      try {
        await Axios.delete(`http://localhost:4000/API/Posts/${id}`)
        setBooks(books.filter((book) => book._id !== id))
        Swal.fire('Successful', 'Your book has been deleted', 'success')
      } catch (error) {
        Swal.fire(`Couldn't delete the book!`, error.message, 'error')
      }
    } else {
      Swal.fire('Cancelled', 'Your book is safe.', 'error')
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>List of Books</strong>
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
                aria-labelledby="AddNewBook"
              >
                <CModalHeader>
                  <CModalTitle id="AddNewBook">Book Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CForm>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="title" className="col-sm-2 col-form-label">
                        Title
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter book title"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="author" className="col-sm-2 col-form-label">
                        Author
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="author"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="Enter book author"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="pages" className="col-sm-2 col-form-label">
                        Pages
                      </CFormLabel>
                      <CCol sm={5}>
                        <CFormInput
                          type="number"
                          id="pages"
                          value={pages}
                          onChange={(e) => setPages(e.target.value)}
                          placeholder="Enter number of pages"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="genres" className="col-sm-2 col-form-label">
                        Genres
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="genres"
                          value={genres.join(', ')}
                          onChange={handleGenresChange}
                          placeholder="Put comma & space after text (e.g. Comedy, Mystery)"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="rating" className="col-sm-2 col-form-label">
                        Rating
                      </CFormLabel>
                      <CCol sm={5}>
                        <CFormInput
                          type="number"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          placeholder="Enter book genre"
                        />
                      </CCol>
                    </CRow>
                  </CForm>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" onClick={handleSubmit}>
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
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Author</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Pages</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Genres</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {books.map((book, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{book.title}</CTableDataCell>
                      <CTableDataCell>{book.author}</CTableDataCell>
                      <CTableDataCell>{book.pages}</CTableDataCell>
                      <CTableDataCell>{book.genres.join(', ')}</CTableDataCell>
                      <CTableDataCell>{book.rating}/10</CTableDataCell>
                      <CTableDataCell>
                        <CButton onClick={() => handleUpdate(book)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton onClick={() => handleDelete(book._id)}>
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

export default Tables
