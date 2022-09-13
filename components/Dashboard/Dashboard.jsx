import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { selectCurrentDashboard } from "@store/dashboard/dashboardSlice";

/* Style */
import styles from "./Dashboard.module.scss";
import Title from "@component/Title/Title";

const Dashboard = () => {
  const { movies, tv_shows, suggested, manual_suggested } = useSelector(
    selectCurrentDashboard
  );

  const arr = [
    {
      type: "Movie",
      count: movies,
    },
    {
      type: "TV Shows",
      count: tv_shows,
    },
    {
      type: "Suggestions",
      count: suggested,
    },
    {
      type: "Manual Suggestions",
      count: manual_suggested,
    },
  ];

  return (
    <div className={styles.root}>
      <Title as="h2" name="Welcome" />
      <div className={styles.info}>
        {arr.map(({ type, count }, index) => (
          <div key={index} className={styles.info_block}>
            <span className={styles.count}>{count}</span>
            <span className={styles.type}>{type}</span>
          </div>
        ))}
      </div>
      <div className={styles.links}>
        <h5 className={styles.links_title}>Quick Links</h5>
        <div className={styles.links_group}>
          <Link href="/suggestions">
            <a className={styles.links_group_block}>Suggestions</a>
          </Link>

          <Link href="/add">
            <a className={styles.links_group_block}>Add</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
