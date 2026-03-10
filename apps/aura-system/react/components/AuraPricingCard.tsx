import { AuraButton } from "./AuraButton";

type AuraPricingCardProps = {
  tier: string;
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
};

export function AuraPricingCard({ tier, title, price, features, featured = false }: AuraPricingCardProps) {
  return (
    <article className={`aura-card aura-price-card${featured ? " aura-price-card--featured" : ""}`}>
      <div>
        <span className="aura-tag">{tier}</span>
        <h3 className="aura-title-sm">{title}</h3>
      </div>
      <div className="aura-price">{price}</div>
      <ul className="aura-checklist">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="aura-pricing__actions">
        <AuraButton variant={featured ? "primary" : "secondary"}>Choose {tier.toLowerCase()}</AuraButton>
      </div>
    </article>
  );
}
