import { AuraButton } from "./AuraButton";

export function AuraHero() {
  return (
    <section className="aura-hero">
      <div className="aura-container aura-hero__grid">
        <div className="aura-hero__copy">
          <span className="aura-tag">AI design to code</span>
          <h1 className="aura-title-xl">Build polished product surfaces at startup speed.</h1>
          <p className="aura-copy-lg">
            React-ready Aura extraction for SaaS landing pages, pricing pages, and premium AI product marketing.
          </p>
          <div className="aura-hero__actions">
            <AuraButton variant="primary">Start free trial</AuraButton>
            <AuraButton variant="secondary">Explore system</AuraButton>
            <AuraButton variant="shiny" href="#workflow">
              See workflow
            </AuraButton>
          </div>
        </div>
        <div className="aura-card aura-hero__visual">
          <div className="aura-hero__mock" />
        </div>
      </div>
    </section>
  );
}
