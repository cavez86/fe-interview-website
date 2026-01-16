import { createContext, type ReactNode, useCallback, useMemo, useState } from "react";
import type { User } from "../data/users";

type ModalState = {
  user: User | null;
  openModal: (user: User) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalState | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const closeModal = useCallback(() => {
    setUser(null);
  }, []);

  const contextValue = useMemo<ModalState>(
    () => ({
      user,
      openModal: setUser,
      closeModal,
    }),
    [user, closeModal],
  );

  return <ModalContext value={contextValue}>{children}</ModalContext>;
};

export default ModalContext;
