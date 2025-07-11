import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Descriptions, Button, Typography, Spin, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from '../../api/axios'
import { setSelectedInvoice } from './invoiceSlice'

const { Title } = Typography

const InvoiceDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const invoice = useSelector((state) => state.invoice.selectedInvoice)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true)
      try {
        const response = await axios.post('/invoice/search', {})
        const invoices = response?.data?.invoices?.content || []
        const found = invoices.find((inv) => inv.id === id)
        if (found) {
          dispatch(setSelectedInvoice(found))
        } else {
          message.error(t('invoiceNotFound'))
          navigate('/invoices')
        }
      } catch (error) {
        message.error(t('errorFetchingInvoice'))
        navigate('/invoices')
      } finally {
        setLoading(false)
      }
    }

    if (!invoice || invoice.id !== id) {
      fetchInvoice()
    }
  }, [dispatch, id, invoice, navigate, t])

  if (loading || !invoice || invoice.id !== id) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={3}>{t('invoiceDetail')}</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label={t('invoiceNumber')}>{invoice.invoiceNumber}</Descriptions.Item>
        <Descriptions.Item label={t('date')}>{invoice.issueDate}</Descriptions.Item>
        <Descriptions.Item label={t('status')}>{invoice.status}</Descriptions.Item>
        <Descriptions.Item label={t('customer')}>{invoice.customerName}</Descriptions.Item>
        <Descriptions.Item label={t('supplier')}>{invoice.supplierName}</Descriptions.Item>
        <Descriptions.Item label={t('type')}>{invoice.type}</Descriptions.Item>
      </Descriptions>
      <Button type="primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/invoices')}>
        {t('back')}
      </Button>
    </div>
  )
}

export default InvoiceDetailPage