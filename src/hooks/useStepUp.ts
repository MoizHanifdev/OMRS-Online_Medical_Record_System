import { useState, useCallback } from 'react';

export function useStepUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [description, setDescription] = useState<string>('');

  const request = useCallback((desc: string, action: () => void) => {
    setDescription(desc);
    setPendingAction(() => action);
    setIsOpen(true);
  }, []);

  const resolve = useCallback(() => {
    setIsOpen(false);
    if (pendingAction) pendingAction();
    setPendingAction(null);
  }, [pendingAction]);

  const reject = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
  }, []);

  return {
    isOpen,
    description,
    request,
    resolve,
    reject,
  };
}
