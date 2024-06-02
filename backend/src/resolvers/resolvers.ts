import { PrismaClient } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
  // Otros campos de contexto si los hubiera
}

interface TaskArgs {
  id: number;
  title: string;
  completed: boolean;
}

export const resolvers = {
  Query: {
    tasks: async (_: any, __: any, { prisma }: Context) => {
      return prisma.task.findMany();
    },
    task: async (_: any, args: { id: number }, { prisma }: Context) => {
      return prisma.task.findUnique({ where: { id: args.id } });
    },
  },
  Mutation: {
    createTask: async (_: any, args: { title: string }, { prisma }: Context) => {
      return prisma.task.create({ data: { title: args.title } });
    },
    updateTask: async (_: any, args: TaskArgs, { prisma }: Context) => {
      const { id, title, completed } = args;
      if (typeof title !== 'string' || typeof completed !== 'boolean') {
        throw new Error('Title must be a string and completed must be a boolean');
      }
      return prisma.task.update({
        where: { id },
        data: { title, completed },
      });
    },
    deleteTask: async (_: any, args: { id: number }, { prisma }: Context) => {
      return prisma.task.delete({ where: { id: args.id } });
    },
  },
};
