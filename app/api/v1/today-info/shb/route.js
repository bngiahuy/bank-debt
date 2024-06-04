import { NextResponse } from 'next/server'
import supabase from 'utils/supabase/client'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const ma_nhan_vien = searchParams.get('ma_nhan_vien')

  const result = {}
  const dateFormToday = new Date()
  const today = dateFormToday.toISOString()
  let customers
  let actionHistories
  let ttdgkks
  let ttmgs
  let appointments
  let lawsuits
  let judgmentExecute

  // Get customers
  if (true) {
    const { data, error } = await supabase
      .from('khach_hang')
      .select('*')
      .eq('nhan_vien_phu_trach_1', ma_nhan_vien)
    if (error)
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    customers = data
  }

  // Get action history
  if (true) {
    const { data, error } = await supabase
      .from('lich_su_hanh_dong')
      .select('ma_khach_hang, ngay_cap_nhat')
    if (error)
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    actionHistories = data
  }

  // Get list ttdgkk
  if (true) {
    const { data, error } = await supabase
      .from('to_trinh_khoi_kien')
      .select(
        'ma_to_trinh, created_at, updated_at, trang_thai, khach_hang (ho_ten, ma_khach_hang), nhan_vien (ho_ten, ma_nhan_vien)'
      )
      .eq('ma_nhan_vien', ma_nhan_vien)
    if (error)
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    ttdgkks = data
  }

  // Get list ttmg
  if (true) {
    const { data, error } = await supabase
      .from('to_trinh_mien_giam')
      .select(
        'ma_to_trinh, created_at, updated_at, trang_thai, khach_hang (ho_ten, ma_khach_hang), nhan_vien (ho_ten, ma_nhan_vien)'
      )
      .eq('ma_nhan_vien', ma_nhan_vien)
    if (error)
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    ttmgs = data
  }

  // Get appointments
  if (true) {
    const { data, error } = await supabase
      .from('lich_hen')
      .select('*, khach_hang (ho_ten, ma_khach_hang), nhan_vien (ho_ten, ma_nhan_vien)')
    if (error)
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    appointments = data
  }

  // Get khoi_kien
  if (true) {
    const { data, error } = await supabase
      .from('khoi_kien')
      .select(
        'ma_khoi_kien, ma_khach_hang, so_tien_kk, trang_thai, tinh_tp, quan_huyen, created_at, khach_hang (ho_ten, ma_khach_hang), nhan_vien (ho_ten, ma_nhan_vien)'
      )
      .eq('id_nguoi_duoc_uq', ma_nhan_vien)
    if (error)
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    lawsuits = data
    console.log(data)
  }

  // Get thi_hanh_an
  if (true) {
    const { data, error } = await supabase
      .from('thi_hanh_an')
      .select(
        'ma_thi_hanh_an, ma_khach_hang, trang_thai, tinh_tp, quan_huyen, created_at, khach_hang (ho_ten, ma_khach_hang), nhan_vien (ho_ten, ma_nhan_vien)'
      )
      .eq('id_nguoi_duoc_uq', ma_nhan_vien)
    if (error)
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    judgmentExecute = data
  }

  // Get new customers of today
  result.new_khach_hang = customers.filter(
    (item) => item.created_at.substring(0, 10) === today.substring(0, 10)
  )

  // Get list customers haven't been recoveried debt
  const tempCustomerIds = actionHistories.map((item) => {
    return item.ma_khach_hang
  })
  const customersHaventBeenRecoveried = customers.map((item) => {
    if (!tempCustomerIds.includes(item.ma_khach_hang)) return item
  })
  result.customersHaventBeenRecoveried = customersHaventBeenRecoveried.filter((item) => item)

  // Get list customers haven't been recoveried debt for 7 days
  const customers7Days = customers.map((item) => {
    if (tempCustomerIds.includes(item.ma_khach_hang)) {
      const getUpdateDate = actionHistories.filter(
        (actionHistory) => actionHistory.ma_khach_hang === item.ma_khach_hang
      )[0].ngay_cap_nhat
      const diff = Math.abs(dateFormToday - new Date(getUpdateDate))
      if (diff / (1000 * 60 * 60 * 24) >= 7) return item
    }
  })
  result.customers7Days = customers7Days.filter((item) => item)

  // Get list ttdgkk hasn't been approved
  result.ttdgkkNotApproved = ttdgkks.filter((item) => item.trang_thai === 'Chưa duyệt')

  // Get list ttdgkk has been approved
  result.ttdgkkApproved = ttdgkks.filter(
    (item) =>
      item.trang_thai === 'Đã duyệt' && item.updated_at.substring(0, 10) === today.substring(0, 10)
  )

  // Get list ttdgkk has been declined
  result.ttdgkkDeclined = ttdgkks.filter(
    (item) =>
      item.trang_thai === 'Đã từ chối' &&
      item.updated_at.substring(0, 10) === today.substring(0, 10)
  )

  // Get list ttmg hasn't been approved
  result.ttmgNotApproved = ttmgs.filter((item) => item.trang_thai === 'Chưa duyệt')

  // Get list ttmg has been approved
  result.ttmgApproved = ttmgs.filter(
    (item) =>
      item.trang_thai === 'Đã duyệt' && item.updated_at.substring(0, 10) === today.substring(0, 10)
  )

  // Get list ttmg has been declined
  result.ttmgDeclined = ttmgs.filter(
    (item) =>
      item.trang_thai === 'Đã từ chối' &&
      item.updated_at.substring(0, 10) === today.substring(0, 10)
  )

  // Get list appointments will outdated in the next 3 days
  const next3DaysApointments = appointments.map((item) => {
    const diff = dateFormToday - new Date(item.ngay_hen)
    if (diff < 0 && diff / (1000 * 60 * 60 * 24) <= 3) return item
  })
  result.next3DaysApointments = next3DaysApointments.filter((item) => item)

  // Get list of customers is in lawsuit
  const customersInLawsuit = lawsuits.map((item) => {
    if (!['Hòa giải thành', 'Đình chỉ', 'Rút đơn', 'Trả đơn'].includes(item.trang_thai)) return item
  })
  result.customersInLawsuit = customersInLawsuit.filter((item) => item)

  // Get list of customers is in judgment lawsuit
  const customersInJudgmentExecution = judgmentExecute.map((item) => {
    if (item.trang_thai !== 'Kết thúc THA') {
      return item
    }
  })
  result.customersInJudgmentExecution = customersInJudgmentExecution.filter((item) => item)

  return NextResponse.json({ result: result }, { status: 200 })
}
