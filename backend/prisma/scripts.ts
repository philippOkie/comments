import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// https://passwordsgenerator.net/sha256-hash-generator/ generate hash for testing purposes

async function main() {
  //   const user = await prisma.user.create({
  //     data: {
  //       username: "test_user",
  //       email: "test_user@test.com",
  //       passwordHash:
  //         "5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5",
  //     },
  //   });
  //  const users = await prisma.user.findMany();
  //   const comment = await prisma.comment.create({
  //     data: {
  //       commentText: "this is my first comment",
  //       date: new Date("2022-05-22T22:30:00Z"),
  //       likes: 293,
  //       dislikes: 9232,
  //       userId: 1,
  //     },
  //   });
  // const comments = await prisma.comment.findMany();
  // console.log(comments);
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
