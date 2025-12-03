export default function CompanyFooter() {
  return (
    <div>
      <footer
        style={{
          width: "100%",
          background: "#0f2f57",
          padding: "15px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "14px",
            textAlign: "center",
            letterSpacing: "0.5px"
          }}
        >
          <p style={{ margin: 0 }}>
            © 2025 Vcraftyu Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
