import classes from "./SummaryCard.module.css";

export default function SummaryCard({ title, value }) {
  return (
    <div className={classes.card}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
