import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SiLinkedin } from "react-icons/si";

interface TeamMemberProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedIn?: string;
}

export default function TeamMember({ name, title, bio, image, linkedIn }: TeamMemberProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="hover-elevate overflow-visible" data-testid={`card-team-${name.toLowerCase().replace(" ", "-")}`}>
      <CardContent className="p-6 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-border">
          <AvatarImage src={image} alt={name} className="object-cover" />
          {/* <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
            {initials}
          </AvatarFallback> */}
        </Avatar>
        <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-primary font-medium mb-3">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{bio}</p>
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            data-testid={`link-linkedin-${name.toLowerCase().replace(" ", "-")}`}
          >
            <SiLinkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
