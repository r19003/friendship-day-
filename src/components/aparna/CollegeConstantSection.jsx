import React from "react";

const milestones = [
  { icon: "☕", title: "First bus ride", description: "The beginning of a habit that made college feel less lonely." },
  { icon: "📚", title: "Shared study days", description: "Crowded notes, soft advice, and surprisingly calm deadlines." },
  { icon: "💜", title: "Late-night laughter", description: "The sort of nights that made ordinary days feel unforgettable." },
  { icon: "🍬", title: "Still here", description: "Even as life changed, the comfort stayed beautifully familiar." },
];

export default function CollegeConstantSection() {
  return (
    <section className="daisy-section">
      <div className="daisy-section__inner">
        <p className="section-kicker">🗓️ Through Every Semester</p>
        <h2 className="daisy-section__title">My College Constant</h2>
        <div className="college-constant-intro">
          <span className="college-constant-intro__badge">semester after semester</span>
          <p>
            Classes changed. Schedules changed. Semesters moved forward. But through so many versions of college life, you remained one of the people I could return to.
          </p>
        </div>

        <div className="college-constant-grid">
          {milestones.map((milestone) => (
            <article key={milestone.title} className="college-constant-card">
              <span className="college-constant-card__icon">{milestone.icon}</span>
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
