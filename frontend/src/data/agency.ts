export interface Agency {
  id: number
  shortname: string
  longname: string
  email: string
  logo: string
  noEnquiriesMessage?: string
  website?: string
  displayOrder?: number[]
  createdAt: string | Date
  updatedAt: string | Date
}
