"use client";

import { useFormStatus } from "react-dom";
import revalidate from "../_actions/server-actions";

function RevalidateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      Revalidate
    </button>
  );
}

export function RevalidateFrom() {
  return (
    <form className="" action={revalidate}>
      <RevalidateButton />
    </form>
  );
}
