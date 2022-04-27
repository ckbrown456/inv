import React from "react";
import "./PSI.css";

const url = "https://dfds.com";

export default function PSI() {
  let [data, setData] = React.useState({
    loading: "please wait.. can take up to 20 sec."
  });

  React.useEffect(() => {
    const apiCall = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}`;
    fetch(apiCall)
      .then((response) => response.json())
      .then((json) => {
        // Real-world metrics

        try {
          // Lab metrics
          const lighthouse = json.lighthouseResult;
          const lighthouseMetrics = {
            "First Contentful Paint":
              lighthouse.audits["first-contentful-paint"].displayValue
          };

          setData({
            lighthouseMetrics
          });
        } catch (ex) {}
        setData({
          json
        });
      });
  }, []);

  let display = JSON.stringify(data, null, 2)
    .replace(/}/g, "")
    .replace(/{/g, "")
    .replace(/"/g, "");

  return (
    <div className="app">
      <h1>PageSpeed Insights API</h1>
      <h2>{url}</h2>
      <pre>{display}</pre>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://dev.to/addyosmani/monitoring-performance-with-the-pagespeed-insights-api-33k7"
      >
        PageSpeed Insights API
      </a>
    </div>
  );
}