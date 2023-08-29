import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PongGateway } from './game'; // Import the PongGateway

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PongGateway], // Add PongGateway to the providers
})
export class AppModule {}
