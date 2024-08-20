import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { TransferProductController } from 'src/infrastructure/controllers/transferProduct.controller'; 
import { TransferProductService } from 'src/domain/services/transferProduct.service';
import { PrismaTransferProductRepository } from 'src/infrastructure/prisma/prisma-transferProduct-repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Module({
    imports: [PrismaModule],
    controllers: [TransferProductController],
    providers: [
      TransferProductService,
      PrismaService,{
        provide: 'TransferProductRepository',
        useClass: PrismaTransferProductRepository,
    },
  ],
  exports: [TransferProductService],
})
export class TransferProductModule {}
