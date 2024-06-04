import React, { useState } from 'react'

import InformationTemplate from '../information-template/information-template'

const StaffInformation = (props) => {
  return (
    <div className="grid mb-2">
      <InformationTemplate
        title="Khách hàng"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.new_khach_hang?.length} khách hàng nợ xấu nhóm 3 mới
                </span>
              </span>
            ),
          },
        ]}
        isSHB
        data={props.SHBTodayInfo}
      />
      <InformationTemplate
        title="Thu hồi nợ"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.customersHaventBeenRecoveried?.length} khách hàng mới
                </span>{' '}
                chưa thực hiện thu hồi nợ
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.customers7Days?.length} khách hàng
                </span>{' '}
                chưa thực hiện thu hồi nợ hơn 1 tuần
              </span>
            ),
          },
        ]}
        isSHB
        data={props.SHBTodayInfo}
      />
      <InformationTemplate
        title="Đánh giá khởi kiện"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có <span className="text-green-500 font-medium">10 khách hàng</span> cần
                đánh giá khởi kiện
              </span>
            ),
          },
        ]}
        isSHB
        data={props.SHBTodayInfo}
      />
      <InformationTemplate
        title="Tờ trình đánh giá khởi kiện"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.ttdgkkNotApproved?.length} tờ trình đánh giá khởi kiện
                </span>{' '}
                chưa được duyệt
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.ttdgkkApproved?.length} tờ trình đánh giá khởi kiện
                </span>{' '}
                đã được phê duyệt
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.ttdgkkDeclined?.length} tờ trình đánh giá khởi kiện
                </span>{' '}
                đã bị từ chối
              </span>
            ),
          },
        ]}
        isSHB
        data={props.SHBTodayInfo}
      />
      <InformationTemplate
        title="Tờ trình miễn giảm"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.ttmgNotApproved?.length} tờ trình miễn giảm
                </span>{' '}
                chưa được duyệt
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.ttmgApproved?.length} tờ trình miễn giảm
                </span>{' '}
                đã được phê duyệt
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.ttmgDeclined?.length} tờ trình miễn giảm
                </span>{' '}
                đã bị từ chối
              </span>
            ),
          },
        ]}
        isSHB
        data={props.SHBTodayInfo}
      />
      <InformationTemplate
        title="Khởi kiện và thi hành án"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.customersInLawsuit?.length} khách hàng
                </span>{' '}
                đang trong quá trình khởi kiện
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.customersInJudgmentExecution?.length} khách hàng
                </span>{' '}
                đang trong quá trình thi hành án
              </span>
            ),
          },
        ]}
        isSHB
        data={props.SHBTodayInfo}
      />
      <InformationTemplate
        title="Lịch hẹn"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Có{' '}
                <span className="text-green-500 font-medium">
                  {props.SHBTodayInfo.next3DaysApointments?.length} lịch hẹn sắp tới hẹn
                </span>{' '}
                trong 3 ngày tới
              </span>
            ),
          },
        ]}
        isSHB
        data={props.SHBTodayInfo}
      />
    </div>
  )
}

export default StaffInformation
