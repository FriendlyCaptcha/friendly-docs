import { RiskIntelligenceData } from "@site/src/lib/playground";
import React, { useState } from "react";

export interface PlaygroundSubmitDialogProps {
  type: "success" | "error";
  message: string;
  riskIntelligence?: RiskIntelligenceData;
  onClose: () => void;
}

function RiskScoreBadge({ score }: { score: number }) {
  const colors = {
    0: "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300",
    1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    2: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    3: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    4: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    5: "bg-red-200 text-red-900 dark:bg-red-950 dark:text-red-200",
  };
  const labels = {
    0: "Unknown",
    1: "Very Low",
    2: "Low",
    3: "Medium",
    4: "High",
    5: "Very High",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
        colors[score] ?? colors[0]
      }`}
    >
      {score}/5 — {labels[score] ?? "Unknown"}
    </span>
  );
}

function RiskIntelligenceSection({ data }: { data: any }) {
  const [viewMode, setViewMode] = useState<"pretty" | "raw">("pretty");
  const { risk_scores, network, client } = data;

  return (
    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          Risk Intelligence
        </div>
        <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600 text-xs">
          <button
            onClick={() => setViewMode("pretty")}
            className={`px-2 py-1 ${
              viewMode === "pretty"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Pretty
          </button>
          <button
            onClick={() => setViewMode("raw")}
            className={`px-2 py-1 ${
              viewMode === "raw"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Raw
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        <a
          href="https://developer.friendlycaptcha.com/docs/v2/risk-intelligence/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600 dark:hover:text-blue-400"
        >
          Risk Intelligence
        </a>{" "}
        provides risk scores and signals about the risk associated with a user.
        The data shown here is simulated for the playground and does not reflect
        reality.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Risk Intelligence data is available to all{" "}
        <span className="font-medium">Advanced</span> and{" "}
        <span className="font-medium">Enterprise</span> customers.
      </p>

      {viewMode === "raw" ? (
        <pre className="bg-gray-50 dark:bg-gray-900 rounded p-3 text-xs overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <>
          {/* Risk Scores */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { label: "Overall", score: risk_scores.overall },
              { label: "Network", score: risk_scores.network },
              { label: "Browser", score: risk_scores.browser },
            ].map(({ label, score }) => (
              <div
                key={label}
                className="text-center p-2 bg-gray-50 dark:bg-gray-750 rounded"
              >
                <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                  {label}
                </div>
                <RiskScoreBadge score={score} />
              </div>
            ))}
          </div>

          {/* Network Info */}
          <div className="space-y-5 text-xs">
            <div>
              <div className="font-bold text-base text-gray-800 dark:text-gray-300 mb-2">
                Network
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                This only shows a subset of available information, switch to Raw
                for full data.
              </p>
              <div className="bg-gray-50 dark:bg-gray-750 rounded p-2 space-y-2">
                <Row label="IP" value={network.ip} />
                <Row
                  label="ASN"
                  value={`${network.as.name} (${network.as.type})`}
                />
                <Row
                  label="Location"
                  value={`${network.geolocation.city}, ${network.geolocation.country.name}`}
                />
                {(network.anonymization.vpn_score > 0 ||
                  network.anonymization.proxy_score > 0 ||
                  network.anonymization.tor) && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600 mt-1 space-y-2">
                    {network.anonymization.vpn_score > 0 && (
                      <Row
                        label="VPN"
                        value={
                          <RiskScoreBadge
                            score={network.anonymization.vpn_score}
                          />
                        }
                      />
                    )}
                    {network.anonymization.proxy_score > 0 && (
                      <Row
                        label="Proxy"
                        value={
                          <RiskScoreBadge
                            score={network.anonymization.proxy_score}
                          />
                        }
                      />
                    )}
                    {network.anonymization.tor && (
                      <Row label="Tor" value="Yes" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Client Info */}
            <div>
              <div className="font-bold text-base text-gray-800 dark:text-gray-300 mb-2">
                Client
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                This only shows a subset of available information, switch to Raw
                for full data.
              </p>
              <div className="bg-gray-50 dark:bg-gray-750 rounded p-2 space-y-2">
                <Row
                  label="Browser"
                  value={`${client.browser.name} ${client.browser.version}`}
                />
                <Row
                  label="OS"
                  value={`${client.os.name} ${client.os.version}`}
                />
                <Row label="Device" value={client.device.type} />
                <Row label="Timezone" value={client.time_zone.name} />
                {client.automation.automation_tool.detected && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600 mt-1">
                    <Row
                      label="Automation"
                      value={
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          {client.automation.automation_tool.name} detected
                        </span>
                      }
                    />
                  </div>
                )}
                {client.automation.known_bot.detected && (
                  <Row
                    label="Bot"
                    value={
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        {client.automation.known_bot.name} (
                        {client.automation.known_bot.type})
                      </span>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-600 dark:text-gray-300 shrink-0">{label}</span>
      <span className="text-gray-900 dark:text-gray-100 text-right">
        {value}
      </span>
    </div>
  );
}

export default function PlaygroundSubmitDialog({
  type,
  message,
  riskIntelligence,
  onClose,
}: PlaygroundSubmitDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-3">
          {type === "success" ? (
            <span className="text-green-600 text-2xl">&#10003;</span>
          ) : (
            <span className="text-red-600 text-2xl">&#10007;</span>
          )}
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {type === "success" ? "Success" : "Error"}
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">{message}</p>

        {riskIntelligence && (
          <RiskIntelligenceSection data={riskIntelligence} />
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
