'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { TabView, TabPanel } from 'primereact/tabview'

import EditCaseworker from '@/components/editCustomer/edit-caseworker'
import EditDebtInformation from '@/components/editCustomer/edit-debt-information'
import EditLegalRecord from '@/components/editCustomer/edit-legal-record'
import EditPersonalInformation from '@/components/editCustomer/edit-personal-information'

import { addCustomer } from 'actions/customer/Customer'
import { getListStaff } from 'actions/nhan-vien/nhan-vien'
import { addDuNoTheTD } from 'actions/du-no-the-td/du-no-the-td'
import { addTheTinDung } from 'actions/the-tin-dung/the-tin-dung'

const AddNonePerformingLoan = () => {
  const router = useRouter()

  const [customerForm, setCustomerForm] = useState({})
  const [debtInfoForm, setDebtInfoForm] = useState({})
  const [staffs, setStaffs] = useState()

  const handleChange = (field, value) => {
    setCustomerForm({ ...customerForm, [field]: value })
  }

  const handleAddCustomer = () => {
    const theTinDungBody = {
      so_the: debtInfoForm.so_the,
      so_tai_khoan_the: debtInfoForm.so_tai_khoan_the,
      ngay_mo_the: debtInfoForm.ngay_mo_the,
      han_muc: debtInfoForm.han_muc,
    }
    const duNoTheTDBody = {
      so_the: debtInfoForm.so_the,
      no_goc: debtInfoForm.no_goc,
      no_lai: debtInfoForm.no_lai,
      tong_du_no: debtInfoForm.tong_du_no,
      da_thanh_toan: debtInfoForm.da_thanh_toan,
      lai_suat: debtInfoForm.lai_suat,
      nhom_no: debtInfoForm.nhom_no,
      khu_vuc: debtInfoForm.khu_vuc,
      chi_nhanh: debtInfoForm.chi_nhanh,
      don_vi_quan_ly: debtInfoForm.don_vi_quan_ly,
      don_vi_chiu_no: debtInfoForm.don_vi_chiu_no,
      ngay_chuyen_nhom_3: debtInfoForm.ngay_chuyen_nhom_3,
    }
    addTheTinDung({ body: theTinDungBody }).then((res) => {
      if (res && res.body === 'Inserted') {
        addDuNoTheTD({ body: duNoTheTDBody }).then((res2) => {
          if (res2 && res2.body === 'Inserted') {
            addCustomer({ body: { ...customerForm, du_no_id: res2.data.id } }).then((res3) =>
              console.log(res3)
            )
          }
        })
      }
    })
    // addCustomer({ body: customerForm }).then((res) => console.log(res))
    // addCustomer({ body: customerForm }).then((res) => {
    //   if (res && res.body === 'Inserted') {
    //     localStorage.setItem('addCustomer', 'success')
    //     router.push('/khach-hang')
    //   }
    // })
  }

  const getStaffs = () => {
    getListStaff('').then((res) => {
      if (res && !res.error) {
        setStaffs(res.results)
      }
    })
  }

  useEffect(() => {
    getStaffs()
  }, [])

  return (
    <div>
      <TabView>
        <TabPanel header="Thông tin cá nhân">
          <EditPersonalInformation
            isAdding
            customerForm={customerForm}
            handleChange={handleChange}
            handleAddCustomer={handleAddCustomer}
          />
        </TabPanel>
        <TabPanel header="Thông tin dư nợ">
          <EditDebtInformation
            isAdding
            handleAddCustomer={handleAddCustomer}
            debtInfoForm={debtInfoForm}
            setDebtInfoForm={setDebtInfoForm}
          />
        </TabPanel>
        <TabPanel header="Nhân viên phụ trách">
          <EditCaseworker
            isAdding
            handleAddCustomer={handleAddCustomer}
            staffs={staffs}
            customerForm={customerForm}
            handleChange={handleChange}
            setCustomerForm={setCustomerForm}
          />
        </TabPanel>
        <TabPanel header="Hồ sơ pháp lý">
          <EditLegalRecord isAdding handleAddCustomer={handleAddCustomer} />
        </TabPanel>
      </TabView>
    </div>
  )
}

export default AddNonePerformingLoan
