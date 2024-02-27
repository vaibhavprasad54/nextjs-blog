"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export const AuthProvider = ({children}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export const TanstackProvider = ({children}) => {

    const [queryClient] = useState(new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    )

}



