"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Instagram, RefreshCw, Twitter } from "lucide-react";
import { animated, config, useSpring } from "react-spring";

export default function Home() {
  const [shuffledText, setShuffledText] = useState("");
  const [key, setKey] = useState(0);

  const shuffleText = () => {
    return "アググン"
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  useEffect(() => {
    setShuffledText(shuffleText());
  }, []);

  const handleReload = () => {
    setShuffledText(shuffleText());
    setKey((prevKey) => prevKey + 1);
  };

  const textSpring = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    config: config.gentle,
    reset: true,
    key: key,
  });

  const lineSpring = useSpring({
    from: { width: "0%" },
    to: { width: "60%" },
    reset: true,
    config: config.gentle,
    key: key,
  });

  const iconSpring = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
    reset: true,
    config: { duration: 1500, easing: (t) => t * (2 - t) },
  });

  const handleTwitterShare = () => {
    const shareUrl =
      shuffledText === "アググン"
        ? "https://x.com/compose/post?text=https%3A%2F%2F%E3%82%A2%E3%82%B0%E3%82%B0%E3%83%B3.jp%2F+%E3%81%A7+%E3%82%A2%E3%82%B0%E3%82%B0%E3%83%B3+%E3%82%92%E5%87%BA%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81+%23%E3%82%A2%E3%82%B0%E3%82%B0%E3%83%B3"
        : `https://x.com/compose/post?text=https%3A%2F%2F%E3%82%A2%E3%82%B0%E3%82%B0%E3%83%B3.jp で ${encodeURIComponent(
            `${shuffledText}を出しました！ #アググン`
          )}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Card className="relative w-full max-w-2xl mx-4 overflow-hidden backdrop-blur-lg bg-black/50 shadow-2xl border border-green-500/20">
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReload}
            className="text-green-400 hover:bg-green-500/20"
          >
            <animated.div style={iconSpring}>
              <RefreshCw className="w-6 h-6" />
            </animated.div>
            <span className="sr-only">Reload</span>
          </Button>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleTwitterShare}
            className="text-green-400 hover:bg-green-500/20"
          >
            <Twitter className="w-6 h-6" />
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-green-400 hover:bg-green-500/20"
          >
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Share on Instagram</span>
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
          <animated.div
            id="aggn"
            style={textSpring}
            className="mb-6 text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-500"
          >
            {shuffledText}
          </animated.div>
          <animated.div
            style={lineSpring}
            className="h-1 bg-gradient-to-r from-green-300 to-green-500 rounded-full"
          />
        </div>
      </Card>
    </div>
  );
}
