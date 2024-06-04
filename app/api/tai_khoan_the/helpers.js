import { NextResponse } from 'next/server'
function isNumeric(num) {
  return !isNaN(num)
}
export const checkLogicParams = (obj) => {
  /* 
    {
    "so_tai_khoan": "",
    "so_du": "",
    "noi_mo": "",
    "thong_tin_ky_han": "",
    "thong_tin_khong_ky_han": "",
    "ma_khach_hang": ""
}
*/
  const { so_tai_khoan, so_du } = obj
  if (so_tai_khoan) {
    if (!isNumeric(so_tai_khoan)) {
      throw NextResponse.json(
        {
          body: 'Invalid "so_tai_khoan" parameter',
        },
        { status: 400 }
      )
    }
  }

  if (so_du && !isNumeric(so_du)) {
    throw NextResponse.json(
      {
        body: 'Invalid "so_du" parameter',
      },
      { status: 400 }
    )
  }
}

export const checkLogicParamsTheTinDung = (obj) => {
  /*
  {
    "so_the": "",
    "so_tai_khoan_the": "",
    "ngay_mo_the": "",
    "han_muc": "",
    "ma_chinh_sach": "",
    "ten_chinh_sach": ""
    }
  */
  const { so_the, so_tai_khoan_the } = obj
  if (so_the) {
    if (!isNumeric(so_the)) {
      throw NextResponse.json(
        {
          body: 'Invalid "so_the" parameter',
        },
        { status: 400 }
      )
    }
  }

  if (so_tai_khoan_the && !isNumeric(so_tai_khoan_the)) {
    throw NextResponse.json(
      {
        body: 'Invalid "so_tai_khoan_the" parameter',
      },
      { status: 400 }
    )
  }
}
