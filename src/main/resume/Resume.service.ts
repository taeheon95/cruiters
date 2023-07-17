import { Service } from "../common/Service";
import { ResumeRepository } from "./Resume.repostiroy";

export interface ResumeService extends Service {}

export class ResumeServiceImpl implements ResumeService {
  constructor(private readonly resumeRepository: ResumeRepository) {}
}
