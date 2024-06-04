import Action from '@/api/v1/models'
import supabase from 'utils/supabase/client'
import { transformToQuery } from '@/api/v1/helpers'

function getNewId(newestId) {
  'DGKK-0002'
  const number = Number(newestId.substring(5, 9)) + 1
  if (number < 10) {
    return `DGKK-000${number}`
  } else if (10 <= number && number < 100) {
    return `DGKK-00${number}`
  } else if (100 <= number && number < 1000) {
    return `DGKK-0${number}`
  } else return `DGKK-${number}`
}

export function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('ma_nhan_vien')
  console.log(query)
  const data = {
    '': ['*'],
    khach_hang: ['ma_khach_hang', 'ho_ten'],
    nhan_vien: ['ma_nhan_vien', 'ho_ten'],
  }

  if (query) {
    return Action.read({
      table: 'to_trinh_khoi_kien',
      query: transformToQuery(data),
      column: 'ma_nhan_vien',
      value: query,
    })
  }

  return Action.read({
    table: 'to_trinh_khoi_kien',
    query: transformToQuery(data),
  })
}

export async function POST(request) {
  const res = await request.json()

  // Create ma_to_trinh
  const { data, error } = await supabase
    .from('to_trinh_khoi_kien')
    .select('ma_to_trinh')
    .order('ma_to_trinh', { ascending: false })
  if (error) return Response.json(error, { status: 400 })
  else {
    if (data.length === 0) {
      res.ma_to_trinh = 'DGKK-0001'
    } else {
      res.ma_to_trinh = getNewId(data[0].ma_to_trinh)
    }
  }
  res.trang_thai = 'Chưa duyệt' // Add trang_thai
  return Action.create({ table: 'to_trinh_khoi_kien', values: res })
}
