import type { Tables } from '@/integrations/supabase/types';

export type DbProduct = Tables<'products'>;
export type DbCategory = Tables<'categories'>;

export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[] | null;
  short_description: string | null;
}
