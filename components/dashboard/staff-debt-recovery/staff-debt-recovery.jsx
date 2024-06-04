'use client'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { Chart } from 'primereact/chart'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'

import { getCountOfActions } from 'actions/dashboard/dashboard-nhan-vien/dashboard-nhan-vien'

const StaffDebtRecovery = (props) => {
  const barOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6c757d',
          font: {
            weight: '500',
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#6c757d',
        },
        grid: {
          color: '#dfe7ef',
        },
        border: {
          display: false,
        },
      },
    },
  }

  const actionNames = [
    'Gọi điện (LHKH)',
    'SMS (LHKH)',
    'Email (LHKH)',
    'Gọi đến công ty',
    'Gửi thông báo kiện',
    'Gửi công văn công ty hỗ trợ',
    'Gửi công văn tư pháp phường - UBND phường',
    'Gọi điện (LHNTKH)',
    'SMS (LHNTKH)',
    'Email (LHNTKH)',
    'Đến địa chỉ thường trú',
    'Đến địa chỉ tạm trú',
    'Đến công ty khách hàng',
    'Đến địa chỉ khác',
    'Đã đánh giá khởi kiện',
  ]

  const indexMap = {
    LHKH001: 0,
    LHKH002: 1,
    LHKH003: 2,
    LHKH004: 3,
    GTKH001: 4,
    GTKH002: 5,
    GTKH003: 6,
    LHNT001: 7,
    LHNT002: 8,
    LHNT003: 9,
    XMKH001: 10,
    XMKH002: 11,
    XMKH003: 12,
    XMKH004: 13,
    KKTHA001: 14,
  }

  const tempData = {
    labels: [
      'Gọi điện (LHKH)',
      'SMS (LHKH)',
      'Email (LHKH)',
      'Gọi đến công ty',
      'Gửi thông báo kiện',
      'Gửi công văn công ty hỗ trợ',
      'Gửi công văn tư pháp phường - UBND phường',
      'Gọi điện (LHNTKH)',
      'SMS (LHNTKH)',
      'Email (LHNTKH)',
      'Đến địa chỉ thường trú',
      'Đến địa chỉ tạm trú',
      'Đến công ty khách hàng',
      'Đến địa chỉ khác',
      'Đã đánh giá khởi kiện',
    ],
    datasets: [
      {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        label: 'Số khách hàng',
      },
    ],
  }

  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  const onLoadingClick = () => {
    setLoading(true)
    let query = `ma_nv=${props.user.ma_nhan_vien}`
    if (fromDate) {
      query += `&from=${fromDate.toISOString()}`
    }
    if (toDate) {
      query += `&to=${toDate.toISOString()}`
    }
    handleGetCountOfActions(query)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const handleGetCountOfActions = (query) => {
    getCountOfActions(query).then((res) => {
      if (res && res.results) {
        let tempArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        res.results.forEach((item) => {
          tempArr[indexMap[item.hanh_dong.ma_hanh_dong]] = item.count
        })
        setData([...tempArr])
      }
    })
  }

  useEffect(() => {
    handleGetCountOfActions(`ma_nv=${props.user.ma_nhan_vien}`)
  }, [])

  return (
    <div className="card">
      <div className="field grid">
        <div className="flex mr-5">
          <div className="sm:flex sm:justify-content-end sm:align-items-center mr-2">
            <label htmlFor="lsqhad">Từ</label>
          </div>
          <div className="">
            <Calendar
              inputId="calendar"
              value={fromDate}
              onChange={(e) => setFromDate(e.value ?? '')}
            ></Calendar>
          </div>
        </div>
        <div className="flex">
          <div className="sm:flex sm:justify-content-end sm:align-items-center mr-2">
            <label htmlFor="lsqhad">Đến</label>
          </div>
          <div className="">
            <Calendar
              inputId="calendar"
              value={toDate}
              onChange={(e) => setToDate(e.value ?? '')}
            ></Calendar>
          </div>
        </div>
        <Button
          label="Xem"
          icon="pi pi-search"
          loading={loading}
          onClick={onLoadingClick}
          className="ml-4"
        />
      </div>
      <Chart
        type="bar"
        data={{
          labels: [
            'Gọi điện (LHKH)',
            'SMS (LHKH)',
            'Email (LHKH)',
            'Gọi đến công ty',
            'Gửi thông báo kiện',
            'Gửi công văn công ty hỗ trợ',
            'Gửi công văn tư pháp phường - UBND phường',
            'Gọi điện (LHNTKH)',
            'SMS (LHNTKH)',
            'Email (LHNTKH)',
            'Đến địa chỉ thường trú',
            'Đến địa chỉ tạm trú',
            'Đến công ty khách hàng',
            'Đến địa chỉ khác',
            'Đã đánh giá khởi kiện',
          ],
          datasets: [
            {
              backgroundColor: '#6366f1',
              borderColor: '#6366f1',
              data: data,
              label: 'Số khách hàng',
            },
          ],
        }}
        options={barOptions}
      ></Chart>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(StaffDebtRecovery)
