import React, { useState } from 'react'

import InformationTemplate from '../information-template/information-template'

const ApproverInformation = (props) => {
  return (
    <div className="grid mb-2">
      <InformationTemplate
        title="Tờ trình miễn giảm"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">
                  {props.NPDTodayInfo.ttmgNotApproved?.length} tờ trình miễn giảm
                </span>{' '}
                chưa phê duyệt (hoặc từ chối)
              </span>
            ),
          },
        ]}
        data={props.NPDTodayInfo}
        isNPD
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
                  {props.NPDTodayInfo.ttdgkkNotApproved?.length} tờ trình đánh giá khởi kiện
                </span>{' '}
                chưa phê duyệt (hoặc từ chối)
              </span>
            ),
          },
        ]}
        data={props.NPDTodayInfo}
        isNPD
      />
    </div>
  )
}

export default ApproverInformation
