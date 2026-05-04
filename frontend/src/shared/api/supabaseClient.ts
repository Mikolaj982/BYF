import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database.types';

export const supabase = createClient<Database>(
    process.env.REACT_APP_SUPABASE_URL!,
    process.env.REACT_APP_SUPABASE_KEY!
)