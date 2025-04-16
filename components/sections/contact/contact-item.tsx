import { IContactItem } from "@/types";

export default function ContactItem({
  icon,
  title,
  content,
  href,
}: IContactItem) {
  const ContentWrapper = href ? "a" : "div";
  const props = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-primary/10 text-primary">{icon}</div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <ContentWrapper
          {...props}
          className={
            href
              ? "text-muted-foreground hover:text-primary transition-colors"
              : "text-muted-foreground"
          }
        >
          {content}
        </ContentWrapper>
      </div>
    </div>
  );
}
