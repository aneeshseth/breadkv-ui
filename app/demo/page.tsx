"use client";

import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  return (
    <div className="flex justify-center h-screen items-center bg-black flex-col gap-3">
      <video
        src="https://res.cloudinary.com/dhxeo4rvc/video/upload/v1748502438/WhatsApp_Video_2025-05-22_at_07.42.52_online-video-cutter.com_opvsf9.mp4"
        autoPlay
        controls
        className="w-4/6 rounded-xl"
      />
      <Button
        className="bg-amber-500 hover:bg-amber-600 text-black rounded-xl p-2"
        onClick={() => {
          window.open("https://aneesh-4006c9c5.mintlify.app/introduction");
        }}
      >
        Read more on what's happening
      </Button>
    </div>
  );
}

export default page;
