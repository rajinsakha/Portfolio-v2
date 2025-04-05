"use client";

import type React from "react";

import { Briefcase, GraduationCap} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Timeline from "../ui/timeline";
import TimelineItem from "../ui/timeline-item";
import { education, experiences } from "@/constants/experience-data";

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <SectionHeading
          title="Experience & Education"
          subtitle="My professional journey"
        />

        <div className="mt-12">
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="experience">Work Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="mt-8">
              <div className="max-w-3xl mx-auto">
                <Timeline>
                  {experiences.map((experience, index) => (
                    <TimelineItem
                      key={index}
                      icon={<Briefcase className="h-5 w-5" />}
                      title={experience.title}
                      company={experience.company}
                      period={experience.period}
                      description={experience.description}
                      technologies={experience.technologies}
                      isLast={experience.isLast}
                    />
                  ))}
                </Timeline>
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-8">
              <div className="max-w-3xl mx-auto">
                <Timeline>
                  {education.map((item, index) => (
                    <TimelineItem
                      key={index}
                      icon={<GraduationCap className="h-5 w-5" />}
                      title={item.title}
                      company={item.company}
                      period={item.period}
                      description={item.description}
                      isLast={item.isLast}
                    />
                  ))}
                </Timeline>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
