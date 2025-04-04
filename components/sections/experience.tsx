"use client";

import type React from "react";

import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Timeline from "../ui/timeline";
import TimelineItem from "../ui/timeline-item";

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
                  <TimelineItem
                    icon={<Briefcase className="h-5 w-5" />}
                    title="Senior Frontend Developer"
                    company="Tech Solutions Inc."
                    period="2021 - Present"
                    description="Led the development of responsive web applications using React.js and Next.js. Collaborated with design and backend teams to implement new features and improve user experience."
                    technologies={[
                      "React.js",
                      "Next.js",
                      "TypeScript",
                      "Tailwind CSS",
                    ]}
                  />

                  <TimelineItem
                    icon={<Briefcase className="h-5 w-5" />}
                    title="Frontend Developer"
                    company="Digital Innovations"
                    period="2019 - 2021"
                    description="Developed and maintained client websites and web applications. Implemented responsive designs and ensured cross-browser compatibility."
                    technologies={["React.js", "JavaScript", "CSS", "Redux"]}
                  />

                  <TimelineItem
                    icon={<Briefcase className="h-5 w-5" />}
                    title="Junior Web Developer"
                    company="Creative Web Studio"
                    period="2018 - 2019"
                    description="Assisted in the development of websites for small businesses. Focused on HTML, CSS, and basic JavaScript functionality."
                    technologies={["HTML", "CSS", "JavaScript", "jQuery"]}
                    isLast={true}
                  />
                </Timeline>
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-8">
              <div className="max-w-3xl mx-auto">
                <Timeline>
                  <TimelineItem
                    icon={<GraduationCap className="h-5 w-5" />}
                    title="Master of Computer Science"
                    company="University of Technology"
                    period="2019 - 2021"
                    description="Specialized in Web Technologies and Human-Computer Interaction. Thesis on 'Optimizing User Experience in Progressive Web Applications'."
                  />

                  <TimelineItem
                    icon={<GraduationCap className="h-5 w-5" />}
                    title="Bachelor of Science in Computer Science"
                    company="University of Technology"
                    period="2015 - 2019"
                    description="Focused on web development, algorithms, and software engineering principles. Graduated with honors."
                  />

                  <TimelineItem
                    icon={<Calendar className="h-5 w-5" />}
                    title="Full Stack Web Development Bootcamp"
                    company="Code Academy"
                    period="2018"
                    description="Intensive 12-week program covering modern web development technologies and practices."
                    isLast={true}
                  />
                </Timeline>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
