export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string;
          actor_id: string | null;
          created_at: string | null;
          id: string;
          payload: Json | null;
          target_id: string | null;
          target_table: string | null;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          created_at?: string | null;
          id?: string;
          payload?: Json | null;
          target_id?: string | null;
          target_table?: string | null;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          created_at?: string | null;
          id?: string;
          payload?: Json | null;
          target_id?: string | null;
          target_table?: string | null;
        };
        Relationships: [];
      };
      bonus_points: {
        Row: {
          created_at: string | null;
          id: string;
          points: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          points?: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          points?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          parent_id: string | null;
          slug: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          parent_id?: string | null;
          slug: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          parent_id?: string | null;
          slug?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_parent_id_fkey';
            columns: ['parent_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      inventory: {
        Row: {
          product_id: string;
          quantity: number;
          reservation_expires_at: string | null;
          reserved_quantity: number;
          warehouse_id: string;
        };
        Insert: {
          product_id: string;
          quantity?: number;
          reservation_expires_at?: string | null;
          reserved_quantity?: number;
          warehouse_id: string;
        };
        Update: {
          product_id?: string;
          quantity?: number;
          reservation_expires_at?: string | null;
          reserved_quantity?: number;
          warehouse_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'inventory_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'inventory_warehouse_id_fkey';
            columns: ['warehouse_id'];
            isOneToOne: false;
            referencedRelation: 'warehouses';
            referencedColumns: ['id'];
          },
        ];
      };
      order_items: {
        Row: {
          created_at: string | null;
          id: string;
          order_id: string;
          price: number;
          product_id: string;
          quantity: number;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          order_id: string;
          price: number;
          product_id: string;
          quantity: number;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          order_id?: string;
          price?: number;
          product_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
      orders: {
        Row: {
          bonus_points_used: number | null;
          created_at: string | null;
          currency: string;
          guest_email: string | null;
          guest_phone: string | null;
          id: string;
          promo_code_id: string | null;
          shipping_address: Json | null;
          status: Database['public']['Enums']['order_status'];
          total_amount: number;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          bonus_points_used?: number | null;
          created_at?: string | null;
          currency: string;
          guest_email?: string | null;
          guest_phone?: string | null;
          id?: string;
          promo_code_id?: string | null;
          shipping_address?: Json | null;
          status?: Database['public']['Enums']['order_status'];
          total_amount: number;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          bonus_points_used?: number | null;
          created_at?: string | null;
          currency?: string;
          guest_email?: string | null;
          guest_phone?: string | null;
          id?: string;
          promo_code_id?: string | null;
          shipping_address?: Json | null;
          status?: Database['public']['Enums']['order_status'];
          total_amount?: number;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_promo_code_id_fkey';
            columns: ['promo_code_id'];
            isOneToOne: false;
            referencedRelation: 'promo_codes';
            referencedColumns: ['id'];
          },
        ];
      };
      product_visibility: {
        Row: {
          product_id: string;
          region_id: string;
        };
        Insert: {
          product_id: string;
          region_id: string;
        };
        Update: {
          product_id?: string;
          region_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'product_visibility_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'product_visibility_region_id_fkey';
            columns: ['region_id'];
            isOneToOne: false;
            referencedRelation: 'regions';
            referencedColumns: ['id'];
          },
        ];
      };
      products: {
        Row: {
          category_id: string | null;
          created_at: string | null;
          description: Json | null;
          id: string;
          name: Json;
          price_eur: number;
          price_uah: number;
          price_usd: number;
          sku: string;
          slug: Json;
          updated_at: string | null;
          vat_rate: number;
          visible: boolean | null;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string | null;
          description?: Json | null;
          id?: string;
          name: Json;
          price_eur: number;
          price_uah: number;
          price_usd: number;
          sku: string;
          slug: Json;
          updated_at?: string | null;
          vat_rate: number;
          visible?: boolean | null;
        };
        Update: {
          category_id?: string | null;
          created_at?: string | null;
          description?: Json | null;
          id?: string;
          name?: Json;
          price_eur?: number;
          price_uah?: number;
          price_usd?: number;
          sku?: string;
          slug?: Json;
          updated_at?: string | null;
          vat_rate?: number;
          visible?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      promo_codes: {
        Row: {
          code: string;
          created_at: string | null;
          discount_type: Database['public']['Enums']['discount_type'];
          expires_at: string | null;
          id: string;
          max_uses: number | null;
          min_order_amount: number | null;
          updated_at: string | null;
          used_count: number | null;
          value: number;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          discount_type: Database['public']['Enums']['discount_type'];
          expires_at?: string | null;
          id?: string;
          max_uses?: number | null;
          min_order_amount?: number | null;
          updated_at?: string | null;
          used_count?: number | null;
          value: number;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          discount_type?: Database['public']['Enums']['discount_type'];
          expires_at?: string | null;
          id?: string;
          max_uses?: number | null;
          min_order_amount?: number | null;
          updated_at?: string | null;
          used_count?: number | null;
          value?: number;
        };
        Relationships: [];
      };
      regions: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      warehouses: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          region_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          region_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          region_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'warehouses_region_id_fkey';
            columns: ['region_id'];
            isOneToOne: false;
            referencedRelation: 'regions';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_guest_order: {
        Args: { guest_email: string; guest_phone: string; order_items: Json };
        Returns: string;
      };
      get_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      discount_type: 'percentage' | 'fixed_amount' | 'bogo';
      order_status:
        | 'pending'
        | 'processing'
        | 'shipped'
        | 'delivered'
        | 'cancelled'
        | 'refunded';
      user_role: 'admin' | 'manager' | 'user';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      discount_type: ['percentage', 'fixed_amount', 'bogo'],
      order_status: [
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
      ],
      user_role: ['admin', 'manager', 'user'],
    },
  },
} as const;
