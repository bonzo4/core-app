export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _team_members: {
        Row: {
          created_at: string
          id: number
          is_confirmed: boolean
          payment_amount: number
          team_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          payment_amount?: number
          team_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          payment_amount?: number
          team_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "_team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          amount: number
          created_at: string
          id: number
          is_confirmed: boolean
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: number
          is_confirmed?: boolean
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          is_confirmed?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdraws_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      member_edits: {
        Row: {
          created_at: string
          id: number
          is_confirmed: boolean
          new_payment_amount: number
          team_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          new_payment_amount: number
          team_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          new_payment_amount?: number
          team_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_edits_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_edits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: number
          is_confirmed: boolean
          payer_id: string | null
          team_id: number | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: number
          is_confirmed?: boolean
          payer_id?: string | null
          team_id?: number | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          is_confirmed?: boolean
          payer_id?: string | null
          team_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_payer_id_fkey"
            columns: ["payer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_wallets"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey2"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_wallets"
            referencedColumns: ["user_id"]
          },
        ]
      }
      team_leaves: {
        Row: {
          created_at: string
          id: number
          is_confirmed: boolean
          team_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          team_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          team_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_id_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_id_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      team_payments: {
        Row: {
          amount: number
          created_at: string
          id: number
          is_confirmed: boolean
          team_id: number
        }
        Insert: {
          amount: number
          created_at?: string
          id?: number
          is_confirmed?: boolean
          team_id: number
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          is_confirmed?: boolean
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "team_payments_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_removals: {
        Row: {
          created_at: string
          id: number
          is_confirmed: boolean
          team_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          team_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          team_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "remove_id_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "remove_id_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: number
          is_confirmed: boolean
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          name: string
          owner_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_edits: {
        Row: {
          created_at: string
          id: number
          is_confirmed: boolean
          new_authority: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          new_authority: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_confirmed?: boolean
          new_authority?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_edits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          user_id: string
          user_role: Database["public"]["Enums"]["user_role_types"]
        }
        Insert: {
          created_at?: string
          id?: number
          user_id: string
          user_role?: Database["public"]["Enums"]["user_role_types"]
        }
        Update: {
          created_at?: string
          id?: number
          user_id?: string
          user_role?: Database["public"]["Enums"]["user_role_types"]
        }
        Relationships: [
          {
            foreignKeyName: "staff_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_wallets: {
        Row: {
          authority: string
          created_at: string
          icon_url: string
          is_confirmed: boolean
          outstanding_balance: number
          user_id: string
          username: string
        }
        Insert: {
          authority: string
          created_at?: string
          icon_url: string
          is_confirmed?: boolean
          outstanding_balance?: number
          user_id: string
          username: string
        }
        Update: {
          authority?: string
          created_at?: string
          icon_url?: string
          is_confirmed?: boolean
          outstanding_balance?: number
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payment_schedules: "WEEKLY" | "BI_WEEKLY" | "MONTHLY"
      team_roles: "ADMIN" | "OWNER" | "MANAGER" | "MEMBER"
      user_role_types: "ADMIN" | "FOUNDER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
