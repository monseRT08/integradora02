import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { GoodsEntry } from "src/domain/entities/goodsEntry.entity";

@Injectable()
export class PrismaGoodsEntryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(productId: number, entry: GoodsEntry): Promise<GoodsEntry | null> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    })
    if(!product) {
      throw new BadRequestException('No se encontró el producto')
    }

    const newEntry = await this.prisma.goodsEntry.create({
      data: {
        date: entry.date,
        quantity: entry.quantity,
        color: entry.color,        
        folio: entry.folio,
        observation: entry.observation,
        origin: entry.origin,
        driver: entry.driver,
        assistant: entry.assistant,
        reciveBy: entry.reciveBy,
        entryTime: entry.entryTime,
        productId: entry.productId,
        userId: entry.userId
      },
    });
    return new GoodsEntry(
      newEntry.date,
      newEntry.quantity,
      newEntry.color,      
      newEntry.folio,
      newEntry.observation,
      newEntry.origin,
      newEntry.driver,
      newEntry.assistant,
      newEntry.reciveBy,
      newEntry.entryTime,
      newEntry.id,
      newEntry.userId
    );
  }

  async findAll(): Promise<GoodsEntry[] | null> {
    return this.prisma.goodsEntry.findMany();
  }

  async findOne(id: number): Promise<GoodsEntry | null> {
    return this.prisma.goodsEntry.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<GoodsEntry>): Promise<GoodsEntry | null> {
    return this.prisma.goodsEntry.update({
      where: { id },
      data,
    });
  }


}
