import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: configService.getOrThrow<string>('db.database_url'),
  port: configService.getOrThrow<number>('db.database_port'),
  database: configService.getOrThrow<string>('db.database_name'),
  username: configService.getOrThrow<string>('db.database_username'),
  password: configService.getOrThrow<string>('db.database_password'),
  autoLoadEntities: true,
  synchronize: configService.getOrThrow<boolean>('db.database_synchronize'),
  //     // entities: [__dirname+'/../src/**/*.entities{.ts,.js}']
};
