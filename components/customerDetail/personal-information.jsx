const PersonalInformation = (props) => {
  return (
    <div className="card mb-3">
      <div className="font-bold text-xl mb-4">Thông tin cá nhân</div>
      <div>
        <div className="flex mt-2">
          <div className="font-medium mr-2 text-right line-height-3" style={{ width: '170px' }}>
            Mã khách hàng:
          </div>
          <div className="line-height-3">{props.customer.ma_khach_hang}</div>
        </div>

        <div className="flex mt-2 ">
          <div className="font-medium mr-2 text-right line-height-3" style={{ width: '170px' }}>
            Họ và tên:
          </div>
          <div className="line-height-3">{props.customer.ho_ten}</div>
        </div>

        <div className="flex mt-2 ">
          <div className="font-medium mr-2 text-right line-height-3" style={{ width: '170px' }}>
            Căn cước công dân:
          </div>
          <div className="line-height-3">{props.customer.can_cuoc}</div>
        </div>

        <div className="flex mt-2 ">
          <div className="font-medium mr-2 text-right line-height-3" style={{ width: '170px' }}>
            Ngày sinh:
          </div>
          <div className="line-height-3">{props.customer.ngay_sinh}</div>
        </div>

        <div className="flex mt-2 ">
          <div
            className="font-medium mr-2 text-right line-height-3"
            style={{ width: '170px', minWidth: '170px' }}
          >
            Địa chỉ thường trú:
          </div>
          <div className="line-height-3">{props.customer.thuong_tru}</div>
        </div>

        <div className="flex mt-2 ">
          <div
            className="font-medium mr-2 text-right line-height-3"
            style={{ width: '170px', minWidth: '170px' }}
          >
            Địa chỉ tạm trú:
          </div>
          <div className="line-height-3">{props.customer.tam_tru}</div>
        </div>

        <div className="flex mt-2 ">
          <div className="font-medium mr-2 text-right line-height-3" style={{ width: '170px' }}>
            Số điện thoại:
          </div>
          <div className="line-height-3">{props.customer.dien_thoai}</div>
        </div>

        <div className="flex mt-2 ">
          <div className="font-medium mr-2 text-right line-height-3" style={{ width: '170px' }}>
            Email:
          </div>
          <div className="line-height-3">{props.customer.email}</div>
        </div>

        <div className="flex mt-2 ">
          <div
            className="font-medium mr-2 text-right line-height-3"
            style={{ width: '170px', minWidth: '170px' }}
          >
            Tên công ty:
          </div>
          <div className="line-height-3">{props.customer.TenCongTy}</div>
        </div>

        <div className="flex mt-2 ">
          <div
            className="font-medium mr-2 text-right line-height-3"
            style={{ width: '170px', minWidth: '170px' }}
          >
            Địa chỉ công ty:
          </div>
          <div className="line-height-3">{props.customer.DiaChiCongTy}</div>
        </div>

        <div className="flex mt-2 ">
          <div className="font-medium mr-2 text-right line-height-3" style={{ width: '170px' }}>
            Tên người thân:
          </div>
          <div className="line-height-3">Lê Tiến Bình</div>
        </div>

        <div className="flex mt-2 ">
          <div className="font-medium mr-2 text-right line-height-3" style={{ width: '170px' }}>
            Số điện thoại người thân:
          </div>
          <div className="line-height-3">0159484532</div>
        </div>

        <div className="flex mt-2 ">
          <div className="font-medium mr-2 text-right line-height-3" style={{ width: '170px' }}>
            Quan hệ:
          </div>
          <div className="line-height-3">Em trai</div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInformation
