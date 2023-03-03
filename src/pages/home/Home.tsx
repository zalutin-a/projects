import { Baner, TechStack, HomePageSection, Projects } from "./components"


export const Home = () => {
  return (
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
  )
}
