"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getMemberstack } from "@/lib/memberstack";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MemberData = Record<string, any> & {
  id: string;
  auth: {
    email: string;
  };
};

interface MemberstackContextType {
  member: MemberData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const MemberstackContext = createContext<MemberstackContextType>({
  member: null,
  isLoading: true,
  isAuthenticated: false,
  logout: async () => {},
  refresh: async () => {},
});

export function useMemberstack() {
  return useContext(MemberstackContext);
}

export function MemberstackProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<MemberData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const ms = getMemberstack();
      if (!ms) {
        setIsLoading(false);
        return;
      }
      const result = await ms.getCurrentMember();
      setMember(result?.data ?? null);
    } catch {
      setMember(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback(async () => {
    const ms = getMemberstack();
    if (ms) {
      await ms.logout();
      setMember(null);
      window.location.href = "/auth";
    }
  }, []);

  return (
    <MemberstackContext.Provider
      value={{
        member,
        isLoading,
        isAuthenticated: !!member,
        logout,
        refresh: checkAuth,
      }}
    >
      {children}
    </MemberstackContext.Provider>
  );
}
