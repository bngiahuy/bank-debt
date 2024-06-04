import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'

export async function GET(_, { params }) {
  const data = {
    '': ['*'],
    khach_hang: ['ma_khach_hang', 'ho_ten', 'can_cuoc', 'thuong_tru', 'tam_tru'],
    nhan_vien: ['ma_nhan_vien', 'ho_ten', 'can_cuoc', 'chuc_danh'],
  }

  return Action.readLawsuitJudgment(
    {
      table: 'thi_hanh_an',
      query: transformToQuery(data),
      column: 'ma_thi_hanh_an',
      value: params.code,
    },
    true
  )
}

export async function PATCH(request, { params }) {
  const res = await request.json()

  const thao_tac = res.thao_tac
  const nguoi_thuc_hien = res.nguoi_thuc_hien
  delete res.thao_tac
  delete res.nguoi_thuc_hien

  const logData = {
    thao_tac: thao_tac,
    trang_thai: res.trang_thai,
    nguoi_thuc_hien: nguoi_thuc_hien,
  }

  return Action.updateWithLog({
    table: 'thi_hanh_an',
    values: res,
    column: 'ma_thi_hanh_an',
    value: params.code,
    logData: logData,
  })
}
