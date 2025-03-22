"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Database } from "lucide-react";
import { useRouter } from "next/navigation";
import randomstring from "randomstring";

export default function BreadKVLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-amber-500" />
          <span className="font-bold text-xl tracking-tight">BreadKV</span>
        </div>
        <nav className="hidden md:flex items-center gap-8"></nav>
        <div className="flex items-center gap-4">
          <Button className="hidden md:flex border-zinc-800 hover:bg-zinc-900">
            Read docs
          </Button>
          <Button
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-black"
            onClick={() => {
              router.push(
                `/terminal/${randomstring.generate({
                  length: 12,
                  charset: "lowercase",
                })}?create=true`
              );
            }}
          >
            Start
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
            a key-value database from the browser
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            spin up your own instance running a key value store, and run
            commands in your own redis playground.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black"
              onClick={() => {
                router.push(
                  `/terminal/${randomstring.generate({
                    length: 12,
                    charset: "lowercase",
                  })}?create=true`
                );
              }}
            >
              Start
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              className="border-zinc-800 hover:bg-zinc-900 cursor:pointer"
            >
              Read the docs
            </Button>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-12 border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Database className="h-5 w-5 text-amber-500" />
            <span className="font-bold">BreadKV</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
