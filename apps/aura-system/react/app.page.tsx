import "./styles/aura.css";
import { AuraFeatureCard } from "./components/AuraFeatureCard";
import { AuraHero } from "./components/AuraHero";
import { AuraPricingCard } from "./components/AuraPricingCard";

export default function Page() {
  return (
    <main>
      <AuraHero />

      <section className="aura-section" id="features">
        <div className="aura-container">
          <div className="aura-section__head">
            <div className="aura-section__copy">
              <p className="aura-eyebrow">Organisms</p>
              <h2 className="aura-title-lg">Feature section extracted into reusable building blocks.</h2>
            </div>
          </div>
          <div className="aura-feature-grid">
            <AuraFeatureCard
              index="01"
              title="Premium CTA emphasis"
              description="Buttons are simple by default and dramatic only when the action matters."
            />
            <AuraFeatureCard
              index="02"
              title="Editorial whitespace"
              description="Large spacing keeps complex AI value propositions easy to scan."
            />
            <AuraFeatureCard
              index="03"
              title="Neutral-first surfaces"
              description="The system earns trust with restrained neutral cards and one dominant action color."
            />
          </div>
        </div>
      </section>

      <section className="aura-section" id="pricing">
        <div className="aura-container">
          <div className="aura-pricing-grid">
            <AuraPricingCard tier="Starter" title="For small teams" price="$29" features={["Landing page generation", "Base design system export", "Email support"]} />
            <AuraPricingCard tier="Growth" title="For product teams" price="$79" featured features={["Multi-page generation", "Component library mapping", "Priority support"]} />
            <AuraPricingCard tier="Scale" title="For larger orgs" price="$199" features={["Design ops workflows", "Advanced tokens and audit packs", "Team onboarding"]} />
          </div>
        </div>
      </section>
    </main>
  );
}
