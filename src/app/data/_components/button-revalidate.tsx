"use client";

import { revalidateData } from "@/app/_actions/server-actions";
import { Button } from "@/components/ui/button";

export default function ButtonRevalidate() {
  async function handleClick() {
    await revalidateData();
  }

  return <Button onClick={handleClick}>Revalidate page</Button>;
}
