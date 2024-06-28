"use client";

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export type ProjectsSelectProps = {
  currentProject?: string | undefined;
  projectsList: string[];
};

export default function ProjectsSelect({ currentProject, projectsList }: ProjectsSelectProps) {

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>{currentProject ?? "Untitled project"}</Button>
      </DropdownTrigger>
      <DropdownMenu>
        {projectsList.map((project) => (
          <DropdownItem onClick={() => window.location.href = project} key={project}>{project}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
