import { Injectable } from '@nestjs/common';
import { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';

@Injectable()
export class DatabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = new SupabaseClient({});
  }
}
