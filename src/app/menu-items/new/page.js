"use client";
import { useState } from "react";
import { useProfile } from "@/app/components/UseProfile";
import toast from "react-hot-toast";
import Left from "@/app/components/icons/Left";
import UserTabs from "@/app/components/layout/UserTabs";
import {redirect} from "next/navigation"
import Link from "next/link";
import MenuItemForm from "@/app/components/layout/MenuItemForm"

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();
  const [redirectItems, setRedirectItems] = useState(false);

  async function handleFormSubmit(ev,data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", { 
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });
    setRedirectItems(true);
  }

  if (redirectItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return 'Loading user info...';
  }
  
  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={false} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link className="button" href={"/menu-items"}>
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
     <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
