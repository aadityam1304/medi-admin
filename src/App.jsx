import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.app}>
      <Sidebar />

      <main className={classes.main}>
        <Header />

        <h1>Dashboard</h1>
      </main>
    </div>
  );
}

export default App;
