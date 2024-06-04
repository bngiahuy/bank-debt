'use client'
import { connect } from 'react-redux'
import { Button } from 'primereact/button'

const JudgmentActions = (props) => {
  const handleTransformState = () => {
    if (props.state === 'Tạo hồ sơ THA') {
      props.setState('Nộp hồ sơ THA')
      props.setForm({
        ...props.form,
        trang_thai: 'Nộp hồ sơ THA',
        thao_tac: 'Chuyển trạng thái',
        nguoi_thuc_hien: props.user.ho_ten,
      })
    } else if (props.state === 'Nộp hồ sơ THA') {
      props.setState('Đang THA')
      props.setForm({
        ...props.form,
        trang_thai: 'Đang THA',
        thao_tac: 'Chuyển trạng thái',
        nguoi_thuc_hien: props.user.ho_ten,
      })
    }
  }

  return (
    <div className="flex mt-3">
      <Button label="Quay lại" className="mr-4" style={{ height: '36px' }} />

      {['Tạo hồ sơ THA', 'Nộp hồ sơ THA'].includes(props.state) && (
        <Button
          label="Chuyển trạng thái"
          className="mr-4"
          style={{ height: '36px' }}
          onClick={() => {
            handleTransformState()
            window.scroll({
              top: 0,
              behavior: 'smooth',
            })
          }}
        />
      )}

      {['Đang THA'].includes(props.state) && (
        <Button
          label="Kết thúc THA"
          className="mr-4"
          style={{ height: '36px' }}
          onClick={() => {
            props.setState('Kết thúc THA')
            props.setForm({
              ...props.form,
              trang_thai: 'Kết thúc THA',
              thao_tac: 'Kết thúc THA',
              nguoi_thuc_hien: props.user.ho_ten,
            })
            window.scroll({
              top: 0,
              behavior: 'smooth',
            })
          }}
        />
      )}

      {['Tạo hồ sơ THA', 'Nộp hồ sơ THA'].includes(props.state) && (
        <Button
          label="Rút đơn THA"
          className="mr-4"
          style={{ height: '36px' }}
          onClick={() => {
            props.setState('Chưa thi hành án')
            props.setForm({
              ...props.form,
              trang_thai: 'Chưa thi hành án',
              thao_tac: 'Rút đơn THA',
              nguoi_thuc_hien: props.user.ho_ten,
            })
          }}
        />
      )}

      {!['Kết thúc THA'].includes(props.state) && (
        <Button label="In Giấy UQ" className="mr-4" style={{ height: '36px' }} />
      )}

      {['Đang THA'].includes(props.state) && (
        <Button label="In Giấy thôi UQ" className="mr-4" style={{ height: '36px' }} />
      )}

      {['Tạo hồ sơ THA', 'Nộp hồ sơ THA'].includes(props.state) && (
        <Button label="In Đơn yêu cầu thi hành án" className="mr-4" style={{ height: '36px' }} />
      )}

      {['Tạo hồ sơ THA', 'Nộp hồ sơ THA'].includes(props.state) && (
        <Button label="In Đơn yêu cầu ngăn xuất cảnh" className="mr-4" style={{ height: '36px' }} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(JudgmentActions)
