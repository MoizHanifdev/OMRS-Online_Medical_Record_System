import { motion } from 'framer-motion';

export function PasswordPolicyChecklist({ password, errors }: { password: string; errors: string[] }) {
  if (!password) return null;

  const requirements = [
    { text: 'At least 10 characters', error: 'At least 10 characters required' },
    { text: 'Uppercase letter', error: 'At least one uppercase letter required' },
    { text: 'Lowercase letter', error: 'At least one lowercase letter required' },
    { text: 'Number', error: 'At least one digit required' },
    { text: 'Special character', error: 'At least one special character required' },
  ];

  return (
    <ul className="mt-3 space-y-1.5 text-xs">
      {requirements.map((req, idx) => {
        const isMet = !errors.includes(req.error);
        return (
          <li key={idx} className={`flex items-center gap-2 ${isMet ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
            <motion.div
              initial={false}
              animate={{ scale: isMet ? 1.1 : 1 }}
              className="w-4 h-4 flex items-center justify-center shrink-0"
            >
              {isMet ? (
                <svg className="w-full h-full" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-full h-full opacity-50" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="10" cy="10" r="8" />
                </svg>
              )}
            </motion.div>
            <span>{req.text}</span>
          </li>
        );
      })}
    </ul>
  );
}
