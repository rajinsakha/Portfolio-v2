import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import TechLogo from "./tech-logo";
export default function TechCategoryCard({
  category,
  index,
}: {
  category: {
    icon: React.ReactNode;
    title: string;
    technologies: { name: string; icon: string; invertInDark?: boolean }[];
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* py-0 on the Card so CardContent's p-6 is the single source of vertical
          padding — the two were stacking to 40px top and bottom. */}
      <Card className="h-full py-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold">{category.title}</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {category.technologies.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="relative w-10 h-10 ">
                  <TechLogo
                    name={tech.name}
                    icon={tech.icon}
                    invertInDark={tech.invertInDark}
                  />
                </div>
                <span className="text-sm text-center font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
