public: {
   Tables: {
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
     recipe_categories: {
       Row: {
         created_at: string
         id: string
         name: string
         parent_id: string | null
         slug: string
       }
       Insert: {
         created_at?: string
         id?: string
         name: string
         parent_id?: string | null
         slug: string
       }
       Update: {
         created_at?: string
         id?: string
         name?: string
         parent_id?: string | null
         slug?: string
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
         category_id: string | null
         cooking_time: number | null
         created_at: string
         cuisine_type: string | null
         description: string | null
         difficulty: string | null
         id: string
         image_url: string | null
         instructions: Json | null
         is_public: boolean | null
         is_verified: boolean | null
         servings: number | null
         title: string
         updated_at: string
         user_id: string | null
       }
       Insert: {
         category_id?: string | null
         cooking_time?: number | null
         created_at?: string
         cuisine_type?: string | null
         description?: string | null
         difficulty?: string | null
         id?: string
         image_url?: string | null
         instructions?: Json | null
         is_public?: boolean | null
         is_verified?: boolean | null
         servings?: number | null
         title: string
         updated_at?: string
         user_id?: string | null
       }
       Update: {
         category_id?: string | null
         cooking_time?: number | null
         created_at?: string
         cuisine_type?: string | null
         description?: string | null
         difficulty?: string | null
         id?: string
         image_url?: string | null
         instructions?: Json | null
         is_public?: boolean | null
         is_verified?: boolean | null
         servings?: number | null
         title?: string
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
     [_ in never]: never // Moved this line to the end
   }
   Views: {
     [_ in never]: never
