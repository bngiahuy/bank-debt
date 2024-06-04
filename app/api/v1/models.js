import supabase from 'utils/supabase/client'
import { createLog } from './helpers'
import { recordHistory } from './helpers'

const Action = {
  create: async ({ table, values }) => {
    const { data, error } = await supabase.from(table).insert(values).select().single()

    if (error) return Response.json(error, { status: 400 })

    return Response.json(data)
  },
  createWithLog: async ({ table, values, logData = null }) => {
    const { data, error } = await supabase.from(table).insert(values).select().single()

    if (error) return Response.json(error, { status: 400 })

    // Create log of khoi_kien and thi_hanh_an
    if (['khoi_kien', 'thi_hanh_an'].includes(table)) {
      createLog(
        table === 'khoi_kien' ? 'log_khoi_kien' : 'log_thi_hanh_an',
        logData,
        table === 'khoi_kien' ? data.ma_khoi_kien : data.ma_thi_hanh_an
      ).then((res) => {
        if (res.error) return Response.json(error, { status: 400 })
      })
    }

    return Response.json(data)
  },
  // For record debt recovery action histories
  createAndRecord: async ({ table, values }) => {
    const { data, error } = await supabase.from(table).insert(values).select().single()

    if (error) return Response.json(error, { status: 400 })
    else {
      const dataToRecord = values
      delete dataToRecord.ngay_cap_nhat
      dataToRecord.id_ls_hanh_dong = data.id
      const { error } = recordHistory('ghi_chep_ls_hanh_dong', dataToRecord)
      if (error) return Response.json(error, { status: 400 })
    }

    return Response.json(data)
  },
  read: async (
    { table, query, column = null, value = null, sortField = '', sortAscending = false },
    single = false
  ) => {
    if (single) {
      let apiQuery = supabase.from(table).select(query).eq(column, value).single()
      const { data, error } = await apiQuery

      if (error) return Response.json(error, { status: 400 })

      return Response.json(data)
    }

    let apiQuery =
      column && value
        ? supabase
            .from(table)
            .select(query, {
              count: 'exact',
            })
            .eq(column, value)
        : supabase.from(table).select(query, {
            count: 'exact',
          })
    if (sortField) {
      apiQuery = apiQuery.order(sortField, { ascending: sortAscending })
    }
    const { count, data, error } = await apiQuery

    if (error) return Response.json(error, { status: 400 })

    return Response.json({ count: count, next: null, previous: null, results: data })
  },
  readLawsuitJudgment: async ({ table, query, column = null, value = null }, single = false) => {
    if (single) {
      const { data, error } = await supabase.from(table).select(query).eq(column, value).single()

      if (error) return Response.json(error, { status: 400 })

      // get logs
      if (!error) {
        const res = await supabase
          .from(table === 'khoi_kien' ? 'log_khoi_kien' : 'log_thi_hanh_an')
          .select('*')
          .eq(table === 'khoi_kien' ? 'ma_khoi_kien' : 'ma_thi_hanh_an', value) // value is ma_khoi_kien
          .order('created_at', { ascending: false })
        if (!res.error) {
          data.logs = res.data
        }
      }

      // get lich_hen
      if (!error) {
        const res = await supabase
          .from('lich_hen')
          .select('*, nhan_vien(ho_ten, ma_nhan_vien)')
          .eq(table === 'khoi_kien' ? 'ma_khoi_kien' : 'ma_thi_hanh_an', value) // value is ma_khoi_kien or ma_thi_hanh_an
          .order('updated_at', { ascending: false })
        if (!res.error) {
          data.lich_hen = res.data
        }
      }

      // get tam_ung_an_phi (just khoi_kien has)
      if (!error && table === 'khoi_kien') {
        const res = await supabase
          .from('tam_ung_an_phi')
          .select('*, nhan_vien(ho_ten, ma_nhan_vien)')
          .eq('ma_khoi_kien', value) // value is ma_khoi_kien
          .order('updated_at', { ascending: false })
        if (!res.error) {
          data.tuap = res.data
        }
      }

      return Response.json(data)
    }

    const { count, data, error } = await (column && value
      ? supabase
          .from(table)
          .select(query, {
            count: 'exact',
          })
          .eq(column, value)
      : supabase.from(table).select(query, {
          count: 'exact',
        }))

    if (error) return Response.json(error, { status: 400 })

    return Response.json({ count: count, next: null, previous: null, results: data })
  },
  update: async ({ table, values, column, value }) => {
    const { data, error } = await supabase
      .from(table)
      .update(values)
      .eq(column, value)
      .select()
      .single()

    if (error) return Response.json(error, { status: 400 })

    return Response.json(data)
  },
  updateAndRecord: async ({ table, values, column, value }) => {
    const { data, error } = await supabase
      .from(table)
      .update(values)
      .eq(column, value)
      .select()
      .single()

    if (error) return Response.json(error, { status: 400 })
    else {
      const dataToRecord = values
      delete dataToRecord.ngay_cap_nhat
      dataToRecord.id_ls_hanh_dong = value
      const { error } = recordHistory('ghi_chep_ls_hanh_dong', dataToRecord)
      if (error) return Response.json(error, { status: 400 })
    }

    return Response.json(data)
  },
  updateWithLog: async ({ table, values, column, value, logData = null }) => {
    const { data, error } = await supabase
      .from(table)
      .update(values)
      .eq(column, value)
      .select()
      .single()

    if (error) return Response.json(error, { status: 400 })

    // Create log of khoi_kien and thi_hanh_an
    if (['khoi_kien', 'thi_hanh_an'].includes(table)) {
      createLog(
        table === 'khoi_kien' ? 'log_khoi_kien' : 'log_thi_hanh_an',
        logData,
        table === 'khoi_kien' ? data.ma_khoi_kien : data.ma_thi_hanh_an
      ).then((res) => {
        if (res.error) return Response.json(error, { status: 400 })
      })
    }

    return Response.json(data)
  },
  delete: async ({ table, column, value }) => {
    const { error } = await supabase.from(table).delete().eq(column, value)

    if (error) return Response.json(error, { status: 400 })

    return Response.json({ message: 'xoa thanh cong' })
  },
}

export default Action
