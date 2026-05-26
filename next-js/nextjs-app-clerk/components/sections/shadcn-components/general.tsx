import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComponentProps } from "react";

export const ShadcnAvatarComponent = ({
  avatarProps,
  avatarImageProps,
  avatarFallbackProps,
}: {
  avatarProps?: ComponentProps<typeof Avatar>;
  avatarImageProps?: ComponentProps<typeof AvatarImage>;
  avatarFallbackProps?: ComponentProps<typeof AvatarFallback>;
}) => {
  //   const {} = avatarProps ?? {};
  const { children: avatarFallbackChildren, ...avatarFallbackPropsD } =
    avatarFallbackProps ?? {};

  return (
    <Avatar {...avatarProps}>
      <AvatarImage
        // src="https://github.com/shadcn.png"
        {...avatarImageProps}
      />
      <AvatarFallback {...avatarFallbackPropsD}>
        {avatarFallbackChildren}
      </AvatarFallback>
    </Avatar>
  );
};
