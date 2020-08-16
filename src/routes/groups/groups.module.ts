import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { AuthModule } from 'src/routes/auth/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule {}
