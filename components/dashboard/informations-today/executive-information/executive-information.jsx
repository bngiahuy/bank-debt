import React, { useState } from 'react'

import InformationTemplate from '../information-template/information-template'

const ExecutiveInformation = () => {
  return (
    <div className="grid mb-2">
      <InformationTemplate
        title="Khách hàng"
        firstInformation="500"
        secondInformation={[
          {
            data: '24 khách hàng nợ xấu nhóm 3 mới',
          },
        ]}
        isNewCustomer
      />
      <InformationTemplate
        title="Thu hồi nợ"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có <span className="text-green-500 font-medium">24 khách hàng mới</span>{' '}
                chưa thực hiện thu hồi nợ
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có <span className="text-green-500 font-medium">45 khách hàng</span> chưa
                thực hiện thu hồi nợ hơn 1 tuần
              </span>
            ),
          },
        ]}
      />
      <InformationTemplate
        title="Đánh giá khởi kiện"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có <span className="text-green-500 font-medium">24 khách hàng</span> cần
                đánh giá khởi kiện
              </span>
            ),
          },
        ]}
      />
      <InformationTemplate
        title="Tờ trình đánh giá khởi kiện"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">2 tờ trình đánh giá khởi kiện</span>{' '}
                chưa được duyệt
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">2 tờ trình đánh giá khởi kiện</span> đã
                được phê duyệt
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">2 tờ trình đánh giá khởi kiện</span> đã
                bị từ chối
              </span>
            ),
          },
        ]}
      />
      <InformationTemplate
        title="Khởi kiện và thi hành án"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có <span className="text-green-500 font-medium">24 khách hàng</span> đang
                trong quá trình khởi kiện
              </span>
            ),
          },
          {
            data: (
              <span>
                Hôm nay có <span className="text-green-500 font-medium">24 khách hàng</span> đang
                trong quá trình thi hành án
              </span>
            ),
          },
        ]}
      />
      <InformationTemplate
        title="Lịch hẹn"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Có <span className="text-green-500 font-medium">10 lịch hẹn sắp tới hẹn</span> trong
                3 ngày tới
              </span>
            ),
          },
        ]}
      />
    </div>
  )
}

export default ExecutiveInformation
