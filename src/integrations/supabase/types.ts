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
      daily_challenges: {
        Row: {
          challenge_type: string
          created_at: string
          date: string
          description: string
          id: string
          is_active: boolean
          points: number
          title: string
          updated_at: string
        }
        Insert: {
          challenge_type: string
          created_at?: string
          date?: string
          description: string
          id?: string
          is_active?: boolean
          points?: number
          title: string
          updated_at?: string
        }
        Update: {
          challenge_type?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          is_active?: boolean
          points?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          recipe_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          recipe_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          recipe_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_url: string
          ingredient_name: string
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url: string
          ingredient_name: string
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          ingredient_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      ingredients: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      meal_plan_meals: {
        Row: {
          created_at: string
          id: string
          meal_plan_id: string | null
          meal_type: string
          recipe_id: string | null
          scheduled_time: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          meal_plan_id?: string | null
          meal_type: string
          recipe_id?: string | null
          scheduled_time?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          meal_plan_id?: string | null
          meal_type?: string
          recipe_id?: string | null
          scheduled_time?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plan_meals_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plan_meals_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          created_at: string
          date: string
          id: string
          meal_type: string | null
          notes: string | null
          recipe_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          meal_type?: string | null
          notes?: string | null
          recipe_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          meal_type?: string | null
          notes?: string | null
          recipe_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      pantry_items: {
        Row: {
          created_at: string
          expiry_date: string | null
          id: string
          ingredient_id: string | null
          quantity: number | null
          unit: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          ingredient_id?: string | null
          quantity?: number | null
          unit?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          ingredient_id?: string | null
          quantity?: number | null
          unit?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pantry_items_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          allergies: string[] | null
          avatar_url: string | null
          bio: string | null
          chef_avatar: string | null
          created_at: string
          cuisine_preferences: string[] | null
          dietary_preferences: string[] | null
          full_name: string | null
          id: string
          nutritional_goals: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          allergies?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          chef_avatar?: string | null
          created_at?: string
          cuisine_preferences?: string[] | null
          dietary_preferences?: string[] | null
          full_name?: string | null
          id?: string
          nutritional_goals?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          allergies?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          chef_avatar?: string | null
          created_at?: string
          cuisine_preferences?: string[] | null
          dietary_preferences?: string[] | null
          full_name?: string | null
          id?: string
          nutritional_goals?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recipe_approvals: {
        Row: {
          created_at: string
          id: string
          recipe_id: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          recipe_id?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          recipe_id?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_approvals_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_categories: {
        Row: {
          category: string | null
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          subcategory: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          subcategory?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          subcategory?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "recipe_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_ingredients: {
        Row: {
          created_at: string
          id: string
          ingredient_id: string | null
          quantity: number | null
          recipe_id: string | null
          unit: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_id?: string | null
          quantity?: number | null
          recipe_id?: string | null
          unit?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_id?: string | null
          quantity?: number | null
          recipe_id?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          calories: number | null
          carbs: number | null
          category_id: string | null
          cooking_time: number | null
          created_at: string
          cuisine_type: string | null
          description: string | null
          difficulty: string | null
          fat: number | null
          id: string
          image_url: string | null
          instructions: Json | null
          is_public: boolean | null
          is_published: boolean | null
          is_verified: boolean | null
          prep_time: number | null
          protein: number | null
          rating: number | null
          rating_count: number | null
          servings: number | null
          title: string
          total_time: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          category_id?: string | null
          cooking_time?: number | null
          created_at?: string
          cuisine_type?: string | null
          description?: string | null
          difficulty?: string | null
          fat?: number | null
          id?: string
          image_url?: string | null
          instructions?: Json | null
          is_public?: boolean | null
          is_published?: boolean | null
          is_verified?: boolean | null
          prep_time?: number | null
          protein?: number | null
          rating?: number | null
          rating_count?: number | null
          servings?: number | null
          title: string
          total_time?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          category_id?: string | null
          cooking_time?: number | null
          created_at?: string
          cuisine_type?: string | null
          description?: string | null
          difficulty?: string | null
          fat?: number | null
          id?: string
          image_url?: string | null
          instructions?: Json | null
          is_public?: boolean | null
          is_published?: boolean | null
          is_verified?: boolean | null
          prep_time?: number | null
          protein?: number | null
          rating?: number | null
          rating_count?: number | null
          servings?: number | null
          title?: string
          total_time?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "recipe_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          created_at: string
          id: string
          key: string
          language_code: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          language_code: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          language_code?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      user_challenges: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean
          progress: number
          updated_at: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean
          progress?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean
          progress?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          recipe_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          recipe_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          recipe_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
