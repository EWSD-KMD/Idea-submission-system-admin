"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/core/AuthProvider";

export function Provider({ children }: { children: React.ReactNode }) {

  return (
      <Suspense fallback={<></>}>
        <AuthProvider>
        <NuqsAdapter>
          <Toaster />
          {children}
        </NuqsAdapter>
        </AuthProvider>
      </Suspense>
  );
}
