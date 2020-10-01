import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from "axios";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import usersData from './UsersData'
import {GET_USERS_URL} from "../../actions/endpoints";
import {NOTIFY_TYPE_DANGER, RESPONSE_STATUS_FAIL} from "../../constant/commonConstant";


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pages, setPages] = useState(1);

  function fetchUsers() {
    axios.get(GET_USERS_URL, {
      params: {
        data: JSON.stringify({page, pageSize, query})
      },
      withCredentials: true
    })
      .then(response => {
        const {data, countAllResult} = response.data
        setUsers(data)
        setPages(Math.ceil(countAllResult / pageSize));
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [pageSize])

  useEffect(() => {
    fetchUsers();
  }, [page])

  const onClickPage = currentPage => {
    setPage(currentPage);
  }

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={users}
              fields={[
                { key: 'username', _style: {} },
                { key: 'email', _style: {} },
                { key: 'role', _style: {} },
                { key: 'createdAt', _style: {} },
              ]}
              columnFilter
              tableFilter
              itemsPerPageSelect
              onPaginationChange={(newPageSize) => setPageSize(newPageSize)}
              itemsPerPage={pageSize}
              hover
              striped
              border
              outlined
              sorter
              onColumnFilterChange={(v)=> console.log(v)}
              // activePage={10}
              // pagination={{
              //   activePage: page,
              //   pages: 10,
              //   onActivePageChange: (i) => setPage(i)
              // }}
            />
          <CPagination
            activePage={page}
            pages={pages}
            onActivePageChange={onClickPage}

            doubleArrows={false}
            align="end"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
