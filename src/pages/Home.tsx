import { lazy, Suspense } from "react";
import HeroSlider from "../components/HeroSlider";

const HomeRest = lazy(() => import("./HomeRest"));

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <Suspense fallback={<div className="home-rest-fallback" aria-hidden />}>
        <HomeRest />
      </Suspense>
    </main>
  );
}
