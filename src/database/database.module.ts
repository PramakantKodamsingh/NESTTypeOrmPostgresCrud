import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService:ConfigService) => ({
                type:'postgres',
                host: configService.getOrThrow('POSTGRES_HOST'),
                port: parseInt(configService.getOrThrow('POSTGRES_PORT'), 10),
                username: configService.getOrThrow('POSTGRES_USER'),
                password: configService.getOrThrow('POSTGRES_PASSWORD'),
                database: configService.getOrThrow('POSTGRES_DB'),
                autoLoadEntities: true,
                synchronize: true, // Set to false in production         
        }),
        inject: [ConfigService],
    })
]
    
})
export class DatabaseModule {}
