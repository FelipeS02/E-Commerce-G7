import React from "react";
import { useTranslation } from "react-i18next";

function PanelTitle() {
  const [t, i18n] = useTranslation("global");
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#ADC0B7",
        textAlign: "center",
        color: "#249B63",
      }}
    >
      <h1>{t("Panel.Titulo")}</h1>
    </div>
  );
}

export default PanelTitle;
