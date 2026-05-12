import { connectDB } from '../../src/lib/db/mongoose';
import mongoose from 'mongoose';
import * as models from '../../src/lib/models/index';
import { faker } from '@faker-js/faker';

export async function clearDatabase() {
  console.log('Clearing database...');
  for (const model of Object.values(models)) {
    if ((model as any).deleteMany) {
      await (model as any).deleteMany({});
    }
  }
  console.log('Database cleared.');
}

export function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateDateBetween(start: Date, end: Date): Date {
  return faker.date.between({ from: start, to: end });
}
