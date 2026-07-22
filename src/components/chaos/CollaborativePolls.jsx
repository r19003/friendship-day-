import React, { useState } from "react";
import { Vote, PlusCircle, CheckCircle2 } from "lucide-react";
import { usePolls } from "../../hooks/usePolls";

export default function CollaborativePolls() {
  const { polls, castVote, createPoll, userRole } = usePolls();
  const [showCreate, setShowCreate] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (idx, val) => {
    const next = [...options];
    next[idx] = val;
    setOptions(next);
  };

  const handleAddOption = () => {
    if (options.length < 5) setOptions([...options, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validOpts = options.filter((o) => o.trim().length > 0);
    if (!question.trim() || validOpts.length < 2) return;

    createPoll(question, validOpts);

    setQuestion("");
    setOptions(["", ""]);
    setShowCreate(false);
  };

  return (
    <section id="collaborative-polls" className="polls-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            📊 Trio Decision Board
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
            Collaborative Polls
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 580, marginInline: "auto" }}>
            Playful polls for trip destinations, night stays, food runs, and BTS watch parties.
          </p>
          <button
            className="primary-button btn-chaos"
            style={{ marginTop: "1rem", fontSize: "0.88rem" }}
            onClick={() => setShowCreate(!showCreate)}
          >
            <PlusCircle size={16} /> Create a New Poll
          </button>
        </div>

        {/* Create Poll Form */}
        {showCreate && (
          <form className="poll-create-form" onSubmit={handleSubmit}>
            <h3 style={{ color: "white", marginBottom: "1rem", fontSize: "1.2rem" }}>Create a Poll</h3>
            <input
              type="text"
              className="upload-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What question are we overcomplicating today?..."
              required
            />
            <div style={{ marginBlock: "1rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>Poll Options:</label>
              {options.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  className="upload-input"
                  style={{ marginTop: "0.5rem" }}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}...`}
                  required
                />
              ))}
              {options.length < 5 && (
                <button type="button" className="text-link-btn" onClick={handleAddOption} style={{ marginTop: "0.5rem" }}>
                  + Add Another Option
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
              <button type="button" className="cancel-reply-btn" onClick={() => setShowCreate(false)} style={{ color: "white" }}>
                Cancel
              </button>
              <button type="submit" className="primary-button btn-daisy">
                📊 Post Poll
              </button>
            </div>
          </form>
        )}

        {/* Poll Cards Grid */}
        {polls.length === 0 ? (
          <div className="premium-empty-state" style={{ color: "white" }}>
            <div className="premium-empty-state__icon">
              <Vote size={44} style={{ color: "var(--chaos-yellow)" }} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
              No Decision Is Currently Being Overcomplicated
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.95rem", maxWidth: 440, marginInline: "auto" }}>
              Create the first poll to decide trip destinations, food plans, or rematches.
            </p>
          </div>
        ) : (
          <div className="polls-grid">
            {polls.map((poll) => {
              const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes || []).length, 0);

              return (
                <div key={poll.id} className="poll-card">
                  <div className="poll-header">
                    <Vote size={20} style={{ color: "var(--chaos-yellow)" }} />
                    <span className="poll-author">Created by {poll.author_name}</span>
                  </div>

                  <h3 className="poll-question">{poll.question}</h3>

                  <div className="poll-options-list">
                    {poll.options.map((opt) => {
                      const voteCount = (opt.votes || []).length;
                      const percent = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                      const hasVoted = (opt.votes || []).includes(userRole);

                      return (
                        <button
                          key={opt.id}
                          className={`poll-option-btn ${hasVoted ? "voted" : ""}`}
                          onClick={() => castVote(poll.id, opt.id)}
                        >
                          <div className="poll-option-fill" style={{ width: `${percent}%` }} />
                          <div className="poll-option-content">
                            <span className="opt-text">
                              {hasVoted && <CheckCircle2 size={16} className="voted-icon" />}
                              {opt.option_text}
                            </span>
                            <span className="opt-percent">{percent}% ({voteCount})</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="poll-footer">
                    <span>Total votes: {totalVotes}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
