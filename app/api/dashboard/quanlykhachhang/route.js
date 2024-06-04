import supabase from 'utils/supabase/client'
import { NextResponse } from 'next/server' 
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const obj = Object.fromEntries(searchParams.entries())

    const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
    const limit = obj['limit'] ? parseInt(obj['limit']) : 20 // Limit default = 20

    if (obj['offset'] && obj['limit']) {
        const { count, data, error } = await supabase.from('customer_manages').select(`total_customers:ma_khach_hang.count(), ma_nhan_vien, nhan_vien(ho_ten, chuc_danh, phong_ban)`,{ count: 'exact' }).range(offset, limit)
        if (error) {
          return NextResponse.json(
            {
              body: JSON.stringify(error),
            },
            { status:error.status || 500 }
          )
        }
    
        return NextResponse.json(
          { count: data.length, next: null, previous: null, results: data },
          { status: 200 }
        )
      } else {
        const { count, data, error } = await supabase.from('customer_manages').select(`total_customers:ma_khach_hang.count(), ma_nhan_vien, nhan_vien(ho_ten, chuc_danh, phong_ban)`,{ count: 'exact' })
        if (error) {
          return NextResponse.json(
            {
              body: JSON.stringify(error),
            },
            { status: error.status || 500 }
          )
        }
    
        return NextResponse.json(
          { count: count, next: null, previous: null, results: data },
          { status: 200 }
        )
      }
}