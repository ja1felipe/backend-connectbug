import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const role_admin = await prisma.role.create({
    data: {
      name: 'admin',
      can_create_br: true,
      can_update_br: true,
      can_delete_br: true,
      can_manage_br: true,
      can_create_rd: true,
      can_update_rd: true,
      can_delete_rd: true,
      can_manage_rd: true,
      can_create_users: true,
      can_update_users: true,
      can_delete_users: true,
      can_manage_users: true,

      default: true,
    },
  });

  await prisma.role.create({
    data: {
      name: 'user',
      can_create_br: true,
      can_update_br: false,
      can_delete_br: false,
      can_manage_br: false,
      can_create_rd: false,
      can_update_rd: false,
      can_delete_rd: false,
      can_manage_rd: false,
      can_create_users: false,
      can_update_users: false,
      can_delete_users: false,
      can_manage_users: false,

      default: true,
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@admin.com',
      role_id: role_admin.id,
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
