import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// https://passwordsgenerator.net/sha256-hash-generator/ generate hash for testing purposes

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "filip",
      email: "testfilip@mail.com",
      passwordHash:
        "5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5",
    },
  });

  console.log(user);
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
