export default function Home() {
  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>TaskFlow</h2>
        <div>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={{ ...styles.link, ...styles.signupBtn }}>
            Sign Up
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Manage Your Tasks <span style={styles.highlight}>Smartly</span>
        </h1>

        <p style={styles.subtitle}>
          A simple and powerful task manager to organize your daily work and boost productivity.
        </p>

        <div style={styles.buttonGroup}>
          <Link to="/register">
            <button style={styles.primaryBtn}>Get Started</button>
          </Link>
          <Link to="/login">
            <button style={styles.secondaryBtn}>Login</button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <div style={styles.card}>
          <h3>✔ Easy to Use</h3>
          <p>Simple and clean interface for managing tasks.</p>
        </div>
        <div style={styles.card}>
          <h3>⚡ Fast</h3>
          <p>Quick performance with seamless experience.</p>
        </div>
        <div style={styles.card}>
          <h3>🔒 Secure</h3>
          <p>Your data is safe with authentication.</p>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        © 2026 TaskFlow | Built by Sachin Kumar 🚀
      </div>

    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    color: "white",
    minHeight: "100vh",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    alignItems: "center",
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  link: {
    margin: "0 10px",
    color: "white",
    textDecoration: "none",
  },

  signupBtn: {
    backgroundColor: "#3b82f6",
    padding: "8px 16px",
    borderRadius: "5px",
  },

  hero: {
    textAlign: "center",
    padding: "100px 20px",
  },

  title: {
    fontSize: "48px",
    marginBottom: "20px",
  },

  highlight: {
    color: "#3b82f6",
  },

  subtitle: {
    fontSize: "18px",
    color: "#cbd5f5",
    maxWidth: "600px",
    margin: "0 auto 30px",
  },

  buttonGroup: {
    marginTop: "20px",
  },

  primaryBtn: {
    padding: "12px 25px",
    margin: "10px",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "12px 25px",
    margin: "10px",
    backgroundColor: "transparent",
    border: "1px solid white",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "40px",
    flexWrap: "wrap",
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    width: "250px",
    textAlign: "center",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    color: "#94a3b8",
  },
};