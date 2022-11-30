import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@admin.com',
      role: Role.ADMIN,
      password: '$2a$10$p5.HzKjeabYNvTD1JcTTDuAnbDyEt8nJvEJMSCTijDEIF9rXyKG6.', //Admin@123
    },
  });
  console.log({ admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
