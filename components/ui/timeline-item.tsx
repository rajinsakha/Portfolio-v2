import { motion } from "motion/react";
import { Badge } from "./badge";
const TimelineItem = ({
  icon,
  title,
  company,
  period,
  description,
  technologies = [],
  isLast = false,
}: {
  icon: React.ReactNode;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
  isLast?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-10 pb-10"
    >
      {/* Timeline line */}
      {!isLast && (
        <div
          className="absolute left-4 top-6 w-0.5 h-full bg-border"
          style={{ transform: "translateX(-50%)" }}
        ></div>
      )}

      {/* Timeline dot */}
      <div
        className="absolute left-4 top-1.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        style={{ transform: "translateX(-50%)" }}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="text-muted-foreground text-sm mt-1 md:mt-0">
            {period}
          </span>
        </div>
        <h4 className="text-primary font-medium mb-3">{company}</h4>
        <p className="text-muted-foreground mb-4">{description}</p>
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TimelineItem;
