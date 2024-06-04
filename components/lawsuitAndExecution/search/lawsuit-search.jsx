'use client'
import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { AutoComplete } from 'primereact/autocomplete'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'
import { connect } from 'react-redux'

import { provinces, districts } from 'utils/provinces-districts/provinces-districts'
import { lawsuitStates } from 'utils/lawsuit-states/lawsuit-states'
import { formatDate } from 'utils/format-date/format-date'

import styles from './index.module.scss'

const LawsuitSearch = (props) => {
  const initialInputSearch = {
    bien_lai: '',
    so_quyet_dinh_ban_an: '',
    trang_thai_khoi_kien: '',
    trang_thai_thi_hanh_an: '',
    trang_thai_an_phi: '',
  }
  const [selectedAutoValue1, setSelectedAutoValue1] = useState(null)
  const [selectedAutoValue2, setSelectedAutoValue2] = useState(null)
  const [selectedAutoValue3, setSelectedAutoValue3] = useState(null)
  const [autoFilteredValue, setAutoFilteredValue] = useState([])
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [autoFilteredStaff, setAutoFilteredStaff] = useState([])
  const [province, setProvince] = useState({})
  const [district, setDistrict] = useState({})
  const [lawsuitState, setLawsuitState] = useState({})
  const [inputSearch, setInputSearch] = useState(initialInputSearch)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)

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

  const handleDeleteFilter = () => {
    setInputSearch(initialInputSearch)
    setFromDate(null)
    setToDate(null)
    setSelectedStaff(null)
    setProvince({})
    setDistrict({})
    setSelectedAutoValue1(null)
    setSelectedAutoValue2(null)
    setSelectedAutoValue3(null)
    props.setFilterBody({ tempField: 'tempField' })
  }

  const handleApplyFilter = () => {
    const filter = {
      ma_khach_hang: selectedAutoValue1 ? selectedAutoValue1.ma_khach_hang : '',
      tinh_tp: province.name,
      quan_huyen: district.name,
      ma_nhan_vien: selectedStaff ? selectedStaff.user_metadata?.ma_nhan_vien : '',
      trang_thai: lawsuitState.name,
      tu_ngay: fromDate,
      den_ngay: toDate,
    }
    Object.keys(filter).forEach((item) => {
      if (!filter[item]) {
        delete filter[item]
      }
    })
    if (Object.keys(filter).length > 0) {
      props.getListLawsuitsWithFilter(filter)
      props.setFilterBody(filter)
    } else {
      props.setFilterBody({})
      props.getListLawsuits(
        props.user.role === 'SHB' ? `ma_nhan_vien=${props.user.ma_nhan_vien}` : ''
      )
    }
  }

  return (
    <div>
      <div className="grid">
        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="ma_khach_hang">Mã khách hàng</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText id='ma_khach_hang' type='text' /> */}
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
            <label htmlFor="ma_khach_hang">Căn cước công dân</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText id="ma_khach_hang" type="text" /> */}
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
            <label htmlFor="HoTen">Tỉnh/Thành phố</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText id="HoTen" type="text" /> */}
            <Dropdown
              value={province}
              onChange={(e) => setProvince(e.value)}
              options={provinces}
              optionLabel="name"
              placeholder="Select"
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Quận/Huyện</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText id="HoTen" type="text" /> */}
            <Dropdown
              value={district}
              onChange={(e) => setDistrict(e.value)}
              options={districts[province.name]}
              optionLabel="name"
              placeholder="Select"
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Người được ủy quyền</label>
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

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Biên lai</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText
              id="HoTen"
              type="text"
              value={inputSearch.bien_lai}
              onChange={(e) => setInputSearch({ ...inputSearch, bien_lai: e.target.value })}
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Số quyết định bản án</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText
              id="HoTen"
              type="text"
              value={inputSearch.so_quyet_dinh_ban_an}
              onChange={(e) =>
                setInputSearch({ ...inputSearch, so_quyet_dinh_ban_an: e.target.value })
              }
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Trạng thái khởi kiện</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText
              id="HoTen"
              type="text"
              value={inputSearch.trang_thai_khoi_kien}
              onChange={(e) =>
                setInputSearch({ ...inputSearch, trang_thai_khoi_kien: e.target.value })
              }
            /> */}
            <Dropdown
              value={lawsuitState}
              onChange={(e) => setLawsuitState(e.value)}
              options={lawsuitStates}
              optionLabel="name"
              placeholder="Select"
            />
          </div>
        </div>

        {props.isJudgmentExecution && (
          <div className="col-12 xl:col-4 md:col-6">
            <div className="mb-2">
              <label htmlFor="HoTen">Trạng thái thi hành án</label>
            </div>
            <div className={styles.inputContainer}>
              <InputText
                id="HoTen"
                type="text"
                value={inputSearch.trang_thai_thi_hanh_an}
                onChange={(e) =>
                  setInputSearch({ ...inputSearch, trang_thai_thi_hanh_an: e.target.value })
                }
              />
            </div>
          </div>
        )}

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Trạng thái án phí</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText
              id="HoTen"
              type="text"
              value={inputSearch.trang_thai_an_phi}
              onChange={(e) =>
                setInputSearch({ ...inputSearch, trang_thai_an_phi: e.target.value })
              }
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Số tiền đóng tạm ứng án phí</label>
          </div>
          <div className={styles.inputContainer}>
            <InputNumber
              value={inputSearch.so_tien_dong_tuap}
              onChange={(e) => {
                setInputSearch({ ...inputSearch, so_tien_dong_tuap: e.value })
              }}
              mode="decimal"
            ></InputNumber>
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Từ ngày</label>
          </div>
          <div className={styles.inputContainer}>
            <Calendar
              showIcon
              showButtonBar
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.value ?? null)
              }}
              formatDateTime={formatDate}
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6">
          <div className="mb-2">
            <label htmlFor="HoTen">Đến ngày</label>
          </div>
          <div className={styles.inputContainer}>
            <Calendar
              showIcon
              showButtonBar
              value={toDate}
              onChange={(e) => {
                setToDate(e.value ?? null)
              }}
              formatDateTime={formatDate}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-content-center md:justify-content-end mt-2">
        <Button
          label="Xóa"
          outlined
          style={{ width: '93px', marginRight: '16px' }}
          onClick={() => handleDeleteFilter()}
        />
        <Button label="Áp dụng" onClick={() => handleApplyFilter()} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(LawsuitSearch)
