"use client";

import { revalidateData3 } from "@/app/_actions/server-actions";
import { Button } from "@/components/ui/button";

export default function ButtonRevalidate() {
  async function handleClick() {
    await revalidateData3();
  }

  return <Button onClick={handleClick}>Revalidate page</Button>;
}
