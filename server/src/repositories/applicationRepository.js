// repositories/applicationRepository.js
const applicationRepository = (prisma) => ({
  findByUser: (userId) => prisma.application.findMany({ where: { userId } }),
  findOwned: (id, userId) =>
    prisma.application.findFirst({
      where: { id, userId },
      include: {
        activities: { orderBy: { date: "desc" } },
        contacts: true,
        coverLetters: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    }),
  create: (data) => prisma.application.create({ data }),
  update: (id, data) => prisma.application.update({ where: { id }, data }),
  remove: (id) => prisma.application.delete({ where: { id } }),
  logActivity: (applicationId, type, note) =>
    prisma.activity.create({ data: { applicationId, type, note } }),
  saveCoverLetter: (applicationId, body) =>
    prisma.coverLetter.create({ data: { applicationId, body } }),
});

module.exports = { applicationRepository };
