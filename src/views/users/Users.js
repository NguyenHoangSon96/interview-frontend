import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useHistory, useLocation } from 'react-router-dom'
import axios from "axios"
import moment from 'moment'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import {GET_USERS_URL} from "../../actions/endpoints";
import {NOTIFY_TYPE_DANGER, RESPONSE_STATUS_FAIL} from "../../constant/commonConstant";
import {showNotification} from "../../utils/utils";
import CIcon from '@coreui/icons-react'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

function Users() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pages, setPages] = useState(1);

  const setDataForTable = async () => {
    let response;
    try {
      response = await axios.get(GET_USERS_URL, {
        params: {data: JSON.stringify({page, pageSize, query: _.every(query, _.isEmpty) ? undefined : query })},
        withCredentials: true
      })
    } catch (err) {
      showNotification(NOTIFY_TYPE_DANGER, 'Notification', err.message);
    }
    setUsers(response?.data?.data);
    setPages(Math.ceil(response?.data?.countAllResult ? response?.data?.countAllResult / pageSize : 1 ));
  }

  useEffect(() => {
    setDataForTable();
  }, []);


  useEffect(() => {
    setDataForTable();
  }, [page, pageSize, query]);

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Users
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={users}
              fields={[
                { key: '#', _style: {width: '5%'}, filter: false },
                { key: 'username', _style: {} },
                { key: 'email', _style: {} },
                { key: 'role', _style: {} },
                { key: 'createdAt', _style: {} },
                { key: 'actions', _style: {} },
              ]}
              scopedSlots={{
                '#': (item, index) => <td style={{textAlign: 'center'}}>{index + 1}</td>,
                createdAt: (item, index) => {return <td>{item.createdAt ? moment(item.createdAt).format('DD/MM/YYYY') : ''}</td>},
                actions: (item, index) => {
                  return (
                    <td className="text-center">
                      <CIcon name="cil-pencil" size={'lg'} className="text-warning cursor-pointer" />
                      <CIcon name="cil-delete" size={'lg'} className="ml-1 text-danger cursor-pointer" />
                    </td>
                  )
                }
              }
              }
              tableFilter
              columnFilter
              itemsPerPageSelect
              onPaginationChange={(newPageSize) => setPageSize(newPageSize)}
              itemsPerPage={pageSize}
              hover
              striped
              border
              outlined
              sorter
              onColumnFilterChange={(v) => setQuery(v)}
              onTableFilterChange={(v) => setQuery({email: v, username: v})}
            />
          <CPagination
            activePage={page}
            pages={pages}
            onActivePageChange={p => setPage(p)}
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
