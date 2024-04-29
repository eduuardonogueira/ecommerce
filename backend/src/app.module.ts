import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategorysModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, CategorysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
