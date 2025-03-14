/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

const {hashSync} = require('bcrypt-ts');
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(async (tx: any) => {
    await tx.user.deleteMany();

    await tx.user.create({
      data: { email: "fredx@sisloc.com.br", password: hashSync("123Fred") },
    });


    await tx.product.deleteMany();

    const products = Array.from({ length: 50 }, (_, i) => ({
      name: `Produto ${i + 1}`,
      description: `Descrição do Produto ${i + 1}`,
      imageUrl: `https://avatars.githubusercontent.com/u/472730?v=4`,
      technicalDetails: `Detalhes técnicos do Produto ${i + 1}`,
      dailyRate: Math.random() * (100 - 20) + 20,
      weeklyRate: Math.random() * (500 - 100) + 100,
      biweeklyRate: Math.random() * (800 - 200) + 200,
      monthlyRate: Math.random() * (1500 - 300) + 300,
    }));

    await tx.product.createMany({
      data: products,
    });

    console.log('50 produtos criados com sucesso!');

  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });