import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from './authSlice'
import { Button, Form, Input, Card, Typography, message, Spin } from 'antd'
import axios from '../../api/axios'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogin = async (values) => {
    setLoading(true)
    try {
      const response = await axios.post('/auth/login/dev', {
        email: values.email,
        password: values.password,
      })

      const user = response.data
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))

      setRedirecting(true) // Yükleniyor ekranını göster
      setTimeout(() => {
        navigate('/invoices')
      }, 1000) // 1 saniye sonra yönlendir
    } catch (error) {
      message.error(t('loginError'))
    } finally {
      setLoading(false)
    }
  }

  if (redirecting) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin tip={t('loadingInvoices')} size="large" />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: 400 }}>
        <Title level={3} style={{ textAlign: 'center' }}>{t('login')}</Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label={t('email')} name="email" rules={[{ required: true, message: t('emailRequired') }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('password')} name="password" rules={[{ required: true, message: t('passwordRequired') }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage;