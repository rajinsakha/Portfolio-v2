"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/types";

type ProjectScreenshotsGalleryProps = {
  screenshots: Project["screenshots"];
  fallbackImage: string;
};

export function ProjectScreenshotsGallery({
  screenshots,
  fallbackImage,
}: ProjectScreenshotsGalleryProps) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const getImageSrc = (url: string) => {
    if (!url || url.startsWith("/placeholder.svg")) return fallbackImage;
    return url;
  };

  if (screenshots.length === 0) return null;

  return (
    <>
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Project Screenshots</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((screenshot, index) => (
            <button
              key={`${screenshot.url}-${index}`}
              type="button"
              onClick={() => openAt(index)}
              className="group rounded-xl overflow-hidden border border-border/50 text-left transition-[box-shadow,transform] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="relative aspect-video">
                <Image
                  src={getImageSrc(screenshot.url)}
                  alt={screenshot.caption}
                  fill
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="bg-card p-4">
                <p className="text-sm text-muted-foreground">{screenshot.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="!w-[96vw] !max-w-[1280px] border-border bg-card p-3 sm:p-5"
          aria-label="Screenshot gallery"
        >
          <DialogTitle className="sr-only">Project screenshots</DialogTitle>
          <DialogDescription className="sr-only">
            Browse project screenshots with previous and next controls.
          </DialogDescription>
          <Carousel
            key={activeIndex}
            opts={{ startIndex: activeIndex, align: "center" }}
            className="w-full overflow-hidden pt-2"
          >
            <CarouselContent>
              {screenshots.map((screenshot, index) => (
                <CarouselItem key={`${screenshot.url}-${index}`}>
                  <div className="relative h-[80vh] max-h-[900px] min-h-[320px] w-full overflow-hidden rounded-lg border border-border/50">
                    <Image
                      src={getImageSrc(screenshot.url)}
                      alt={screenshot.caption}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 92vw, (max-width: 1400px) 88vw, 1280px"
                      priority={index === activeIndex}
                    />
                  </div>
                  <p className="mt-3 text-center text-sm text-muted-foreground sm:mt-4">
                    {screenshot.caption}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
            {screenshots.length > 1 && (
              <>
                <CarouselPrevious className="left-2 border-border bg-background/95 shadow-md sm:left-4" />
                <CarouselNext className="right-2 border-border bg-background/95 shadow-md sm:right-4" />
              </>
            )}
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
