import React, { useEffect, useCallback } from 'react'
import { Table, Button, Typography, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser, logout } from '../auth/authSlice'
import { setInvoices, setSelectedInvoice } from './invoiceSlice'
import axios from '../../api/axios'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

const InvoiceListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const user = useSelector((state) => state.auth.user)
  const invoices = useSelector((state) => state.invoice.invoices)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser && !user) {
      dispatch(setUser(JSON.parse(storedUser)))
    }
  }, [dispatch, user])

  const fetchInvoices = useCallback(async (jwt) => {
    try {
      const response = await axios.post(
        '/invoice/search',
        {
          companyId: '01c880ca-46b5-4699-a477-616b84770071',
          documentType: 'OUTGOING',
          endDate: '2025-07-04T08:31:10.422Z',
          page: 0,
          size: 20,
          startDate: '2025-06-27T00:00:00.000Z',
          referenceDocument: '',
          type: null,
          status: null,
          paymentStatus: null,
          isDeleted: false,
        },
        {
          headers: {
            'R-Auth': jwt,
          },
        }
      )

      const invoiceList = response.data.invoices.content
      dispatch(setInvoices(invoiceList))
    } catch (error) {
      console.error('Fatura getirme hatası:', error)
      message.error(t('fetchError') || 'Fatura verileri alınamadı.')
    }
  }, [dispatch, t])

  useEffect(() => {
    if (user?.jwt) {
      fetchInvoices(user.jwt)
    }
  }, [user?.jwt, fetchInvoices])

  const handleDetail = (record) => {
    dispatch(setSelectedInvoice(record))
    navigate(`/invoices/${record.id}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(logout())
    navigate('/login')
  }

  const columns = [
    {
      title: t('invoiceNumber'),
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: t('date'),
      dataIndex: 'issueDate',
      key: 'issueDate',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('action'),
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDetail(record)}>
          {t('detail')}
        </Button>
      ),
    },
  ]

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Title level={3}>{t('invoiceList')}</Title>
        <Button type="default" danger onClick={handleLogout}>
          {t('logout')}
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={invoices}
        pagination={{ pageSize: 10 }}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
        style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' 
        }}
      />
    </div>
  )
}

export default InvoiceListPage
