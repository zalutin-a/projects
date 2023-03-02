import { useState } from "react";
import { useEffect } from "react";
import { ProjectItem } from "src/shared";
import { ProjectCard } from "./project-card/project-card";

export function Projects() {
  const [data, setData] = useState<ProjectItem[]>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('data/projects.json');
      const data = await res.json();
      setData(data);
    }

    fetchData()
  },[]);

  return (
    <>
      <div className="flex flex-col max-w-4xl gap-8 md:gap-10 w-full items-center">
        <div className="flex flex-col items-center">
            <h2>My Projects</h2>
            {/* <p className="mt-4 md:mt-5">This is sample project description random things are here</p> */}
        </div>
        <div className="flex flex-wrap min-[890px]:justify-between justify-center gap-9 w-full">
          {data?.map(projectData => <ProjectCard key={projectData.id} data={projectData}></ProjectCard>)}
        </div>
      </div>
    </>
  )
}