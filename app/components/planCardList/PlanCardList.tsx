import PlanCard from "../planCard/PlanCard";
import styles from "./planCardList.module.scss";

const dummyData = [
  {
    id: 1,
    title: "제주도 3박 4일 힐링 여행",
    location: "제주도",
    period: "3박 4일",
    budget: "500,000원",
    season: "봄🌸",
    image:
      "https://images.unsplash.com/photo-1549887534-16175a0e90d4?auto=format&fit=crop&w=800&q=80",
  },
];

export default function PlanCardList() {
  return (
    <div className={styles.cardGrid}>
      {dummyData.map((plan) => (
        <PlanCard key={plan.id} {...plan} />
      ))}
    </div>
  );
}
