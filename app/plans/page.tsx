"use client";

import PlanCardList from "@/components/planCardList/PlanCardList";

export default function PlansPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "24px" }}>여행 계획 목록</h1>
      <PlanCardList />
    </main>
  );
}
