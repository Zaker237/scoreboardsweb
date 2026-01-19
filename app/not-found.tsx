"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        <AlertCircle className="mb-4 h-20 w-20 text-red-500" />

        <h1 className="mb-2 text-4xl font-bold">404</h1>

        <p className="mb-6 text-lg text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Button asChild className="px-6 py-2">
          <Link href="/">Back to Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
