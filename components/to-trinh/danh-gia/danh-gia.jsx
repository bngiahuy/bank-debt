'use client'
import React, { useState, useEffect } from 'react'

import { Checkbox } from 'primereact/checkbox'

const DanhGia = (props) => {
  const [checkboxValue, setCheckboxValue] = useState([])

  const onCheckboxChange = (e) => {
    let selectedValue = [...props.evaluations]
    if (e.checked) selectedValue.push(e.value)
    else selectedValue.splice(selectedValue.indexOf(e.value), 1)

    props.setEvaluations(selectedValue)
  }

  return (
    <div>
      <div className="font-bold text-xl mb-3 mt-4">Đánh giá</div>
      <div className="grid ml-0">
        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="field-checkbox">
            <Checkbox
              inputId="checkOption1"
              name="option"
              value="Khách hàng chết"
              checked={props.evaluations.indexOf('Khách hàng chết') !== -1}
              onChange={onCheckboxChange}
              disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
            />
            <label htmlFor="checkOption1">Khách hàng chết</label>
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="field-checkbox">
            <Checkbox
              inputId="checkOption2"
              name="option"
              value="Khách hàng đang thi hành án tù"
              checked={props.evaluations.indexOf('Khách hàng đang thi hành án tù') !== -1}
              onChange={onCheckboxChange}
              disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
            />
            <label htmlFor="checkOption2">Khách hàng đang thi hành án tù</label>
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="field-checkbox">
            <Checkbox
              inputId="checkOption3"
              name="option"
              value="Khách hàng không thừa nhận sử dụng thẻ"
              checked={props.evaluations.indexOf('Khách hàng không thừa nhận sử dụng thẻ') !== -1}
              onChange={onCheckboxChange}
              disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
            />
            <label htmlFor="checkOption3">Khách hàng không thừa nhận sử dụng thẻ</label>
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="field-checkbox">
            <Checkbox
              inputId="checkOption4"
              name="option"
              value="Hồ sơ có dấu hiệu giả mạo - sự vụ"
              checked={props.evaluations.indexOf('Hồ sơ có dấu hiệu giả mạo - sự vụ') !== -1}
              onChange={onCheckboxChange}
              disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
            />
            <label htmlFor="checkOption4">Hồ sơ có dấu hiệu giả mạo - sự vụ</label>
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="field-checkbox">
            <Checkbox
              inputId="checkOption5"
              name="option"
              value="Khách hàng đang ở nước ngoài"
              checked={props.evaluations.indexOf('Khách hàng đang ở nước ngoài') !== -1}
              onChange={onCheckboxChange}
              disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
            />
            <label htmlFor="checkOption5">Khách hàng đang ở nước ngoài</label>
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="field-checkbox">
            <Checkbox
              inputId="checkOption6"
              name="option"
              value="Khách hàng không có khả năng trả nợ"
              checked={props.evaluations.indexOf('Khách hàng không có khả năng trả nợ') !== -1}
              onChange={onCheckboxChange}
              disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
            />
            <label htmlFor="checkOption6">Khách hàng không có khả năng trả nợ</label>
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="field-checkbox">
            <Checkbox
              inputId="checkOption7"
              name="option"
              value="Khách hàng không có ý định trả nợ"
              checked={props.evaluations.indexOf('Khách hàng không có ý định trả nợ') !== -1}
              onChange={onCheckboxChange}
              disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
            />
            <label htmlFor="checkOption7">Khách hàng không có ý định trả nợ</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DanhGia
