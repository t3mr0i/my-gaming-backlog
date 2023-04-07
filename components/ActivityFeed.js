import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesRef = collection(db, "activities");
        const activitiesQuery = query(
          activitiesRef,
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(activitiesQuery);

        const newActivities = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setActivities(newActivities);
      } catch (error) {
        console.error("Error fetching activities: ", error);
      }
    };

    fetchActivities();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Activity Feed</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="mb-2">
            <span className="font-semibold">{activity.userName}</span> rated{" "}
            <span className="font-semibold">{activity.gameName}</span>{" "}
            {activity.rating} stars
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
