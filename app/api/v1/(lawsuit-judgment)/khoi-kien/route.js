import Action from '@/api/v1/models'
import { transformToQuery, getCurrentTime } from '@/api/v1/helpers'

export function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')
  const ma_nhan_vien = searchParams.get('ma_nhan_vien')

  const data = {
    '': ['*'],
    khach_hang: ['ho_ten', 'can_cuoc'],
    nhan_vien: ['ho_ten'],
  }

  if (ma_nhan_vien) {
    return Action.read({
      table: 'khoi_kien',
      query: transformToQuery(data),
      column: 'id_nguoi_duoc_uq',
      value: ma_nhan_vien,
    })
  }

  return Action.read({
    table: 'khoi_kien',
    query: transformToQuery(data),
  })
}

export async function POST(request) {
  const res = await request.json()

  const nguoi_thuc_hien = res.nguoi_thuc_hien
  delete res.nguoi_thuc_hien
  res.trang_thai = 'Nhập mới'
  res.updated_at = getCurrentTime()

  const logData = {
    thao_tac: 'Nhập mới',
    trang_thai: 'Nhập mới',
    nguoi_thuc_hien: nguoi_thuc_hien,
  }

  return Action.createWithLog({
    table: 'khoi_kien',
    values: res,
    logData: logData,
  })
}
