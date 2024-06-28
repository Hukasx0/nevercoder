"use client";

import React from "react";
import {Navbar as NavbarNextUI, NavbarBrand, NavbarContent, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import { ThemeToggle } from "./theme-toggle";

import NevercoderLogo from "../assets/icon.svg";
import Image from "next/image";

interface NavbarProps {
  user: ({
        id: string;
    } & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    }) | undefined
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <NavbarNextUI position={user ? "static" : "sticky"}>
      <NavbarBrand className="flex flex-row gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
        <Image
          src={NevercoderLogo}
          alt="Nevercoder Logo"
          width={40}
          height={40}
        />
        <p className="font-bold text-inherit">Nevercoder</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <ThemeToggle />
        {user ? ( 
          <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user.name ?? user.email ?? "User"}
              size="sm"
              src={user.image ?? undefined}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.name ?? user.email ?? "User"}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => window.location.href = "/api/auth/signout"}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        )
      :
      (
        <Link href="/api/auth/signin">
          <Button color="secondary">
            Sign In
          </Button>
        </Link>
      )}
      </NavbarContent>
    </NavbarNextUI>
  );
}
