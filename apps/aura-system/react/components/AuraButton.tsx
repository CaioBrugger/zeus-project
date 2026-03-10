import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "shiny";
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function AuraButton(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? "primary";
  const className =
    variant === "shiny"
      ? "aura-shiny-cta"
      : `aura-button ${variant === "secondary" ? "aura-button-secondary" : "aura-button-primary"}`;

  if ("href" in props) {
    const { children, href, variant: _variant, ...rest } = props;
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  const { children, variant: _variant, ...rest } = props;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
