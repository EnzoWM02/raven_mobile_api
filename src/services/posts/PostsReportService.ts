import { Report } from '@prisma/client';
import { Prisma } from 'prisma/client';

export default class PostsReportService {
  async findAllPostReports() {
    return await Prisma.report.findMany({
      include: {
        post: {
          include: {
            owner: true,
            likes: true,
            _count: {
              select: {
                comments: true,
              }
            }       
          }
        },
        user: true,
      }
    });
  }

  async findPostReport(id: number) {
    return await Prisma.report.findFirst({
      where: {
        id,
      },
    });
  }

  async createPostReport(report: Report) {
    const reportCreated = await Prisma.report.create({
        data: {
            ...report
        }
    })
    return reportCreated;
  }

  async updatePostReport(report: Report, id: number) {
    return await Prisma.report.update({
        where: {
            id
        },
        data: {
            ...report
        }
    })
  }

  async deletePostReport(id: number) {
    return await Prisma.report.delete({
        where: {
            id
        }
    })
  }
}
