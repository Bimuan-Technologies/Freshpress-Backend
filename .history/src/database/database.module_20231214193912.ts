import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.getOrThrow<string>('db.database_url'),
        port: configService.getOrThrow<string>('db.database_port'),
        database: configService.getOrThrow<string>('db.database_name'),
        username: configService.getOrThrow('db.database_username'),
        password: configService.getOrThrow('db.database_password'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
