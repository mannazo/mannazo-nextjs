"use client";

import "@/css/style.css";
import React, { useEffect, useState } from "react";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <html lang="en">
    <body suppressHydrationWarning={true}>
    <div>
      {children}
    </div>
    </body>
    </html>
  );
}
