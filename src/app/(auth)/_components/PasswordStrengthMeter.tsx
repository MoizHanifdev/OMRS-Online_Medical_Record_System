import { passwordStrength } from '@/auth/password-policy';
import { motion } from 'framer-motion';

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;

  const { score, crackTime } = passwordStrength(password);
  
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const activeColor = colors[score];

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: score >= i ? '100%' : '0%' }}
            className={`h-full flex-1 ${activeColor}`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-muted-foreground font-medium">{labels[score]}</span>
        <span className="text-[10px] text-muted-foreground">Est. crack time: {crackTime}</span>
      </div>
    </div>
  );
}
