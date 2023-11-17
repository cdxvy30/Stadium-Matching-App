// ActivityList.jsx
import React, { useState, useEffect } from 'react';
import './ActivityList.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx'; 
import Header from '../../components/Header/Header.jsx'; 

import mockActivities from '../../mockData/mockActivities.js'; 

import InfiniteScroll from 'react-infinite-scroll-component'; // Make sure to install this package

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Load mock data instead of fetching from an API
    setActivities(mockActivities);
  }, []);

  useEffect(() => {
    // Initial load
    if (activities.length > 0) {
      setVisibleActivities(activities.slice(0, 10)); // 初始顯示10個活動
    }
  }, [activities]);

  const loadMoreActivities = () => {
    // 載入更多活動
    const currentLength = visibleActivities.length;
    const newVisibleActivities = activities.slice(
      currentLength,
      currentLength + 10 // 每次載入10個活動
    );

    if (newVisibleActivities.length === 0) {
      setHasMore(false); // 沒有更多活動可載入
    } else {
      setVisibleActivities([...visibleActivities, ...newVisibleActivities]);
    }
  };

  // Function to generate star ratings
const generateStars = (rating) => {
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<img key={i} src="../star.png" alt="Star" className="star" />);
  }
  return stars;
};


  return (
    <div>
      <Header title="活動" />
      <div className="activity-list">
        <InfiniteScroll
          dataLength={visibleActivities.length}
          next={loadMoreActivities}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {visibleActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <img src={activity.image} alt={activity.title} />
              <div className="activity-info">
                <div className="title-time">
                  <h3>{activity.title}</h3>
                  <span className="time">{activity.time}</span>
                </div>
                <div className="stadium-price">
                  <p>{activity.stadium} - {activity.price}</p>
                  <div className="rating">{generateStars(activity.rating)}</div>
                </div>
                <span className="remaining">剩餘 {activity.remaining} 人</span>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <FooterBar />
    </div>
  );
};

export default ActivityList;


// // Inside your component

// const ActivityList = () => {
//   const [activities, setActivities] = useState([]);

//   useEffect(() => {
//     // Load mock data instead of fetching from an API
//     setActivities(mockActivities);
//   }, []);

 

//   return (
//     <div>
//       <Header />{/* Your footer content */}
//       <div className="footer">
//       <FooterBar />{/* Your footer content */}
//     </div>

//     </div>
//   );
// };



// return (
//   <div>
//     <InfiniteScroll
//       dataLength={activities.length}
//       next={fetchMoreActivities}
//       hasMore={hasMore}
//       loader={<h4>Loading...</h4>}
//       endMessage={
//         <p style={{ textAlign: 'center' }}>
//           <b>You have seen all activities</b>
//         </p>
//       }
//       className="activity-list"
//     >
//       {activities.map((activity) => (
//         <div key={activity.id} className="activity-item">
//           <img src={activity.image} alt={activity.name} />
//           <div>
//             <h3>{activity.name}</h3>
//             <p>{activity.description}</p>
//           </div>
//         </div>
//       ))}
//     <div className="footer">
//     <FooterBar />{/* Your footer content */}
//   </div>
//     </InfiniteScroll>
//   </div>
// );
// };


