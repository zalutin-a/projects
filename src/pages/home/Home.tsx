import { Baner, TechStack, HomePageSection, Projects } from "./components"


export const Home = () => {
  return (
    // <div className="contain page max-w-5xl border-dashed border-4 border-red-500 p-4 mx-auto">
    <div className="main flex flex-col gap-20">
      <HomePageSection>
        <Baner></Baner>
      </HomePageSection>
      <HomePageSection>
        <TechStack></TechStack>
      </HomePageSection>
      <HomePageSection>
        <Projects></Projects>
      </HomePageSection>
    </div>
  // </div>
  )
}