"use client";

import React from "react";
import Comments from "@/(public)/plans/[id]/components/comments/Comments";
import TravelPlanOverview from "@/(public)/plans/[id]/components/travelPlanOverview/TravelPlanOverview";
import TripGuide from "@/(public)/plans/[id]/components/tripGuide/TripGuide";

const TestPage: React.FC = () => {
  return (
    <div>
      <div>
        <TravelPlanOverview />
      </div>
      <div>
        <TripGuide />
      </div>
      <div>
        <Comments />
      </div>
    </div>
  );
};

export default TestPage;
