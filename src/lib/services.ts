import { supabase } from './supabase'
import type { Database } from './supabase'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Property = Database['public']['Tables']['properties']['Row']
export type PropertyInquiry = Database['public']['Tables']['property_inquiries']['Row']

export interface AuthUser {
  id: string
  email?: string
  full_name?: string
  avatar_url?: string
  role?: 'client' | 'agent' | 'landlord' | 'admin'
}

// Auth functions
export const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const getUserProfile = async (userId: string): Promise<{ profile: Profile | null, error: any }> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { profile: data, error }
}

export const updateUserProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Property functions
export const getProperties = async (filters?: {
  category?: string
  price_type?: string
  bedrooms?: number
  bathrooms?: number
  is_featured?: boolean
  is_verified?: boolean
  min_price?: number
  max_price?: number
  search?: string
  limit?: number
  offset?: number
}) => {
  let query = supabase
    .from('properties')
    .select(`
      *,
      owner:profiles!properties_owner_id_fkey (
        id,
        full_name,
        company,
        avatar_url,
        role
      ),
      agent:profiles!properties_agent_id_fkey (
        id,
        full_name,
        company,
        avatar_url,
        role
      )
    `)
    .eq('is_available', true)
    .order('created_at', { ascending: false })

  if (filters) {
    if (filters.category) query = query.eq('category', filters.category)
    if (filters.price_type) query = query.eq('price_type', filters.price_type)
    if (filters.bedrooms) query = query.eq('bedrooms', filters.bedrooms)
    if (filters.bathrooms) query = query.eq('bathrooms', filters.bathrooms)
    if (filters.is_featured !== undefined) query = query.eq('is_featured', filters.is_featured)
    if (filters.is_verified !== undefined) query = query.eq('is_verified', filters.is_verified)
    if (filters.min_price) query = query.gte('price', filters.min_price)
    if (filters.max_price) query = query.lte('price', filters.max_price)
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,location.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }
    if (filters.limit) query = query.limit(filters.limit)
    if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)
  }

  const { data, error, count } = await query

  return { properties: data || [], error, count }
}

export const getProperty = async (id: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      owner:profiles!properties_owner_id_fkey (
        id,
        full_name,
        company,
        avatar_url,
        phone,
        email
      ),
      agent:profiles!properties_agent_id_fkey (
        id,
        full_name,
        company,
        avatar_url,
        phone,
        email
      )
    `)
    .eq('id', id)
    .single()

  return { property: data, error }
}

export const createProperty = async (property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single()

  return { data, error }
}

export const updateProperty = async (id: string, updates: Partial<Property>) => {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export const deleteProperty = async (id: string) => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)

  return { error }
}

// User's properties
export const getUserProperties = async (userId: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false })

  return { properties: data || [], error }
}

// Agent's properties
export const getAgentProperties = async (agentId: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false })

  return { properties: data || [], error }
}

// Property inquiries
export const createInquiry = async (inquiry: Omit<PropertyInquiry, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('property_inquiries')
    .insert(inquiry)
    .select()
    .single()

  return { data, error }
}

export const getInquiries = async (userId?: string, role?: string) => {
  let query = supabase
    .from('property_inquiries')
    .select(`
      *,
      property:properties (
        id,
        title,
        location,
        price,
        price_type,
        images
      )
    `)
    .order('created_at', { ascending: false })

  if (userId && role === 'landlord') {
    // Landlords can see inquiries for their properties
    query = query.in('property.owner_id', [userId])
  } else if (userId && role === 'agent') {
    // Agents can see inquiries for their assigned properties
    query = query.in('property.agent_id', [userId])
  } else if (role === 'admin') {
    // Admins can see all inquiries
    // No additional filter needed
  }

  const { data, error } = await query

  return { inquiries: data || [], error }
}

export const updateInquiryStatus = async (id: string, status: 'pending' | 'responded' | 'closed') => {
  const { data, error } = await supabase
    .from('property_inquiries')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

// Property views
export const trackPropertyView = async (propertyId: string, ipAddress: string, userAgent?: string) => {
  const { data, error } = await supabase
    .from('property_views')
    .insert({
      property_id: propertyId,
      ip_address: ipAddress,
      user_agent: userAgent
    })

  return { data, error }
}

// Get dashboard stats
export const getDashboardStats = async (userId: string, role: string) => {
  let stats = {}

  if (role === 'admin') {
    // Admin stats
    const [propertiesCount, usersCount, inquiriesCount] = await Promise.all([
      supabase.from('properties').select('id', { count: 'exact' }),
      supabase.from('profiles').select('id', { count: 'exact' }),
      supabase.from('property_inquiries').select('id', { count: 'exact' })
    ])

    stats = {
      totalProperties: propertiesCount.count || 0,
      totalUsers: usersCount.count || 0,
      totalInquiries: inquiriesCount.count || 0
    }
  } else if (role === 'agent') {
    // Agent stats
    const [agentProperties, agentInquiries] = await Promise.all([
      supabase.from('properties').select('id', { count: 'exact' }).eq('agent_id', userId),
      supabase.from('property_inquiries').select('id', { count: 'exact', head: true }).in('property.agent_id', [userId])
    ])

    stats = {
      myProperties: agentProperties.count || 0,
      myInquiries: agentInquiries.count || 0
    }
  } else if (role === 'landlord') {
    // Landlord stats
    const [ownerProperties, ownerInquiries, ownerViews] = await Promise.all([
      supabase.from('properties').select('id', { count: 'exact' }).eq('owner_id', userId),
      supabase.from('property_inquiries').select('id', { count: 'exact', head: true }).in('property.owner_id', [userId]),
      supabase.from('property_views').select('id', { count: 'exact', head: true }).in('property_id', (await supabase.from('properties').select('id').eq('owner_id', userId)).data?.map(p => p.id) || [])
    ])

    stats = {
      myProperties: ownerProperties.count || 0,
      myInquiries: ownerInquiries.count || 0,
      totalViews: ownerViews.count || 0
    }
  } else {
    // Client stats
    const { data: savedProperties } = await supabase
      .from('property_views')
      .select('property_id')
      .eq('user_agent', 'client_dashboard') // This would need to be adjusted for actual implementation

    stats = {
      viewedProperties: savedProperties?.length || 0
    }
  }

  return { stats, error: null }
}

// Real-time subscriptions
export const subscribeToProfileChanges = (userId: string, callback: (profile: Profile) => void) => {
  return supabase
    .channel('profile_changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'profiles', 
        filter: `user_id=eq.${userId}` 
      }, 
      (payload) => callback(payload.new as Profile)
    )
    .subscribe()
}

export const subscribeToPropertyChanges = (callback: (property: Property) => void) => {
  return supabase
    .channel('property_changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'properties' 
      }, 
      (payload) => callback(payload.new as Property)
    )
    .subscribe()
}