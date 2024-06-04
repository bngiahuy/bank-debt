'use client'
import React, { useState, useEffect } from 'react'

import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'

import AppointmentSearch from '@/components/lawsuitAndExecution/search/appointmentSearch'
import ManageAdvanceCourtFeeTable from '@/components/lawsuitAndExecution/manage-advance-court-fee-table/manage-advance-court-fee-table'

import { getListTUAP } from 'actions/tam-ung-an-phi/tam-ung-an-phi'

const ManageAdvanceCourtFee = () => {
  const [checkedList, setCheckedList] = useState([])
  const [data, setData] = useState([])

  const getTUAP = () => {
    getListTUAP('offset=0&limit=10').then((res) => {
      if (res && !res.error) {
        setData(res.results)
      }
    })
  }

  useEffect(() => {
    getTUAP()
  }, [])
  return (
    <div className="card">
      <div>
        <Accordion>
          <AccordionTab header="Tìm kiếm">
            <AppointmentSearch isAdvanceCourtFee />
          </AccordionTab>
        </Accordion>
      </div>
      <div>
        <div className="flex justify-content-between align-items-center">
          <div className="font-bold text-xl mt-4 mb-2">Danh sách tạm ứng án phí</div>
          {checkedList.length > 0 && (
            <Button label="Xóa" style={{ height: '37px', width: '74px' }} />
          )}
        </div>

        <ManageAdvanceCourtFeeTable
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          data={data}
        />
      </div>
    </div>
  )
}

export default ManageAdvanceCourtFee
