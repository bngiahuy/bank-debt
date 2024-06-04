import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'
import supabase from 'utils/supabase/client'
import { getCurrentTime } from '@/api/v1/helpers'

function getNewId(newestId) {
  'MG-0002'
  const number = Number(newestId.substring(3, 7)) + 1
  if (number < 10) {
    return `MG-000${number}`
  } else if (10 <= number && number < 100) {
    return `MG-00${number}`
  } else if (100 <= number && number < 1000) {
    return `MG-0${number}`
  } else return `MG-${number}`
}

export function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('ma_nhan_vien')

  const data = {
    '': ['ma_to_trinh', 'trang_thai', 'created_at'],
    khach_hang: ['ma_khach_hang', 'ho_ten', 'can_cuoc'],
    nhan_vien: ['ma_nhan_vien', 'ho_ten'],
  }

  if (query) {
    return Action.read({
      table: 'to_trinh_mien_giam',
      query: transformToQuery(data),
      column: 'ma_nhan_vien',
      value: query,
    })
  }

  return Action.read({
    table: 'to_trinh_mien_giam',
    query: transformToQuery(data),
  })
}

export async function POST(request) {
  const res = await request.json()

  // Create ma_to_trinh
  const { data, error } = await supabase
    .from('to_trinh_mien_giam')
    .select('ma_to_trinh')
    .order('ma_to_trinh', { ascending: false })
  if (error) return Response.json(error, { status: 400 })
  else {
    if (data.length === 0) {
      res.ma_to_trinh = 'MG-0001'
    } else {
      res.ma_to_trinh = getNewId(data[0].ma_to_trinh)
    }
  }

  // Add updated_at
  res.updated_at = getCurrentTime()

  return Action.create({ table: 'to_trinh_mien_giam', values: res })
}
