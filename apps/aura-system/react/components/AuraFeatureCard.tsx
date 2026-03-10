type AuraFeatureCardProps = {
  index: string;
  title: string;
  description: string;
};

export function AuraFeatureCard({ index, title, description }: AuraFeatureCardProps) {
  return (
    <article className="aura-card aura-feature">
      <div className="aura-feature__icon">{index}</div>
      <h3 className="aura-title-sm">{title}</h3>
      <p className="aura-copy">{description}</p>
    </article>
  );
}
