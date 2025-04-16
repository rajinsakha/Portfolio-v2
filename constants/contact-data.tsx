import { IContactItem } from "@/types";
import { Mail, Phone, MapPin } from "lucide-react";

export const contactItems: IContactItem[] = [
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    content: "rajinsakha07@gmail.com",
    href: "mailto:rajinsakha07@gmail.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone",
    content: "+977-9761626067",
    href: "tel:+9779761626067",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Location",
    content: "Bhaktapur, Nepal",
  },
];
