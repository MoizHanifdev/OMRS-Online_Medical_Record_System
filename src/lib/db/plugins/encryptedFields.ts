import { type Schema } from 'mongoose';
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'; // 32 bytes

interface EncryptedData {
  iv: string;
  tag: string;
  data: string;
}

export function encryptedFieldsPlugin(schema: Schema, options: { fields: string[] }) {
  const { fields } = options;

  // Add encrypted fields explicitly if not present, though Mongoose usually infers them
  // or we just replace the string value with the EncryptedData object.
  // Actually, if the schema defines them as String, storing an object will fail unless it's Mixed.
  // The spec says "Stores ciphertext as { iv, tag, data } object".
  // So the schema fields MUST be defined as Schema.Types.Mixed or Object.

  schema.pre('save', function (next) {
    fields.forEach((field) => {
      if (this.isModified(field)) {
        const value = this.get(field);
        if (value && typeof value === 'string') {
          try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(value, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            const tag = cipher.getAuthTag().toString('hex');
            
            this.set(field, { iv: iv.toString('hex'), tag, data: encrypted });
          } catch (err) {
            return next(err as Error);
          }
        }
      }
    });
    next();
  });

  schema.post('init', function (doc) {
    fields.forEach((field) => {
      const value: any = doc.get(field);
      if (value && value.iv && value.tag && value.data) {
        try {
          const decipher = crypto.createDecipheriv(
            ALGORITHM,
            Buffer.from(ENCRYPTION_KEY),
            Buffer.from(value.iv, 'hex')
          );
          decipher.setAuthTag(Buffer.from(value.tag, 'hex'));
          let decrypted = decipher.update(value.data, 'hex', 'utf8');
          decrypted += decipher.final('utf8');
          doc.set(field, decrypted);
        } catch (err) {
          console.error(`Failed to decrypt field ${field}`, err);
          // Keep as is or set to null
        }
      }
    });
  });

  schema.methods.getDecrypted = function (field: string) {
    return this.get(field); // Since post('init') decrypts them, this is just a getter
  };
}
