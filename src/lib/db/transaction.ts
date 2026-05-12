import mongoose from 'mongoose';
import { connectDB } from './mongoose';

export async function withTransaction<T>(
  callback: (session: mongoose.ClientSession) => Promise<T>
): Promise<T> {
  await connectDB();
  const session = await mongoose.startSession();
  try {
    let result: T;
    await session.withTransaction(async () => {
      result = await callback(session);
    });
    return result!;
  } finally {
    await session.endSession();
  }
}
