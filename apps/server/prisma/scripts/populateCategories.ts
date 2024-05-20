import { PrismaClient } from '@prisma/client';

async function populateCategories() {
  const prisma = new PrismaClient();

  try {
    const existingCategories = await prisma.category.findMany();

    if (existingCategories.length === 0) {
      await prisma.category.createMany({
        data: [
          { title: 'Програмування' },
          { title: 'Математика' },
          { title: 'Інтернет речей IoT' },
          { title: "Архітектура комп'ютера" },
          { title: 'Економіка' },
          { title: 'Англійська мова' },
          { title: 'Хімія' },
          { title: 'Фізика' },
          { title: 'Біологія' },
          { title: 'Історія' },
        ],
      });
      console.log('Categories populated successfully.');
    } else {
      console.log('Categories already exist. Skipping population.');
    }
  } catch (error) {
    console.error('Error populating categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateCategories();
