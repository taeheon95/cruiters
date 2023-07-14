import { Express, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { ResumeRepository, ResumeRepositoryImpl } from './Resume.repostiroy';
import { ResumeService, ResumeServiceImpl } from './Resume.service';
import { ResumeController } from './Resume.controller';

export default (app: Express, prisma: PrismaClient) => {
  const resumeRepository: ResumeRepository = new ResumeRepositoryImpl(prisma);
  const resumeService: ResumeService = new ResumeServiceImpl(resumeRepository);
  const resumeController = new ResumeController(resumeService);
  const router = Router();
  app.use('/resume', router);
};
