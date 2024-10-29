export type DateTimeInfo = {
  utc_offset: string
  timezone: string
  day_of_week: number
  day_of_year: number
  datetime: string
  utc_datetime: string
  unixtime: number
  raw_offset: number
  week_number: number
  dst: boolean
  abbreviation: string
  dst_offset: number
  dst_from: string | null
  dst_until: string | null
  client_ip: string
}
