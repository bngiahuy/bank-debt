'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { Accordion, AccordionTab } from 'primereact/accordion'

import StaffInformation from '@/components/dashboard/informations-today/staff-information/staff-information'
import ExecutiveInformation from '@/components/dashboard/informations-today/executive-information/executive-information'
import ApproverInformation from '@/components/dashboard/informations-today/approver-information/approver-information'
import StaffDebtRecovery from '@/components/dashboard/staff-debt-recovery/staff-debt-recovery'
import StaffKKTHA from '@/components/dashboard/staff-kk-tha/staff-kk-tha'
import OperatorStaffProportion from '@/components/dashboard/operator-staff-proportion/operator-staff-proportion'
import OperatorStaffCustomers from '@/components/dashboard/operator-staff-customers/operator-staff-customers'

import { getTodayInfoSHB, getTodayInfoNPD } from 'actions/today-info/today-info'

const ThongKe = (props) => {
  const [SHBTodayInfo, setSHBTodayInfo] = useState({})
  const [NPDTodayInfo, setNPDTodayInfo] = useState({})

  const todayInfos = () => {
    if (props.user.role === 'SHB') {
      getTodayInfoSHB(`ma_nhan_vien=${props.user.ma_nhan_vien}`).then((res) => {
        if (res && res.result) {
          setSHBTodayInfo(res.result)
        }
      })
    }
    if (props.user.role === 'NPD') {
      getTodayInfoNPD(`ma_nhan_vien=${props.user.ma_nhan_vien}`).then((res) => {
        if (res && res.result) {
          setNPDTodayInfo(res.result)
        }
      })
    }
  }

  useEffect(() => {
    todayInfos()
  }, [])

  return (
    <div className="card">
      <div className="font-bold text-xl mb-4">Dashboard</div>

      {props.user.role === 'SHB' && (
        <div>
          <StaffInformation SHBTodayInfo={SHBTodayInfo} />
          <Accordion activeIndex={0}>
            <AccordionTab header="Biểu đồ tình hình thu hồi nợ">
              <StaffDebtRecovery />
            </AccordionTab>
            {/* <AccordionTab header="Biểu đồ tình hình khởi kiện - thi hành án">
              <StaffKKTHA />
            </AccordionTab> */}
          </Accordion>
        </div>
      )}

      {props.user.role === 'NDH' && (
        <div>
          <ExecutiveInformation />
          <Accordion activeIndex={0}>
            <AccordionTab header="Biểu đồ tổng tỷ trọng của từng nhân viên">
              <OperatorStaffProportion />
            </AccordionTab>
            <AccordionTab header="Biểu đồ tổng số khách hàng mỗi nhân viên phụ trách">
              <OperatorStaffCustomers />
            </AccordionTab>
          </Accordion>
        </div>
      )}

      {props.user.role === 'NPD' && (
        <div>
          <ApproverInformation NPDTodayInfo={NPDTodayInfo} />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(ThongKe)
