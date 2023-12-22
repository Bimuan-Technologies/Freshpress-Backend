import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      datasources: {
        db: {
          url: configService.get<string>(
            'db.database_url',
          ),
        },
      },
    });
  }
  2;

  onModuleInit() {}

  onModuleDestroy() {}
}
