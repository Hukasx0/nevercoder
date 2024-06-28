"use client";

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export type ProjectsSelectProps = {
  currentProject?: string | undefined;
  projectsList: string[];
};

export default function ProjectsSelect({ currentProject, projectsList }: ProjectsSelectProps) {

  const projectsUrls = projectsList.map(project => ({
    name: project,
    url: project,
  }));
  if (currentProject) {
    projectsUrls.unshift({
      name: "new +",
      url: "/",
    });
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>{currentProject || "Untitled project"}</Button>
      </DropdownTrigger>
      <DropdownMenu>
        {projectsUrls.map((project) => (
          <DropdownItem key={project.url} onClick={() => window.location.href = project.url}>
            {project.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
