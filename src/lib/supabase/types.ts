export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _team_members: {
        Row: {
          created_at: string;
          is_confirmed: boolean;
          payment_amount: number;
          team_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          is_confirmed?: boolean;
          payment_amount?: number;
          team_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          is_confirmed?: boolean;
          payment_amount?: number;
          team_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "_team_members_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "_team_members_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "_team_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      ambassador_bounties: {
        Row: {
          announce_channel_id: string | null;
          claim_date: string | null;
          claimer_id: string | null;
          completed_date: string | null;
          completer_id: string | null;
          created_at: string;
          discord_invite: string | null;
          guild_name: string;
          id: number;
          is_broken: boolean;
          is_daily: boolean;
          is_new: boolean;
          requester_id: string | null;
          reward_amount: number | null;
          status: Database["public"]["Enums"]["bounty_status"];
          tag: Database["public"]["Enums"]["guild_tag"];
          twitter_icon: string | null;
          twitter_url: string | null;
        };
        Insert: {
          announce_channel_id?: string | null;
          claim_date?: string | null;
          claimer_id?: string | null;
          completed_date?: string | null;
          completer_id?: string | null;
          created_at?: string;
          discord_invite?: string | null;
          guild_name: string;
          id?: number;
          is_broken?: boolean;
          is_daily?: boolean;
          is_new?: boolean;
          requester_id?: string | null;
          reward_amount?: number | null;
          status?: Database["public"]["Enums"]["bounty_status"];
          tag?: Database["public"]["Enums"]["guild_tag"];
          twitter_icon?: string | null;
          twitter_url?: string | null;
        };
        Update: {
          announce_channel_id?: string | null;
          claim_date?: string | null;
          claimer_id?: string | null;
          completed_date?: string | null;
          completer_id?: string | null;
          created_at?: string;
          discord_invite?: string | null;
          guild_name?: string;
          id?: number;
          is_broken?: boolean;
          is_daily?: boolean;
          is_new?: boolean;
          requester_id?: string | null;
          reward_amount?: number | null;
          status?: Database["public"]["Enums"]["bounty_status"];
          tag?: Database["public"]["Enums"]["guild_tag"];
          twitter_icon?: string | null;
          twitter_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ambassador_bounties_claimer_id_fkey";
            columns: ["claimer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      claims: {
        Row: {
          amount: number;
          created_at: string;
          id: number;
          is_confirmed: boolean | null;
          transaction: string | null;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          id?: number;
          is_confirmed?: boolean | null;
          transaction?: string | null;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: number;
          is_confirmed?: boolean | null;
          transaction?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "withdraws_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      member_edits: {
        Row: {
          created_at: string;
          id: number;
          is_confirmed: boolean;
          new_payment_amount: number;
          team_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          new_payment_amount: number;
          team_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          new_payment_amount?: number;
          team_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "member_edits_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "member_edits_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "member_edits_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      payments: {
        Row: {
          amount: number;
          blockhash: string | null;
          created_at: string;
          id: number;
          is_confirmed: boolean | null;
          last_valid_block_height: number | null;
          memo: string | null;
          payer_id: string | null;
          team_id: number | null;
          transaction: string | null;
          user_id: string;
        };
        Insert: {
          amount: number;
          blockhash?: string | null;
          created_at?: string;
          id?: number;
          is_confirmed?: boolean | null;
          last_valid_block_height?: number | null;
          memo?: string | null;
          payer_id?: string | null;
          team_id?: number | null;
          transaction?: string | null;
          user_id: string;
        };
        Update: {
          amount?: number;
          blockhash?: string | null;
          created_at?: string;
          id?: number;
          is_confirmed?: boolean | null;
          last_valid_block_height?: number | null;
          memo?: string | null;
          payer_id?: string | null;
          team_id?: number | null;
          transaction?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_payer_id_fkey";
            columns: ["payer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_wallets";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "payments_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_wallets_view";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "payments_user_id_fkey2";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_wallets";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "payments_user_id_fkey2";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_wallets_view";
            referencedColumns: ["user_id"];
          }
        ];
      };
      team_bounties: {
        Row: {
          claimer_id: string | null;
          created_at: string;
          description: string | null;
          icon_url: string | null;
          id: number;
          reward_amount: number;
          team_id: number;
          title: string;
        };
        Insert: {
          claimer_id?: string | null;
          created_at?: string;
          description?: string | null;
          icon_url?: string | null;
          id?: number;
          reward_amount: number;
          team_id: number;
          title: string;
        };
        Update: {
          claimer_id?: string | null;
          created_at?: string;
          description?: string | null;
          icon_url?: string | null;
          id?: number;
          reward_amount?: number;
          team_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "team_bounties_claimer_id_fkey";
            columns: ["claimer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_bounties_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_bounties_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      team_invoices: {
        Row: {
          amount: number;
          created_at: string;
          id: number;
          is_confirmed: boolean;
          is_paid: boolean;
          memo: string;
          team_id: number;
          to_name: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          is_paid?: boolean;
          memo: string;
          team_id: number;
          to_name: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          is_paid?: boolean;
          memo?: string;
          team_id?: number;
          to_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "team_invoices_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_invoices_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      team_leaves: {
        Row: {
          created_at: string;
          id: number;
          is_confirmed: boolean;
          team_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          team_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          team_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leave_id_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "leave_id_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "leave_id_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      team_payments: {
        Row: {
          amount: number;
          created_at: string;
          id: number;
          is_confirmed: boolean;
          team_id: number;
        };
        Insert: {
          amount: number;
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          team_id: number;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          team_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "team_payments_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_payments_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      team_removals: {
        Row: {
          created_at: string;
          id: number;
          is_confirmed: boolean;
          team_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          team_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          team_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "remove_id_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "remove_id_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "remove_id_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      teams: {
        Row: {
          created_at: string;
          id: number;
          image_url: string | null;
          is_confirmed: boolean;
          name: string;
          owner_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_url?: string | null;
          is_confirmed?: boolean;
          name: string;
          owner_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_url?: string | null;
          is_confirmed?: boolean;
          name?: string;
          owner_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "teams_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_bonus: {
        Row: {
          created_at: string;
          id: number;
          is_paid: boolean;
          memo: string | null;
          pay_amount: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_paid?: boolean;
          memo?: string | null;
          pay_amount: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_paid?: boolean;
          memo?: string | null;
          pay_amount?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_bonus_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_edits: {
        Row: {
          created_at: string;
          id: number;
          is_confirmed: boolean;
          new_authority: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          new_authority: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_confirmed?: boolean;
          new_authority?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_edits_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_invoices: {
        Row: {
          amount: number;
          created_at: string;
          from_name: string;
          id: number;
          is_confirmed: boolean;
          is_paid: boolean;
          memo: string;
          to_name: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          from_name: string;
          id?: number;
          is_confirmed?: boolean;
          is_paid?: boolean;
          memo: string;
          to_name: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          from_name?: string;
          id?: number;
          is_confirmed?: boolean;
          is_paid?: boolean;
          memo?: string;
          to_name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_invoices_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_roles: {
        Row: {
          created_at: string;
          user_id: string;
          user_role: Database["public"]["Enums"]["user_role_types"];
        };
        Insert: {
          created_at?: string;
          user_id: string;
          user_role?: Database["public"]["Enums"]["user_role_types"];
        };
        Update: {
          created_at?: string;
          user_id?: string;
          user_role?: Database["public"]["Enums"]["user_role_types"];
        };
        Relationships: [
          {
            foreignKeyName: "staff_users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_wallets: {
        Row: {
          authority: string | null;
          created_at: string;
          icon_url: string | null;
          is_confirmed: boolean;
          transaction: string | null;
          user_id: string;
          username: string;
        };
        Insert: {
          authority?: string | null;
          created_at?: string;
          icon_url?: string | null;
          is_confirmed?: boolean;
          transaction?: string | null;
          user_id: string;
          username: string;
        };
        Update: {
          authority?: string | null;
          created_at?: string;
          icon_url?: string | null;
          is_confirmed?: boolean;
          transaction?: string | null;
          user_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      team_view: {
        Row: {
          id: number | null;
          image_url: string | null;
          name: string | null;
        };
        Insert: {
          id?: number | null;
          image_url?: string | null;
          name?: string | null;
        };
        Update: {
          id?: number | null;
          image_url?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      user_wallets_view: {
        Row: {
          icon_url: string | null;
          user_id: string | null;
          username: string | null;
        };
        Insert: {
          icon_url?: string | null;
          user_id?: string | null;
          username?: string | null;
        };
        Update: {
          icon_url?: string | null;
          user_id?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      get_total_confirmed_payments: {
        Args: {
          payment_user_id: string;
        };
        Returns: number;
      };
    };
    Enums: {
      bounty_status:
        | "REQUESTED"
        | "UNCLAIMED"
        | "CLAIMED"
        | "COMPLETED"
        | "AUDITED";
      guild_tag:
        | "SOL"
        | "ETH"
        | "BTC"
        | "POLY"
        | "APTOS"
        | "SUI"
        | "BASE"
        | "XRP"
        | "CARD"
        | "AVAX"
        | "COSM"
        | "NEAR"
        | "OBJKT"
        | "BNB"
        | "TEZOS"
        | "MULTI";
      payment_schedules: "WEEKLY" | "BI_WEEKLY" | "MONTHLY";
      team_roles: "ADMIN" | "OWNER" | "MANAGER" | "MEMBER";
      user_role_types: "ADMIN" | "FOUNDER" | "AMBASSADOR" | "NETWORK_LEAD";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
