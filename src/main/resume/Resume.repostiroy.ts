import { PrismaClient, Resume } from '@prisma/client';
import { Repository } from '../common/Repository';

export interface ResumeRepository extends Repository<Resume, BigInt> {}

export class ResumeRepositoryImpl implements ResumeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findAll(): Promise<Resume[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: BigInt): Promise<Resume | null> {
    throw new Error('Method not implemented.');
  }
  create(data: unknown): Promise<Resume> {
    throw new Error('Method not implemented.');
  }
  update(id: BigInt, data: unknown): Promise<Resume> {
    throw new Error('Method not implemented.');
  }
  delete(id: BigInt): void {
    throw new Error('Method not implemented.');
  }
}
