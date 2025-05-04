"use client";

import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { getCookie, removeCookie, setCookie } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { serverFetch } from "@/services/serverFetch";

// Types based on your actual data structure
interface Menu {
  id: number;
  name: string;
  permissions: string[];
}

interface Role {
  id: number;
  name: string;
  menus: Menu[];
}

interface UserProfile {
  id: number;
  email: string;
  name: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

interface UserProfileResponse {
  err: number;
  message: string;
  data: UserProfile;
}

interface JwtPayload {
  userId: number;
  email: string;
  type: string;
}

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: { id: number } | null;
  userProfile: UserProfile | null;
  profileLoading: boolean;
  login: (data: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
  getUserId: () => number | null;
  hasPermission: (menuName: string, permission: string) => boolean;
  getPermissionsByMenu: (menuName: string) => string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const cookieName = process.env.AUTH_COOKIE_NAME || "auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authState, setAuthState] = useState<{
    accessToken: string | null;
    user: { id: number } | null;
  }>({
    accessToken: null,
    user: null,
  });

  // Use useCallback to memoize the fetchUserProfile function
  const fetchUserProfile = useCallback(
    async (id: number) => {
      // Set a flag to prevent duplicate fetches
      if (profileLoading) return;

      setProfileLoading(true);
      try {
        const response: UserProfileResponse = await serverFetch(
          `api/users/${id}`
        );

        if (response.message === "success" && response.data) {
          setUserProfile(response.data);
        } else {
          console.error("Failed to fetch user profile:", response.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setProfileLoading(false);
      }
    },
    [profileLoading]
  );

  // Initialize auth state from cookie - only run once
  useEffect(() => {
    const initAuth = () => {
      const authData = getCookie(cookieName);
      console.log("authData", authData);
      if (authData?.accessToken) {
        try {
          const decoded: JwtPayload = jwtDecode(authData.accessToken);
          setAuthState({
            accessToken: authData.accessToken,
            user: decoded ? { id: decoded.userId } : null,
          });
        } catch (error) {
          console.error("Error decoding JWT:", error);
          removeCookie(cookieName);
          setAuthState({
            accessToken: null,
            user: null,
          });
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []); // Empty dependency array ensures this only runs once

  // Fetch user profile when authenticated - with proper dependencies
  useEffect(() => {
    if (
      !loading &&
      authState.user?.id &&
      (!userProfile || userProfile.id !== authState.user.id)
    ) {
      fetchUserProfile(authState.user.id);
    } else if (!authState.user && !loading) {
      setUserProfile(null);
    }
  }, [authState.user, fetchUserProfile, loading, userProfile]);

  // Login function
  const login = useCallback(
    (data: { accessToken: string; refreshToken: string }) => {
      const decoded: JwtPayload = jwtDecode(data.accessToken);
      setCookie(cookieName, data);
      setAuthState({
        accessToken: data.accessToken,
        user: decoded ? { id: decoded.userId } : null,
      });
      router.push("/");
    },
    [router]
  );

  // Logout function
  const logout = useCallback(() => {
    removeCookie(cookieName);
    setAuthState({
      accessToken: null,
      user: null,
    });
    setUserProfile(null);
    router.push("/login");
  }, [router]);

  // Function to get user ID
  const getUserId = useCallback((): number | null => {
    return authState.user?.id || null;
  }, [authState.user]);

  // Check if user has permission for a specific menu and operation
  const hasPermission = useCallback(
    (menuName: string, permission: string): boolean => {
      if (!userProfile || !userProfile.role || !userProfile.role.menus)
        return false;

      const menu = userProfile.role.menus.find(
        (m) => m.name.toLowerCase() === menuName.toLowerCase()
      );

      if (!menu) return false;

      return menu.permissions.includes(permission);
    },
    [userProfile]
  );

  // Get all permissions for a specific menu
  const getPermissionsByMenu = useCallback(
    (menuName: string): string[] => {
      if (!userProfile || !userProfile.role || !userProfile.role.menus) {
        return [];
      }

      // Find the menu by name (case-insensitive)
      const menu = userProfile.role.menus.find(
        (m) => m.name.toLowerCase() === menuName.toLowerCase()
      );

      // If menu doesn't exist, return empty array
      if (!menu) {
        return [];
      }

      // Return a copy of the permissions array
      return [...menu.permissions];
    },
    [userProfile]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      accessToken: authState.accessToken,
      isAuthenticated: !!authState.accessToken,
      loading,
      user: authState.user,
      userProfile,
      profileLoading,
      login,
      logout,
      getUserId,
      hasPermission,
      getPermissionsByMenu,
    }),
    [
      authState.accessToken,
      authState.user,
      loading,
      userProfile,
      profileLoading,
      login,
      logout,
      getUserId,
      hasPermission,
      getPermissionsByMenu,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
