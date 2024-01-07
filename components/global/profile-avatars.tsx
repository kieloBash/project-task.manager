import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileAvatar({ src, name }: { src: string; name: string }) {
  return (
    <Avatar className="border-2 border-white">
      <AvatarImage src={src} alt="profile" />
      <AvatarFallback className="uppercase">{name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
