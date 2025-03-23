"use client";

import React, { useEffect, useState } from "react";
import styles from "./TimeZoneClock.module.scss";

const TimeZoneClock = () => {
  const [visitorTime, setVisitorTime] = useState("");
  const [ukTime, setUkTime] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      const visitorDate = new Date();
      const ukDate = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });

      setVisitorTime(visitorDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setUkTime(new Date(ukDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 10000); // updates every 10s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.clockWrapper}>
      <p>
        <span className={styles.clockIcon}>🕒</span> My Time: <strong>{ukTime}</strong>
      </p>
      <p>
        <span className={styles.globeIcon}>🌐</span> Your Time: <strong>{visitorTime}</strong>
      </p>
    </div>
  );
};

export default TimeZoneClock;
