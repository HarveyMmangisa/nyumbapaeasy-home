import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://feaqmofzcnbxegafzoiv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlYXFtb2Z6Y25ieGVnYWZ6b2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDIyODksImV4cCI6MjA4NDQ3ODI4OX0.I719t_Q38T9_NdBhOjsQSN2gRUb1_8g8QbEhbSv18q0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'client' | 'agent' | 'landlord' | 'admin'
          phone: string | null
          company: string | null
          license_number: string | null
          commission_rate: number | null
          bio: string | null
          website: string | null
          social_links: Record<string, any> | null
          total_properties_sold: number | null
          total_properties_rented: number | null
          average_rating: number | null
          is_active: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role: 'client' | 'agent' | 'landlord' | 'admin'
          phone?: string | null
          company?: string | null
          license_number?: string | null
          commission_rate?: number | null
          bio?: string | null
          website?: string | null
          social_links?: Record<string, any> | null
          total_properties_sold?: number | null
          total_properties_rented?: number | null
          average_rating?: number | null
          is_active?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'client' | 'agent' | 'landlord' | 'admin'
          phone?: string | null
          company?: string | null
          license_number?: string | null
          commission_rate?: number | null
          bio?: string | null
          website?: string | null
          social_links?: Record<string, any> | null
          total_properties_sold?: number | null
          total_properties_rented?: number | null
          average_rating?: number | null
          is_active?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          price_type: 'month' | 'week' | 'day' | 'sale'
          location: string
          latitude: number | null
          longitude: number | null
          bedrooms: number
          bathrooms: number
          area: number
          category: 'apartment' | 'residential' | 'commercial' | 'corporate' | 'bnb' | 'land'
          owner_id: string
          agent_id: string | null
          is_featured: boolean
          is_verified: boolean
          is_available: boolean
          rating: number
          total_reviews: number
          amenities: any[]
          images: string[]
          video_url: string | null
          virtual_tour_url: string | null
          year_built: number | null
          parking_spaces: number
          furnished: boolean
          pet_friendly: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          price_type: 'month' | 'week' | 'day' | 'sale'
          location: string
          latitude?: number | null
          longitude?: number | null
          bedrooms?: number
          bathrooms?: number
          area: number
          category: 'apartment' | 'residential' | 'commercial' | 'corporate' | 'bnb' | 'land'
          owner_id: string
          agent_id?: string | null
          is_featured?: boolean
          is_verified?: boolean
          is_available?: boolean
          rating?: number
          total_reviews?: number
          amenities?: any[]
          images?: string[]
          video_url?: string | null
          virtual_tour_url?: string | null
          year_built?: number | null
          parking_spaces?: number
          furnished?: boolean
          pet_friendly?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          price_type?: 'month' | 'week' | 'day' | 'sale'
          location?: string
          latitude?: number | null
          longitude?: number | null
          bedrooms?: number
          bathrooms?: number
          area?: number
          category?: 'apartment' | 'residential' | 'commercial' | 'corporate' | 'bnb' | 'land'
          owner_id?: string
          agent_id?: string | null
          is_featured?: boolean
          is_verified?: boolean
          is_available?: boolean
          rating?: number
          total_reviews?: number
          amenities?: any[]
          images?: string[]
          video_url?: string | null
          virtual_tour_url?: string | null
          year_built?: number | null
          parking_spaces?: number
          furnished?: boolean
          pet_friendly?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      property_inquiries: {
        Row: {
          id: string
          property_id: string
          name: string
          email: string
          phone: string
          message: string
          status: 'pending' | 'responded' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          name: string
          email: string
          phone: string
          message: string
          status?: 'pending' | 'responded' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          name?: string
          email?: string
          phone?: string
          message?: string
          status?: 'pending' | 'responded' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
      property_views: {
        Row: {
          id: string
          property_id: string
          ip_address: string
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          ip_address: string
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          ip_address?: string
          user_agent?: string | null
          created_at?: string
        }
      }
    }
  }
}