export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Account: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id: string
          id_token?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId: string
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Client: {
        Row: {
          address: Json
          alternatePhone: string | null
          assignedToId: string
          companyName: string | null
          createdAt: string
          email: string
          firstName: string
          id: string
          lastName: string
          lifetimeValue: number
          phone: string
          source: Database["public"]["Enums"]["LeadSource"]
          status: Database["public"]["Enums"]["ClientStatus"]
          type: Database["public"]["Enums"]["ClientType"]
          updatedAt: string
        }
        Insert: {
          address: Json
          alternatePhone?: string | null
          assignedToId: string
          companyName?: string | null
          createdAt?: string
          email: string
          firstName: string
          id: string
          lastName: string
          lifetimeValue?: number
          phone: string
          source: Database["public"]["Enums"]["LeadSource"]
          status: Database["public"]["Enums"]["ClientStatus"]
          type: Database["public"]["Enums"]["ClientType"]
          updatedAt: string
        }
        Update: {
          address?: Json
          alternatePhone?: string | null
          assignedToId?: string
          companyName?: string | null
          createdAt?: string
          email?: string
          firstName?: string
          id?: string
          lastName?: string
          lifetimeValue?: number
          phone?: string
          source?: Database["public"]["Enums"]["LeadSource"]
          status?: Database["public"]["Enums"]["ClientStatus"]
          type?: Database["public"]["Enums"]["ClientType"]
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Client_assignedToId_fkey"
            columns: ["assignedToId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Note: {
        Row: {
          clientId: string | null
          content: string
          createdAt: string
          createdBy: string
          id: string
          pinned: boolean
          projectId: string | null
          updatedAt: string
        }
        Insert: {
          clientId?: string | null
          content: string
          createdAt?: string
          createdBy: string
          id: string
          pinned?: boolean
          projectId?: string | null
          updatedAt: string
        }
        Update: {
          clientId?: string | null
          content?: string
          createdAt?: string
          createdBy?: string
          id?: string
          pinned?: boolean
          projectId?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Note_clientId_fkey"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "Client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Note_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Note_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "Project"
            referencedColumns: ["id"]
          },
        ]
      }
      Project: {
        Row: {
          actualCost: number | null
          blueprintUrl: string | null
          budgetAmount: number | null
          category: Database["public"]["Enums"]["ProjectCategory"]
          clientId: string
          createdAt: string
          description: string
          endDate: string | null
          estimatedEndDate: string | null
          featured: boolean
          id: string
          location: Json
          managerId: string
          priority: Database["public"]["Enums"]["ProjectPriority"]
          publishedAt: string | null
          seoDescription: string | null
          seoTitle: string | null
          services: string[] | null
          slug: string
          startDate: string
          status: Database["public"]["Enums"]["ProjectStatus"]
          tags: string[] | null
          title: string
          updatedAt: string
        }
        Insert: {
          actualCost?: number | null
          blueprintUrl?: string | null
          budgetAmount?: number | null
          category: Database["public"]["Enums"]["ProjectCategory"]
          clientId: string
          createdAt?: string
          description: string
          endDate?: string | null
          estimatedEndDate?: string | null
          featured?: boolean
          id: string
          location: Json
          managerId: string
          priority?: Database["public"]["Enums"]["ProjectPriority"]
          publishedAt?: string | null
          seoDescription?: string | null
          seoTitle?: string | null
          services?: string[] | null
          slug: string
          startDate: string
          status?: Database["public"]["Enums"]["ProjectStatus"]
          tags?: string[] | null
          title: string
          updatedAt: string
        }
        Update: {
          actualCost?: number | null
          blueprintUrl?: string | null
          budgetAmount?: number | null
          category?: Database["public"]["Enums"]["ProjectCategory"]
          clientId?: string
          createdAt?: string
          description?: string
          endDate?: string | null
          estimatedEndDate?: string | null
          featured?: boolean
          id?: string
          location?: Json
          managerId?: string
          priority?: Database["public"]["Enums"]["ProjectPriority"]
          publishedAt?: string | null
          seoDescription?: string | null
          seoTitle?: string | null
          services?: string[] | null
          slug?: string
          startDate?: string
          status?: Database["public"]["Enums"]["ProjectStatus"]
          tags?: string[] | null
          title?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Project_clientId_fkey"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "Client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Project_managerId_fkey"
            columns: ["managerId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      ProjectImage: {
        Row: {
          altText: string | null
          caption: string | null
          createdAt: string
          featured: boolean
          height: number | null
          id: string
          order: number
          projectId: string
          url: string
          width: number | null
        }
        Insert: {
          altText?: string | null
          caption?: string | null
          createdAt?: string
          featured?: boolean
          height?: number | null
          id: string
          order?: number
          projectId: string
          url: string
          width?: number | null
        }
        Update: {
          altText?: string | null
          caption?: string | null
          createdAt?: string
          featured?: boolean
          height?: number | null
          id?: string
          order?: number
          projectId?: string
          url?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ProjectImage_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "Project"
            referencedColumns: ["id"]
          },
        ]
      }
      Session: {
        Row: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Insert: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Update: {
          expires?: string
          id?: string
          sessionToken?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Session_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          active: boolean
          createdAt: string
          department: string | null
          email: string
          emailVerified: string | null
          id: string
          image: string | null
          name: string | null
          password: string | null
          phone: string | null
          role: Database["public"]["Enums"]["UserRole"]
          updatedAt: string
        }
        Insert: {
          active?: boolean
          createdAt?: string
          department?: string | null
          email: string
          emailVerified?: string | null
          id: string
          image?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["UserRole"]
          updatedAt: string
        }
        Update: {
          active?: boolean
          createdAt?: string
          department?: string | null
          email?: string
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["UserRole"]
          updatedAt?: string
        }
        Relationships: []
      }
      VerificationToken: {
        Row: {
          expires: string
          identifier: string
          token: string
        }
        Insert: {
          expires: string
          identifier: string
          token: string
        }
        Update: {
          expires?: string
          identifier?: string
          token?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ClientStatus:
        | "LEAD"
        | "CONTACTED"
        | "QUALIFIED"
        | "PROPOSAL_SENT"
        | "ACTIVE_CLIENT"
        | "COMPLETED"
        | "LOST"
      ClientType: "RESIDENTIAL" | "COMMERCIAL" | "GOVERNMENT" | "INDUSTRIAL"
      LeadSource:
        | "WEBSITE"
        | "REFERRAL"
        | "SOCIAL_MEDIA"
        | "COLD_OUTREACH"
        | "REPEAT_CLIENT"
        | "OTHER"
      ProjectCategory: "COMMUNICATIONS" | "CONSTRUCTION" | "BOTH"
      ProjectPriority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
      ProjectStatus:
        | "DRAFT"
        | "PLANNING"
        | "ACTIVE"
        | "ON_HOLD"
        | "COMPLETED"
        | "ARCHIVED"
        | "CANCELLED"
      UserRole:
        | "SUPER_ADMIN"
        | "ADMIN"
        | "PROJECT_MANAGER"
        | "MARKETING"
        | "FINANCE"
        | "FIELD_TECH"
        | "VIEWER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      ClientStatus: [
        "LEAD",
        "CONTACTED",
        "QUALIFIED",
        "PROPOSAL_SENT",
        "ACTIVE_CLIENT",
        "COMPLETED",
        "LOST",
      ],
      ClientType: ["RESIDENTIAL", "COMMERCIAL", "GOVERNMENT", "INDUSTRIAL"],
      LeadSource: [
        "WEBSITE",
        "REFERRAL",
        "SOCIAL_MEDIA",
        "COLD_OUTREACH",
        "REPEAT_CLIENT",
        "OTHER",
      ],
      ProjectCategory: ["COMMUNICATIONS", "CONSTRUCTION", "BOTH"],
      ProjectPriority: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      ProjectStatus: [
        "DRAFT",
        "PLANNING",
        "ACTIVE",
        "ON_HOLD",
        "COMPLETED",
        "ARCHIVED",
        "CANCELLED",
      ],
      UserRole: [
        "SUPER_ADMIN",
        "ADMIN",
        "PROJECT_MANAGER",
        "MARKETING",
        "FINANCE",
        "FIELD_TECH",
        "VIEWER",
      ],
    },
  },
} as const
