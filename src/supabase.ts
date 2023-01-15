export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      gt_student: {
        Row: {
          course: Database["public"]["Enums"]["enum_course"] | null
          enroll: string | null
          id_student: number
          id_user: string | null
          months_paid: number | null
          name: string | null
        }
        Insert: {
          course?: Database["public"]["Enums"]["enum_course"] | null
          enroll?: string | null
          id_student?: number
          id_user?: string | null
          months_paid?: number | null
          name?: string | null
        }
        Update: {
          course?: Database["public"]["Enums"]["enum_course"] | null
          enroll?: string | null
          id_student?: number
          id_user?: string | null
          months_paid?: number | null
          name?: string | null
        }
      }
      gt_teacher: {
        Row: {
          hired: string | null
          id_teacher: number
          id_user: string | null
        }
        Insert: {
          hired?: string | null
          id_teacher?: number
          id_user?: string | null
        }
        Update: {
          hired?: string | null
          id_teacher?: number
          id_user?: string | null
        }
      }
      gt_user: {
        Row: {
          addr_code: string | null
          addr_name: string | null
          birth: string | null
          city_name: string | null
          cpf: string | null
          email: string | null
          gender: Database["public"]["Enums"]["enum_gender"] | null
          id: string
          state_code: Database["public"]["Enums"]["enum_state"] | null
          username: string | null
        }
        Insert: {
          addr_code?: string | null
          addr_name?: string | null
          birth?: string | null
          city_name?: string | null
          cpf?: string | null
          email?: string | null
          gender?: Database["public"]["Enums"]["enum_gender"] | null
          id?: string
          state_code?: Database["public"]["Enums"]["enum_state"] | null
          username?: string | null
        }
        Update: {
          addr_code?: string | null
          addr_name?: string | null
          birth?: string | null
          city_name?: string | null
          cpf?: string | null
          email?: string | null
          gender?: Database["public"]["Enums"]["enum_gender"] | null
          id?: string
          state_code?: Database["public"]["Enums"]["enum_state"] | null
          username?: string | null
        }
      }
      Task: {
        Row: {
          created_at: string
          id: string
          name: string
          stat: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          stat?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          stat?: boolean
          updated_at?: string
          user_id?: string
        }
      }
      User: {
        Row: {
          created_at: string
          email: string
          id: string
          password: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password?: string
          updated_at?: string
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      enum_course: "INF" | "ENF" | "RAD" | "ADM" | "NIL"
      enum_gender: "M" | "F" | "N"
      enum_state:
        | "AC"
        | "AL"
        | "AP"
        | "AM"
        | "BA"
        | "CE"
        | "DF"
        | "ES"
        | "GO"
        | "MA"
        | "MT"
        | "MS"
        | "MG"
        | "PA"
        | "PB"
        | "PR"
        | "PE"
        | "PI"
        | "RJ"
        | "RN"
        | "RS"
        | "RO"
        | "RR"
        | "SC"
        | "SP"
        | "SE"
        | "TO"
    }
  }
}
