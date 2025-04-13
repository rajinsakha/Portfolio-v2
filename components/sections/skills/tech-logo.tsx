import Image from "next/image";

export default function TechLogo({
  name,
  icon,
}: {
  name: string;
  icon: string;
}) {
  // Fallback to placeholder if icon is not available

  console.log(icon);
  return (
    <div className="relative w-full h-full flex items-center justify-center">


      {/* Uncomment this when you have actual icons */}
      <Image
        src={icon|| "/placeholder.svg"}
        alt={`${name} logo`}
        fill
        className="object-contain"
        sizes="40px"
      />
    </div>
  );
}
