import Image from "next/image";

export default function TechLogo({
  name,
  icon,
}: {
  name: string;
  icon: string;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={icon || "/placeholder.svg"}
        alt={`${name} logo`}
        fill
        className="object-contain"
        sizes="40px"
      />
    </div>
  );
}
