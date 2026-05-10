/**
 * BFHL Frontend - Main App Component
 * Candidate: Devang Sharma
 * Email: devangsharma230467@acropolis.in
 * Roll Number: DEVANG230467
 */

import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

// Backend API URL - change this after deploying backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Multiselect filter options
const FILTER_OPTIONS = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
];

function App() {
  const [jsonInput, setJsonInput] = useState('{ "data": ["A","1","b","3","z","5"] }');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Set document title
  useEffect(() => {
    document.title = "DEVANG230467";
  }, []);

  /**
   * Validate and parse JSON input
   */
  const parseInput = (input) => {
    try {
      const parsed = JSON.parse(input);
      if (!parsed.data || !Array.isArray(parsed.data)) {
        return { valid: false, error: 'JSON must contain a "data" array.' };
      }
      return { valid: true, data: parsed };
    } catch {
      return { valid: false, error: "Invalid JSON format. Please check your input." };
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    setError("");
    setResponse(null);

    const result = parseInput(jsonInput);
    if (!result.valid) {
      setError(result.error);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/bfhl`, result.data, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      });
      setResponse(res.data);
      // Auto-select all filters on first response
      if (selectedFilters.length === 0) {
        setSelectedFilters(FILTER_OPTIONS);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to reach the server. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Enter key in textarea
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  /**
   * Render filtered results
   */
  const renderResults = () => {
    if (!response || !response.is_success) return null;

    const activeKeys = selectedFilters.map((f) => f.value);

    return (
      <div className="results">
        {activeKeys.includes("numbers") && (
          <div className="result-group">
            <div className="result-group__title">Numbers</div>
            <div className="result-tags">
              {response.numbers && response.numbers.length > 0 ? (
                response.numbers.map((n, i) => (
                  <span key={`num-${i}`} className="result-tag result-tag--number">
                    {n}
                  </span>
                ))
              ) : (
                <span className="empty-result">No numbers found</span>
              )}
            </div>
          </div>
        )}

        {activeKeys.includes("alphabets") && (
          <div className="result-group">
            <div className="result-group__title">Alphabets</div>
            <div className="result-tags">
              {response.alphabets && response.alphabets.length > 0 ? (
                response.alphabets.map((a, i) => (
                  <span key={`alpha-${i}`} className="result-tag">
                    {a}
                  </span>
                ))
              ) : (
                <span className="empty-result">No alphabets found</span>
              )}
            </div>
          </div>
        )}

        {activeKeys.includes("highest_lowercase_alphabet") && (
          <div className="result-group">
            <div className="result-group__title">Highest Lowercase Alphabet</div>
            <div className="result-tags">
              {response.highest_lowercase_alphabet &&
              response.highest_lowercase_alphabet.length > 0 ? (
                response.highest_lowercase_alphabet.map((a, i) => (
                  <span key={`hl-${i}`} className="result-tag result-tag--highlight">
                    {a}
                  </span>
                ))
              ) : (
                <span className="empty-result">No lowercase alphabets found</span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header__badge">Bajaj Finserv Health Challenge</div>
        <h1 className="header__title">BFHL API Explorer</h1>
        <p className="header__subtitle">Devang Sharma — DEVANG230467</p>
        <div className="header__info">
          <span className="header__chip">📧 devangsharma230467@acropolis.in</span>
          <span className="header__chip">🎓 DEVANG230467</span>
        </div>
      </header>

      {/* JSON Input Card */}
      <div className="card">
        <label className="card__label">API Input (JSON)</label>
        <textarea
          id="json-input"
          className="json-textarea"
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder='{ "data": ["A","1","b"], "file_b64": "..." }'
          spellCheck={false}
        />
        {error && <div className="error-msg">⚠️ {error}</div>}

        <button
          id="submit-btn"
          className={`submit-btn ${loading ? "submit-btn--loading" : ""}`}
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginTop: 16 }}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Processing...
            </>
          ) : (
            "Submit"
          )}
        </button>
        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          Press Ctrl + Enter to submit
        </div>
      </div>

      {/* Filter Dropdown — visible after response */}
      {response && response.is_success && (
        <div className="card">
          <label className="card__label">Multi Filter</label>
          <div className="filter-section">
            <Select
              isMulti
              options={FILTER_OPTIONS}
              value={selectedFilters}
              onChange={(vals) => setSelectedFilters(vals || [])}
              classNamePrefix="react-select"
              placeholder="Select filters to display..."
              closeMenuOnSelect={false}
              styles={{
                control: (base) => ({ ...base, cursor: "pointer" }),
                menu: (base) => ({ ...base, zIndex: 20 }),
              }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {response && response.is_success && selectedFilters.length > 0 && (
        <div className="card">{renderResults()}</div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          Built by <strong>Devang Sharma</strong> •{" "}
          <a
            href="mailto:devangsharma230467@acropolis.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            devangsharma230467@acropolis.in
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
