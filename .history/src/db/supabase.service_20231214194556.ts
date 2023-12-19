// import { Injectable } from '@nestjs/common';
// import { SupabaseClient } from '@supabase/supabase-js';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class DatabaseService {

//     constructor(
//         private readonly configService: ConfigService,
//         private readonly supabase: SupabaseClient;
//   ) {
//       this.supabase = new SupabaseClient({
//           url: this.configService.get<string>('supabase.supabase_url'),
//           key: this.configService.get<kstring>('supabase.key'),
//     });
//     }

//     // Fetching data from a table
// // const { data, error } = await this.supabase.from('users').select('*');

// // // Inserting data into a table
// // const { data, error } = await this.supabase.from('products').insert({
// //   name: 'My product',
// //   price: 10.00,
// // });
// }
