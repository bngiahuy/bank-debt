import React, { useRef, useState, useEffect } from 'react'

import { useReactToPrint } from 'react-to-print'

import { Button } from 'primereact/button'

import styles from './index.module.scss'

const InDonKhoiKien = (props) => {
  const componentRef = useRef()
  const [date, setDate] = useState({})

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const getDate = () => {
    const newDate = new Date()
    setDate({
      date: newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate(),
      month: newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1,
      year: newDate.getFullYear(),
    })
  }

  useEffect(() => {
    getDate()
  }, [])

  return (
    <div>
      <div ref={componentRef} className={styles.printHide}>
        <div className={styles.chxhcnvnStyle}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div className={styles.dltdhpStyle}>Độc lập - Tự do - Hạnh phúc</div>
        <div className={styles.dateStyle}>
          Tp.Hồ Chí Minh, ngày {date.date} tháng {date.month} năm {date.year}
        </div>
        <div className={styles.titletyle}>ĐƠN KHỞI KIỆN</div>
        <div className={styles.dearStyle}>Kính gửi: Tòa án nhân dân thành phố Hồ Chí Minh</div>

        {/* Người khởi kiện */}
        <div className={styles.itemStyle}>
          <b>Người khởi kiện:</b> Ngân hàng SCB, chi nhánh Lý Thường Kiệt, thành phố Hồ Chí Minh
        </div>
        <div className={styles.itemStyle}>
          Địa chỉ: Ngân hàng SCB, chi nhánh Lý Thường Kiệt, thành phố Hồ Chí Minh
        </div>
        <div className={styles.itemStyle}>
          Số điện thoại (nếu có): 0368 514 210, số fax (nếu có): ...............................
        </div>
        <div className={styles.itemStyle}>
          Địa chỉ thư điện tử (nếu có): bang.lentmd@hcmut.edu.vn
        </div>

        {/* Người bị khởi kiện */}
        <div className={styles.itemStyle}>
          <b>Người bị khởi kiện:</b> Ngân hàng SCB, chi nhánh Lý Thường Kiệt, thành phố Hồ Chí Minh
        </div>
        <div className={styles.itemStyle}>
          Địa chỉ: Ngân hàng SCB, chi nhánh Lý Thường Kiệt, thành phố Hồ Chí Minh
        </div>
        <div className={styles.itemStyle}>
          Số điện thoại (nếu có): 0368 514 210, số fax (nếu có): ...............................
        </div>
        <div className={styles.itemStyle}>
          Địa chỉ thư điện tử (nếu có): bang.lentmd@hcmut.edu.vn
        </div>

        {/* Người có quyền, lợi ích được bảo vệ (nếu có) */}
        <div className={styles.itemStyle}>
          <b>Người có quyền, lợi ích được bảo vệ (nếu có):</b>{' '}
          .......................................
        </div>
        <div className={styles.itemStyle}>
          Địa chỉ: Ngân hàng SCB, chi nhánh Lý Thường Kiệt, thành phố Hồ Chí Minh
        </div>
        <div className={styles.itemStyle}>
          Số điện thoại (nếu có): 0368 514 210, số fax (nếu có): ...............................
        </div>
        <div className={styles.itemStyle}>
          Địa chỉ thư điện tử (nếu có): bang.lentmd@hcmut.edu.vn
        </div>

        {/* Người có quyền lợi, nghĩa vụ liên quan (nếu có) */}
        <div className={styles.itemStyle}>
          <b>Người có quyền lợi, nghĩa vụ liên quan (nếu có):</b> Ngân hàng SCB, chi nhánh Lý Thường
          Kiệt, thành phố Hồ Chí Minh
        </div>
        <div className={styles.itemStyle}>
          Địa chỉ: Ngân hàng SCB, chi nhánh Lý Thường Kiệt, thành phố Hồ Chí Minh
        </div>
        <div className={styles.itemStyle}>
          Số điện thoại (nếu có): 0368 514 210, số fax (nếu có): ...............................
        </div>
        <div className={styles.itemStyle}>
          Địa chỉ thư điện tử (nếu có): bang.lentmd@hcmut.edu.vn
        </div>

        <div className={styles.itemStyle}>
          <b>Yêu cầu Tòa án giải quyết những vấn đề sau đây:</b>{' '}
          .....................................................................................................................
        </div>
        <div className={styles.itemStyle}>Người làm chứng (nếu có): Lê Văn Bằng</div>
        <div className={styles.itemStyle}>
          Số điện thoại (nếu có): 0368 514 210, số fax (nếu có): ...............................
        </div>
        <div className={styles.itemStyle}>
          Địa chỉ thư điện tử (nếu có): bang.lentmd@hcmut.edu.vn
        </div>

        <div className={styles.itemStyle}>
          <b>Danh mục tài liệu, chứng kèm theo đơn kiện gồm có: </b>
          .....................................................................................................................
        </div>
        <div className={styles.itemStyle}>
          1. ................................................................
        </div>
        <div className={styles.itemStyle}>
          2. ................................................................
        </div>
        <div className={styles.itemStyle}>
          3. ................................................................
        </div>
        <div className={styles.itemStyle}>
          (Các thông tin khác mà người khởi kiện xét thấy cần thiết cho việc giải quyết vụ án)
        </div>
        <div className={styles.signStyle}>Người khởi kiện</div>
        <div className={styles.signNoteStyle}>(Ký và ghi rõ họ tên)</div>
      </div>

      <Button label="In đơn KK" onClick={handlePrint} className="mr-4" style={{ height: '36px' }} />
    </div>
  )
}

export default InDonKhoiKien
