'use client'
import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { AutoComplete } from 'primereact/autocomplete'

import styles from './index.module.scss'

const DebtRecoverySearch = (props) => {
  const [selectedAutoValue1, setSelectedAutoValue1] = useState(null)
  const [selectedAutoValue2, setSelectedAutoValue2] = useState(null)
  const [selectedAutoValue3, setSelectedAutoValue3] = useState(null)
  const [autoFilteredValue, setAutoFilteredValue] = useState([])
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [autoFilteredStaff, setAutoFilteredStaff] = useState([])
  const [sdt, setSdt] = useState()
  const [progressOfKkTha, setProgressOfKkTha] = useState('')

  const search = (event, field) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...props.customers])
      } else {
        setAutoFilteredValue(
          props.customers.filter((customer) => {
            return customer[field].toString().toLowerCase().startsWith(event.query.toLowerCase())
          })
        )
      }
    }, 250)
  }

  const searchStaff = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredStaff([...props.staffs])
      } else {
        setAutoFilteredStaff(
          props.staffs.filter((staff) => {
            return staff.phone.toString().toLowerCase().startsWith(event.query.toLowerCase())
          })
        )
      }
    }, 250)
  }

  const deleteFilter = () => {
    setSelectedAutoValue1(null)
    setSelectedAutoValue2(null)
    setSelectedAutoValue3(null)
    setSelectedStaff(null)
    setSdt('')
    setProgressOfKkTha('')
  }

  const applySearch = () => {
    if (selectedAutoValue && selectedAutoValue.IDKhachHang) {
      props.handleSearch(`IDKhachHang=${selectedAutoValue.IDKhachHang}`)
    } else {
      props.handleSearch(`queryAll=true`)
    }
  }

  return (
    <div>
      <div className="grid">
        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="IDKhachHang">Mã khách hàng</label>
          </div>
          <div className={styles.inputContainer}>
            <AutoComplete
              placeholder="Search"
              id="dd"
              dropdown
              value={selectedAutoValue1}
              onChange={(e) => {
                setSelectedAutoValue1(e.value)
                if (typeof e.value === 'object') {
                  setSelectedAutoValue2(e.value)
                  setSelectedAutoValue3(e.value)
                } else {
                  setSelectedAutoValue2(null)
                  setSelectedAutoValue3(null)
                }
              }}
              suggestions={autoFilteredValue}
              completeMethod={(e) => search(e, 'ma_khach_hang')}
              field="ma_khach_hang"
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="IDKhachHang">Căn cước công dân</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText
              id="IDKhachHang"
              type="text"
              value={selectedAutoValue ? selectedAutoValue.CCCD : ''}
            /> */}
            <AutoComplete
              placeholder="Search"
              id="dd"
              dropdown
              value={selectedAutoValue2}
              onChange={(e) => {
                setSelectedAutoValue2(e.value)
                if (typeof e.value === 'object') {
                  setSelectedAutoValue1(e.value)
                  setSelectedAutoValue3(e.value)
                } else {
                  setSelectedAutoValue1(null)
                  setSelectedAutoValue3(null)
                }
              }}
              suggestions={autoFilteredValue}
              completeMethod={(e) => search(e, 'can_cuoc')}
              field="can_cuoc"
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Họ và tên</label>
          </div>
          <div className={styles.inputContainer}>
            <AutoComplete
              placeholder="Search"
              id="dd"
              dropdown
              value={selectedAutoValue3}
              onChange={(e) => {
                setSelectedAutoValue3(e.value)
                if (typeof e.value === 'object') {
                  setSelectedAutoValue1(e.value)
                  setSelectedAutoValue2(e.value)
                } else {
                  setSelectedAutoValue1(null)
                  setSelectedAutoValue2(null)
                }
              }}
              suggestions={autoFilteredValue}
              completeMethod={(e) => search(e, 'ho_ten')}
              field="ho_ten"
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Số điện thoại</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText
              id="HoTen"
              type="text"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Tiến độ kiện - THA</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText
              id="HoTen"
              type="text"
              value={progressOfKkTha}
              onChange={(e) => setProgressOfKkTha(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Nhân viên phụ trách</label>
          </div>
          <div className={styles.inputContainer}>
            <AutoComplete
              placeholder="Search"
              id="dd"
              dropdown
              value={selectedStaff}
              onChange={(e) => {
                setSelectedStaff(e.value)
              }}
              suggestions={autoFilteredStaff}
              completeMethod={(e) => searchStaff(e)}
              field="user_metadata.ho_ten"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-content-center md:justify-content-end mt-4">
        <Button
          label="Xóa"
          outlined
          style={{ width: '93px', marginRight: '16px' }}
          onClick={deleteFilter}
        />
        <Button label="Tìm kiếm" onClick={() => applySearch()} />
      </div>
    </div>
  )
}

export default DebtRecoverySearch
