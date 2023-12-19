import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync(typeOrmConfig),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.getOrThrow<string>('db.database_url'),
        port: configService.getOrThrow<number>('db.database_port'),
        database: configService.getOrThrow<string>('db.database_name'),
        username: configService.getOrThrow<string>('db.database_username'),
        password: configService.getOrThrow<string>('db.database_password'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow<boolean>(
          'db.database_synchronize',
        ),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
