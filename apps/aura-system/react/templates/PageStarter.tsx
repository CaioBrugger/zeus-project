import "../styles/aura.css";

export default function PageStarter() {
  return (
    <main>
      <section className="aura-hero">
        <div className="aura-container aura-hero__grid">
          <div className="aura-hero__copy">
            <span className="aura-tag">Starter</span>
            <h1 className="aura-title-xl">Start new pages from the shared Zeus visual system.</h1>
            <p className="aura-copy-lg">
              Replace this content and keep the layout, tokens, spacing, shadows,
              buttons, and card patterns.
            </p>
            <div className="aura-hero__actions">
              <a className="aura-button aura-button-primary" href="#">
                Primary action
              </a>
              <a className="aura-button aura-button-secondary" href="#">
                Secondary action
              </a>
            </div>
          </div>
          <div className="aura-card aura-hero__visual">
            <div className="aura-hero__mock" />
          </div>
        </div>
      </section>
    </main>
  );
}
