import { useEffect, useState } from "react";
import { auth } from "../components/firebase";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import BacklogList from "../components/BacklogList";
import ActivityFeed from "../components/ActivityFeed";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout user={user}>
      <SearchBar />
      <BacklogList />
      <ActivityFeed />
    </Layout>
  );
};

export default HomePage;
