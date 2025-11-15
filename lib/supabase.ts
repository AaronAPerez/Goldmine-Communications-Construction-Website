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
      accounts: {
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
            foreignKeyName: "accounts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_logs: {
        Row: {
          action: string
          createdAt: string
          description: string | null
          id: string
          metadata: Json | null
          projectId: string
          userId: string | null
        }
        Insert: {
          action: string
          createdAt?: string
          description?: string | null
          id: string
          metadata?: Json | null
          projectId: string
          userId?: string | null
        }
        Update: {
          action?: string
          createdAt?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          projectId?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics: {
        Row: {
          createdAt: string
          id: string
          metadata: Json | null
          metric: string
          timestamp: string
          type: Database["public"]["Enums"]["AnalyticsType"]
          value: number
        }
        Insert: {
          createdAt?: string
          id: string
          metadata?: Json | null
          metric: string
          timestamp: string
          type: Database["public"]["Enums"]["AnalyticsType"]
          value: number
        }
        Update: {
          createdAt?: string
          id?: string
          metadata?: Json | null
          metric?: string
          timestamp?: string
          type?: Database["public"]["Enums"]["AnalyticsType"]
          value?: number
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          createdAt: string
          id: string
          name: string
          postId: string
          slug: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          postId: string
          slug: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          postId?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_categories_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          authorId: string
          content: string
          createdAt: string
          excerpt: string | null
          featuredImage: string | null
          id: string
          publishedAt: string | null
          seoDescription: string | null
          seoTitle: string | null
          slug: string
          status: Database["public"]["Enums"]["ContentStatus"]
          title: string
          updatedAt: string
          views: number
        }
        Insert: {
          authorId: string
          content: string
          createdAt?: string
          excerpt?: string | null
          featuredImage?: string | null
          id: string
          publishedAt?: string | null
          seoDescription?: string | null
          seoTitle?: string | null
          slug: string
          status?: Database["public"]["Enums"]["ContentStatus"]
          title: string
          updatedAt: string
          views?: number
        }
        Update: {
          authorId?: string
          content?: string
          createdAt?: string
          excerpt?: string | null
          featuredImage?: string | null
          id?: string
          publishedAt?: string | null
          seoDescription?: string | null
          seoTitle?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["ContentStatus"]
          title?: string
          updatedAt?: string
          views?: number
        }
        Relationships: []
      }
      blog_tags: {
        Row: {
          createdAt: string
          id: string
          name: string
          postId: string
          slug: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          postId: string
          slug: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          postId?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_tags_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_allocations: {
        Row: {
          allocated: number
          budgetId: string
          category: Database["public"]["Enums"]["ExpenseCategory"]
          createdAt: string
          id: string
          remaining: number
          spent: number
          updatedAt: string
        }
        Insert: {
          allocated: number
          budgetId: string
          category: Database["public"]["Enums"]["ExpenseCategory"]
          createdAt?: string
          id: string
          remaining: number
          spent?: number
          updatedAt: string
        }
        Update: {
          allocated?: number
          budgetId?: string
          category?: Database["public"]["Enums"]["ExpenseCategory"]
          createdAt?: string
          id?: string
          remaining?: number
          spent?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_allocations_budgetId_fkey"
            columns: ["budgetId"]
            isOneToOne: false
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          createdAt: string
          id: string
          profitMargin: number | null
          projectId: string
          totalBudget: number
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          profitMargin?: number | null
          projectId: string
          totalBudget: number
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          profitMargin?: number | null
          projectId?: string
          totalBudget?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "budgets_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          category: Database["public"]["Enums"]["ProjectCategory"] | null
          createdAt: string
          description: string | null
          id: string
          isActive: boolean
          issuingBody: string | null
          name: string
          updatedAt: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["ProjectCategory"] | null
          createdAt?: string
          description?: string | null
          id: string
          isActive?: boolean
          issuingBody?: string | null
          name: string
          updatedAt: string
        }
        Update: {
          category?: Database["public"]["Enums"]["ProjectCategory"] | null
          createdAt?: string
          description?: string | null
          id?: string
          isActive?: boolean
          issuingBody?: string | null
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          city: string | null
          company: string | null
          country: string | null
          createdAt: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          state: string | null
          status: Database["public"]["Enums"]["ClientStatus"]
          updatedAt: string
          zipCode: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          createdAt?: string
          email?: string | null
          id: string
          name: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["ClientStatus"]
          updatedAt: string
          zipCode?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          createdAt?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["ClientStatus"]
          updatedAt?: string
          zipCode?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          createdAt: string
          id: string
          projectId: string
          updatedAt: string
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          id: string
          projectId: string
          updatedAt: string
          userId: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: string
          projectId?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communications: {
        Row: {
          content: string
          id: string
          leadId: string
          sentAt: string
          sentBy: string
          subject: string | null
          type: Database["public"]["Enums"]["CommunicationType"]
        }
        Insert: {
          content: string
          id: string
          leadId: string
          sentAt?: string
          sentBy: string
          subject?: string | null
          type: Database["public"]["Enums"]["CommunicationType"]
        }
        Update: {
          content?: string
          id?: string
          leadId?: string
          sentAt?: string
          sentBy?: string
          subject?: string | null
          type?: Database["public"]["Enums"]["CommunicationType"]
        }
        Relationships: [
          {
            foreignKeyName: "communications_leadId_fkey"
            columns: ["leadId"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      content_pages: {
        Row: {
          active: boolean
          category: Database["public"]["Enums"]["ProjectCategory"]
          content: string
          createdAt: string
          description: string | null
          features: string[] | null
          icon: string | null
          id: string
          image: string | null
          order: number
          seoDescription: string | null
          seoTitle: string | null
          slug: string
          title: string
          updatedAt: string
        }
        Insert: {
          active?: boolean
          category: Database["public"]["Enums"]["ProjectCategory"]
          content: string
          createdAt?: string
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id: string
          image?: string | null
          order?: number
          seoDescription?: string | null
          seoTitle?: string | null
          slug: string
          title: string
          updatedAt: string
        }
        Update: {
          active?: boolean
          category?: Database["public"]["Enums"]["ProjectCategory"]
          content?: string
          createdAt?: string
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          image?: string | null
          order?: number
          seoDescription?: string | null
          seoTitle?: string | null
          slug?: string
          title?: string
          updatedAt?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          category: string | null
          createdAt: string
          description: string | null
          id: string
          isAvailable: boolean
          model: string | null
          name: string
          serialNumber: string | null
          updatedAt: string
        }
        Insert: {
          category?: string | null
          createdAt?: string
          description?: string | null
          id: string
          isAvailable?: boolean
          model?: string | null
          name: string
          serialNumber?: string | null
          updatedAt: string
        }
        Update: {
          category?: string | null
          createdAt?: string
          description?: string | null
          id?: string
          isAvailable?: boolean
          model?: string | null
          name?: string
          serialNumber?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      equipment_usage: {
        Row: {
          createdAt: string
          endDate: string | null
          equipmentId: string
          hours: number | null
          id: string
          notes: string | null
          operatorId: string | null
          projectId: string
          startDate: string
        }
        Insert: {
          createdAt?: string
          endDate?: string | null
          equipmentId: string
          hours?: number | null
          id: string
          notes?: string | null
          operatorId?: string | null
          projectId: string
          startDate: string
        }
        Update: {
          createdAt?: string
          endDate?: string | null
          equipmentId?: string
          hours?: number | null
          id?: string
          notes?: string | null
          operatorId?: string | null
          projectId?: string
          startDate?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          approved: boolean
          approvedAt: string | null
          approvedBy: string | null
          budgetId: string
          category: Database["public"]["Enums"]["ExpenseCategory"]
          createdAt: string
          date: string
          description: string
          id: string
          receipt: string | null
          updatedAt: string
          vendor: string | null
        }
        Insert: {
          amount: number
          approved?: boolean
          approvedAt?: string | null
          approvedBy?: string | null
          budgetId: string
          category: Database["public"]["Enums"]["ExpenseCategory"]
          createdAt?: string
          date: string
          description: string
          id: string
          receipt?: string | null
          updatedAt: string
          vendor?: string | null
        }
        Update: {
          amount?: number
          approved?: boolean
          approvedAt?: string | null
          approvedBy?: string | null
          budgetId?: string
          category?: Database["public"]["Enums"]["ExpenseCategory"]
          createdAt?: string
          date?: string
          description?: string
          id?: string
          receipt?: string | null
          updatedAt?: string
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_budgetId_fkey"
            columns: ["budgetId"]
            isOneToOne: false
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          budgetId: string
          createdAt: string
          dueDate: string | null
          id: string
          invoiceNumber: string
          issuedDate: string | null
          notes: string | null
          paidDate: string | null
          pdfUrl: string | null
          status: Database["public"]["Enums"]["InvoiceStatus"]
          updatedAt: string
        }
        Insert: {
          amount: number
          budgetId: string
          createdAt?: string
          dueDate?: string | null
          id: string
          invoiceNumber: string
          issuedDate?: string | null
          notes?: string | null
          paidDate?: string | null
          pdfUrl?: string | null
          status?: Database["public"]["Enums"]["InvoiceStatus"]
          updatedAt: string
        }
        Update: {
          amount?: number
          budgetId?: string
          createdAt?: string
          dueDate?: string | null
          id?: string
          invoiceNumber?: string
          issuedDate?: string | null
          notes?: string | null
          paidDate?: string | null
          pdfUrl?: string | null
          status?: Database["public"]["Enums"]["InvoiceStatus"]
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_budgetId_fkey"
            columns: ["budgetId"]
            isOneToOne: false
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          address: Json | null
          assignedTo: string | null
          companyName: string | null
          createdAt: string
          email: string
          firstName: string
          id: string
          lastName: string
          lifetimeValue: number
          phone: string
          source: Database["public"]["Enums"]["LeadSource"]
          status: Database["public"]["Enums"]["LeadStatus"]
          type: Database["public"]["Enums"]["ClientType"]
          updatedAt: string
        }
        Insert: {
          address?: Json | null
          assignedTo?: string | null
          companyName?: string | null
          createdAt?: string
          email: string
          firstName: string
          id: string
          lastName: string
          lifetimeValue?: number
          phone: string
          source?: Database["public"]["Enums"]["LeadSource"]
          status?: Database["public"]["Enums"]["LeadStatus"]
          type?: Database["public"]["Enums"]["ClientType"]
          updatedAt: string
        }
        Update: {
          address?: Json | null
          assignedTo?: string | null
          companyName?: string | null
          createdAt?: string
          email?: string
          firstName?: string
          id?: string
          lastName?: string
          lifetimeValue?: number
          phone?: string
          source?: Database["public"]["Enums"]["LeadSource"]
          status?: Database["public"]["Enums"]["LeadStatus"]
          type?: Database["public"]["Enums"]["ClientType"]
          updatedAt?: string
        }
        Relationships: []
      }
      maintenance_records: {
        Row: {
          cost: number | null
          createdAt: string
          description: string
          documentUrl: string | null
          equipmentId: string
          id: string
          nextDueDate: string | null
          performedAt: string
          performedBy: string | null
          type: Database["public"]["Enums"]["MaintenanceType"]
          updatedAt: string
        }
        Insert: {
          cost?: number | null
          createdAt?: string
          description: string
          documentUrl?: string | null
          equipmentId: string
          id: string
          nextDueDate?: string | null
          performedAt: string
          performedBy?: string | null
          type: Database["public"]["Enums"]["MaintenanceType"]
          updatedAt: string
        }
        Update: {
          cost?: number | null
          createdAt?: string
          description?: string
          documentUrl?: string | null
          equipmentId?: string
          id?: string
          nextDueDate?: string | null
          performedAt?: string
          performedBy?: string | null
          type?: Database["public"]["Enums"]["MaintenanceType"]
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_records_equipmentId_fkey"
            columns: ["equipmentId"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          completedAt: string | null
          createdAt: string
          description: string | null
          dueDate: string
          id: string
          order: number
          phaseId: string | null
          projectId: string
          status: Database["public"]["Enums"]["MilestoneStatus"]
          title: string
          updatedAt: string
        }
        Insert: {
          completedAt?: string | null
          createdAt?: string
          description?: string | null
          dueDate: string
          id: string
          order?: number
          phaseId?: string | null
          projectId: string
          status?: Database["public"]["Enums"]["MilestoneStatus"]
          title: string
          updatedAt: string
        }
        Update: {
          completedAt?: string | null
          createdAt?: string
          description?: string | null
          dueDate?: string
          id?: string
          order?: number
          phaseId?: string | null
          projectId?: string
          status?: Database["public"]["Enums"]["MilestoneStatus"]
          title?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_phaseId_fkey"
            columns: ["phaseId"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestones_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string
          createdAt: string
          createdBy: string
          id: string
          leadId: string
          updatedAt: string
        }
        Insert: {
          content: string
          createdAt?: string
          createdBy: string
          id: string
          leadId: string
          updatedAt: string
        }
        Update: {
          content?: string
          createdAt?: string
          createdBy?: string
          id?: string
          leadId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_leadId_fkey"
            columns: ["leadId"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      project_certifications: {
        Row: {
          certificationId: string
          certNumber: string | null
          createdAt: string
          documentUrl: string | null
          expiryDate: string | null
          id: string
          issuedDate: string | null
          notes: string | null
          projectId: string
        }
        Insert: {
          certificationId: string
          certNumber?: string | null
          createdAt?: string
          documentUrl?: string | null
          expiryDate?: string | null
          id: string
          issuedDate?: string | null
          notes?: string | null
          projectId: string
        }
        Update: {
          certificationId?: string
          certNumber?: string | null
          createdAt?: string
          documentUrl?: string | null
          expiryDate?: string | null
          id?: string
          issuedDate?: string | null
          notes?: string | null
          projectId?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_certifications_certificationId_fkey"
            columns: ["certificationId"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_certifications_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_documents: {
        Row: {
          category: Database["public"]["Enums"]["DocumentCategory"]
          description: string | null
          fileSize: number | null
          id: string
          mimeType: string | null
          name: string
          projectId: string
          updatedAt: string
          uploadedAt: string
          url: string
          version: string
        }
        Insert: {
          category: Database["public"]["Enums"]["DocumentCategory"]
          description?: string | null
          fileSize?: number | null
          id: string
          mimeType?: string | null
          name: string
          projectId: string
          updatedAt: string
          uploadedAt?: string
          url: string
          version?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["DocumentCategory"]
          description?: string | null
          fileSize?: number | null
          id?: string
          mimeType?: string | null
          name?: string
          projectId?: string
          updatedAt?: string
          uploadedAt?: string
          url?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_documents_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_equipment: {
        Row: {
          createdAt: string
          endDate: string | null
          equipmentId: string
          id: string
          notes: string | null
          projectId: string
          quantity: number
          startDate: string | null
        }
        Insert: {
          createdAt?: string
          endDate?: string | null
          equipmentId: string
          id: string
          notes?: string | null
          projectId: string
          quantity?: number
          startDate?: string | null
        }
        Update: {
          createdAt?: string
          endDate?: string | null
          equipmentId?: string
          id?: string
          notes?: string | null
          projectId?: string
          quantity?: number
          startDate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_equipment_equipmentId_fkey"
            columns: ["equipmentId"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_equipment_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_images: {
        Row: {
          altText: string | null
          caption: string | null
          createdAt: string
          fileSize: number | null
          height: number | null
          id: string
          isPrimary: boolean
          mimeType: string | null
          order: number
          phase: string | null
          projectId: string
          thumbnailUrl: string | null
          updatedAt: string
          url: string
          width: number | null
        }
        Insert: {
          altText?: string | null
          caption?: string | null
          createdAt?: string
          fileSize?: number | null
          height?: number | null
          id: string
          isPrimary?: boolean
          mimeType?: string | null
          order?: number
          phase?: string | null
          projectId: string
          thumbnailUrl?: string | null
          updatedAt: string
          url: string
          width?: number | null
        }
        Update: {
          altText?: string | null
          caption?: string | null
          createdAt?: string
          fileSize?: number | null
          height?: number | null
          id?: string
          isPrimary?: boolean
          mimeType?: string | null
          order?: number
          phase?: string | null
          projectId?: string
          thumbnailUrl?: string | null
          updatedAt?: string
          url?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_images_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_phases: {
        Row: {
          createdAt: string
          description: string | null
          endDate: string | null
          id: string
          name: string
          order: number
          projectId: string
          startDate: string | null
          status: Database["public"]["Enums"]["PhaseStatus"]
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          endDate?: string | null
          id: string
          name: string
          order: number
          projectId: string
          startDate?: string | null
          status?: Database["public"]["Enums"]["PhaseStatus"]
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          endDate?: string | null
          id?: string
          name?: string
          order?: number
          projectId?: string
          startDate?: string | null
          status?: Database["public"]["Enums"]["PhaseStatus"]
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_phases_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_services: {
        Row: {
          createdAt: string
          id: string
          notes: string | null
          projectId: string
          serviceId: string
        }
        Insert: {
          createdAt?: string
          id: string
          notes?: string | null
          projectId: string
          serviceId: string
        }
        Update: {
          createdAt?: string
          id?: string
          notes?: string | null
          projectId?: string
          serviceId?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_services_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_services_serviceId_fkey"
            columns: ["serviceId"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tags: {
        Row: {
          createdAt: string
          id: string
          projectId: string
          tagId: string
        }
        Insert: {
          createdAt?: string
          id: string
          projectId: string
          tagId: string
        }
        Update: {
          createdAt?: string
          id?: string
          projectId?: string
          tagId?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tags_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tags_tagId_fkey"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actualCost: number | null
          actualEndDate: string | null
          actualStartDate: string | null
          address: string | null
          archivedAt: string | null
          category: Database["public"]["Enums"]["ProjectCategory"]
          city: string | null
          clientId: string | null
          createdAt: string
          description: string | null
          endDate: string | null
          estimatedBudget: number | null
          featured: boolean
          id: string
          latitude: number | null
          location: string | null
          longitude: number | null
          ownerId: string | null
          priority: Database["public"]["Enums"]["Priority"]
          progressPercent: number
          publishedAt: string | null
          richDescription: string | null
          slug: string
          startDate: string | null
          state: string | null
          status: Database["public"]["Enums"]["ProjectStatus"]
          title: string
          updatedAt: string
          zipCode: string | null
        }
        Insert: {
          actualCost?: number | null
          actualEndDate?: string | null
          actualStartDate?: string | null
          address?: string | null
          archivedAt?: string | null
          category: Database["public"]["Enums"]["ProjectCategory"]
          city?: string | null
          clientId?: string | null
          createdAt?: string
          description?: string | null
          endDate?: string | null
          estimatedBudget?: number | null
          featured?: boolean
          id: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          ownerId?: string | null
          priority?: Database["public"]["Enums"]["Priority"]
          progressPercent?: number
          publishedAt?: string | null
          richDescription?: string | null
          slug: string
          startDate?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["ProjectStatus"]
          title: string
          updatedAt: string
          zipCode?: string | null
        }
        Update: {
          actualCost?: number | null
          actualEndDate?: string | null
          actualStartDate?: string | null
          address?: string | null
          archivedAt?: string | null
          category?: Database["public"]["Enums"]["ProjectCategory"]
          city?: string | null
          clientId?: string | null
          createdAt?: string
          description?: string | null
          endDate?: string | null
          estimatedBudget?: number | null
          featured?: boolean
          id?: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          ownerId?: string | null
          priority?: Database["public"]["Enums"]["Priority"]
          progressPercent?: number
          publishedAt?: string | null
          richDescription?: string | null
          slug?: string
          startDate?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["ProjectStatus"]
          title?: string
          updatedAt?: string
          zipCode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_clientId_fkey"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_line_items: {
        Row: {
          description: string
          id: string
          order: number
          quantity: number
          quoteId: string
          total: number
          unitPrice: number
        }
        Insert: {
          description: string
          id: string
          order?: number
          quantity: number
          quoteId: string
          total: number
          unitPrice: number
        }
        Update: {
          description?: string
          id?: string
          order?: number
          quantity?: number
          quoteId?: string
          total?: number
          unitPrice?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_line_items_quoteId_fkey"
            columns: ["quoteId"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          createdAt: string
          createdBy: string
          description: string
          id: string
          leadId: string
          pdfUrl: string | null
          signedAt: string | null
          status: Database["public"]["Enums"]["QuoteStatus"]
          subtotal: number
          tax: number
          title: string
          total: number
          updatedAt: string
          validUntil: string
        }
        Insert: {
          createdAt?: string
          createdBy: string
          description: string
          id: string
          leadId: string
          pdfUrl?: string | null
          signedAt?: string | null
          status?: Database["public"]["Enums"]["QuoteStatus"]
          subtotal: number
          tax: number
          title: string
          total: number
          updatedAt: string
          validUntil: string
        }
        Update: {
          createdAt?: string
          createdBy?: string
          description?: string
          id?: string
          leadId?: string
          pdfUrl?: string | null
          signedAt?: string | null
          status?: Database["public"]["Enums"]["QuoteStatus"]
          subtotal?: number
          tax?: number
          title?: string
          total?: number
          updatedAt?: string
          validUntil?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_leadId_fkey"
            columns: ["leadId"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          active: boolean
          config: Json
          createdAt: string
          createdBy: string
          id: string
          lastRun: string | null
          name: string
          nextRun: string | null
          recipients: string[] | null
          schedule: string | null
          type: Database["public"]["Enums"]["ReportType"]
          updatedAt: string
        }
        Insert: {
          active?: boolean
          config: Json
          createdAt?: string
          createdBy: string
          id: string
          lastRun?: string | null
          name: string
          nextRun?: string | null
          recipients?: string[] | null
          schedule?: string | null
          type: Database["public"]["Enums"]["ReportType"]
          updatedAt: string
        }
        Update: {
          active?: boolean
          config?: Json
          createdAt?: string
          createdBy?: string
          id?: string
          lastRun?: string | null
          name?: string
          nextRun?: string | null
          recipients?: string[] | null
          schedule?: string | null
          type?: Database["public"]["Enums"]["ReportType"]
          updatedAt?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category: Database["public"]["Enums"]["ProjectCategory"]
          createdAt: string
          description: string | null
          icon: string | null
          id: string
          isActive: boolean
          name: string
          updatedAt: string
        }
        Insert: {
          category: Database["public"]["Enums"]["ProjectCategory"]
          createdAt?: string
          description?: string | null
          icon?: string | null
          id: string
          isActive?: boolean
          name: string
          updatedAt: string
        }
        Update: {
          category?: Database["public"]["Enums"]["ProjectCategory"]
          createdAt?: string
          description?: string | null
          icon?: string | null
          id?: string
          isActive?: boolean
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      sessions: {
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
            foreignKeyName: "sessions_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      social_analytics: {
        Row: {
          clicks: number
          comments: number
          engagement: number
          id: string
          impressions: number
          likes: number
          postId: string
          reach: number
          shares: number
          updatedAt: string
        }
        Insert: {
          clicks?: number
          comments?: number
          engagement?: number
          id: string
          impressions?: number
          likes?: number
          postId: string
          reach?: number
          shares?: number
          updatedAt: string
        }
        Update: {
          clicks?: number
          comments?: number
          engagement?: number
          id?: string
          impressions?: number
          likes?: number
          postId?: string
          reach?: number
          shares?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_analytics_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      social_media: {
        Row: {
          altText: string | null
          createdAt: string
          id: string
          order: number
          postId: string
          type: Database["public"]["Enums"]["MediaType"]
          url: string
        }
        Insert: {
          altText?: string | null
          createdAt?: string
          id: string
          order?: number
          postId: string
          type: Database["public"]["Enums"]["MediaType"]
          url: string
        }
        Update: {
          altText?: string | null
          createdAt?: string
          id?: string
          order?: number
          postId?: string
          type?: Database["public"]["Enums"]["MediaType"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_media_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      social_posts: {
        Row: {
          content: string
          createdAt: string
          createdBy: string
          facebookPostId: string | null
          hashtags: string[] | null
          id: string
          instagramPostId: string | null
          linkedinPostId: string | null
          platforms: Database["public"]["Enums"]["Platform"][] | null
          projectId: string | null
          publishedAt: string | null
          scheduledFor: string | null
          status: Database["public"]["Enums"]["PostStatus"]
          twitterPostId: string | null
          updatedAt: string
        }
        Insert: {
          content: string
          createdAt?: string
          createdBy: string
          facebookPostId?: string | null
          hashtags?: string[] | null
          id: string
          instagramPostId?: string | null
          linkedinPostId?: string | null
          platforms?: Database["public"]["Enums"]["Platform"][] | null
          projectId?: string | null
          publishedAt?: string | null
          scheduledFor?: string | null
          status?: Database["public"]["Enums"]["PostStatus"]
          twitterPostId?: string | null
          updatedAt: string
        }
        Update: {
          content?: string
          createdAt?: string
          createdBy?: string
          facebookPostId?: string | null
          hashtags?: string[] | null
          id?: string
          instagramPostId?: string | null
          linkedinPostId?: string | null
          platforms?: Database["public"]["Enums"]["Platform"][] | null
          projectId?: string | null
          publishedAt?: string | null
          scheduledFor?: string | null
          status?: Database["public"]["Enums"]["PostStatus"]
          twitterPostId?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          createdAt: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          createdAt?: string
          id: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          createdAt?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          createdAt: string
          endDate: string | null
          id: string
          isActive: boolean
          projectId: string
          role: string
          startDate: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          endDate?: string | null
          id: string
          isActive?: boolean
          projectId: string
          role: string
          startDate?: string
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          endDate?: string | null
          id?: string
          isActive?: boolean
          projectId?: string
          role?: string
          startDate?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          approved: boolean
          clientName: string
          clientTitle: string | null
          company: string | null
          content: string
          createdAt: string
          featured: boolean
          id: string
          photo: string | null
          platforms: string[] | null
          projectId: string | null
          rating: number
          updatedAt: string
        }
        Insert: {
          approved?: boolean
          clientName: string
          clientTitle?: string | null
          company?: string | null
          content: string
          createdAt?: string
          featured?: boolean
          id: string
          photo?: string | null
          platforms?: string[] | null
          projectId?: string | null
          rating?: number
          updatedAt: string
        }
        Update: {
          approved?: boolean
          clientName?: string
          clientTitle?: string | null
          company?: string | null
          content?: string
          createdAt?: string
          featured?: boolean
          id?: string
          photo?: string | null
          platforms?: string[] | null
          projectId?: string | null
          rating?: number
          updatedAt?: string
        }
        Relationships: []
      }
      users: {
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
      verification_tokens: {
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
      AnalyticsType:
        | "WEBSITE_TRAFFIC"
        | "LEAD_CONVERSION"
        | "PROJECT_COMPLETION"
        | "REVENUE"
        | "SOCIAL_ENGAGEMENT"
        | "MARKETING_CAMPAIGN"
      ClientStatus: "ACTIVE" | "INACTIVE" | "PROSPECT"
      ClientType: "RESIDENTIAL" | "COMMERCIAL" | "GOVERNMENT" | "INDUSTRIAL"
      CommunicationType: "EMAIL" | "PHONE" | "SMS" | "MEETING" | "NOTE"
      ContentStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED"
      DocumentCategory:
        | "CONTRACT"
        | "PLAN"
        | "SPECIFICATION"
        | "CHANGE_ORDER"
        | "INSPECTION_REPORT"
        | "PHOTO"
        | "FINAL_DELIVERABLE"
        | "PERMIT"
        | "CERTIFICATION"
        | "OTHER"
      ExpenseCategory:
        | "LABOR"
        | "MATERIALS"
        | "EQUIPMENT"
        | "SUBCONTRACTORS"
        | "PERMITS"
        | "INSURANCE"
        | "OVERHEAD"
        | "OTHER"
      InvoiceStatus: "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED"
      LeadSource:
        | "WEBSITE"
        | "REFERRAL"
        | "SOCIAL_MEDIA"
        | "COLD_OUTREACH"
        | "REPEAT_CLIENT"
        | "ADVERTISEMENT"
        | "OTHER"
      LeadStatus:
        | "NEW"
        | "CONTACTED"
        | "QUALIFIED"
        | "PROPOSAL_SENT"
        | "NEGOTIATION"
        | "WON"
        | "LOST"
      MaintenanceType: "PREVENTIVE" | "REPAIR" | "INSPECTION" | "UPGRADE"
      MediaType: "IMAGE" | "VIDEO" | "GIF"
      MilestoneStatus:
        | "PENDING"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "OVERDUE"
        | "CANCELLED"
      PhaseStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELAYED"
      Platform: "FACEBOOK" | "INSTAGRAM" | "LINKEDIN" | "TWITTER"
      PostStatus: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "FAILED"
      Priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
      ProjectCategory: "COMMUNICATIONS" | "CONSTRUCTION" | "BOTH"
      ProjectStatus:
        | "DRAFT"
        | "PLANNING"
        | "ACTIVE"
        | "ON_HOLD"
        | "COMPLETED"
        | "ARCHIVED"
        | "CANCELLED"
      QuoteStatus:
        | "DRAFT"
        | "SENT"
        | "VIEWED"
        | "ACCEPTED"
        | "REJECTED"
        | "EXPIRED"
      ReportType:
        | "PROJECT_SUMMARY"
        | "FINANCIAL"
        | "SOCIAL_MEDIA"
        | "LEAD_PIPELINE"
        | "CUSTOM"
      UserRole:
        | "SUPER_ADMIN"
        | "ADMIN"
        | "PROJECT_MANAGER"
        | "MARKETING"
        | "FINANCE"
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
      AnalyticsType: [
        "WEBSITE_TRAFFIC",
        "LEAD_CONVERSION",
        "PROJECT_COMPLETION",
        "REVENUE",
        "SOCIAL_ENGAGEMENT",
        "MARKETING_CAMPAIGN",
      ],
      ClientStatus: ["ACTIVE", "INACTIVE", "PROSPECT"],
      ClientType: ["RESIDENTIAL", "COMMERCIAL", "GOVERNMENT", "INDUSTRIAL"],
      CommunicationType: ["EMAIL", "PHONE", "SMS", "MEETING", "NOTE"],
      ContentStatus: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      DocumentCategory: [
        "CONTRACT",
        "PLAN",
        "SPECIFICATION",
        "CHANGE_ORDER",
        "INSPECTION_REPORT",
        "PHOTO",
        "FINAL_DELIVERABLE",
        "PERMIT",
        "CERTIFICATION",
        "OTHER",
      ],
      ExpenseCategory: [
        "LABOR",
        "MATERIALS",
        "EQUIPMENT",
        "SUBCONTRACTORS",
        "PERMITS",
        "INSURANCE",
        "OVERHEAD",
        "OTHER",
      ],
      InvoiceStatus: ["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"],
      LeadSource: [
        "WEBSITE",
        "REFERRAL",
        "SOCIAL_MEDIA",
        "COLD_OUTREACH",
        "REPEAT_CLIENT",
        "ADVERTISEMENT",
        "OTHER",
      ],
      LeadStatus: [
        "NEW",
        "CONTACTED",
        "QUALIFIED",
        "PROPOSAL_SENT",
        "NEGOTIATION",
        "WON",
        "LOST",
      ],
      MaintenanceType: ["PREVENTIVE", "REPAIR", "INSPECTION", "UPGRADE"],
      MediaType: ["IMAGE", "VIDEO", "GIF"],
      MilestoneStatus: [
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED",
        "OVERDUE",
        "CANCELLED",
      ],
      PhaseStatus: ["PENDING", "IN_PROGRESS", "COMPLETED", "DELAYED"],
      Platform: ["FACEBOOK", "INSTAGRAM", "LINKEDIN", "TWITTER"],
      PostStatus: ["DRAFT", "SCHEDULED", "PUBLISHED", "FAILED"],
      Priority: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      ProjectCategory: ["COMMUNICATIONS", "CONSTRUCTION", "BOTH"],
      ProjectStatus: [
        "DRAFT",
        "PLANNING",
        "ACTIVE",
        "ON_HOLD",
        "COMPLETED",
        "ARCHIVED",
        "CANCELLED",
      ],
      QuoteStatus: [
        "DRAFT",
        "SENT",
        "VIEWED",
        "ACCEPTED",
        "REJECTED",
        "EXPIRED",
      ],
      ReportType: [
        "PROJECT_SUMMARY",
        "FINANCIAL",
        "SOCIAL_MEDIA",
        "LEAD_PIPELINE",
        "CUSTOM",
      ],
      UserRole: [
        "SUPER_ADMIN",
        "ADMIN",
        "PROJECT_MANAGER",
        "MARKETING",
        "FINANCE",
        "VIEWER",
      ],
    },
  },
} as const
