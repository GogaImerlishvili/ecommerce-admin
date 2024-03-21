"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { set } from "mongoose";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("User");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let initialUserName =
      session?.data?.user?.email || session?.data?.user?.name || "User";
    if (initialUserName.includes("@")) {
      initialUserName = initialUserName.split("@")[0];
    }
    if (status === "authenticated") {
      setUserName(initialUserName);
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
      }),
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You are not authenticated</div>;
  }

  const userImage = session.data?.user?.image;
  return (
    <section className="mt-8">
      <h1 className="text-center text-red-600 text-4xl mb-4 mt-4">Profile</h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-200">
            Profile Saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-yellow-100 p-4 rounded-lg border border-yellow-200">
            Saving...
          </h2>
        )}
      </div>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <div className="relative h-full w-full">
                <Image
                  className="rounded-lg mx-auto mb-1 shadow-lg"
                  src={"/istockphoto-1300845620-612x612.jpg"}
                  alt="avatar"
                  width={150}
                  height={150}
                />
                <label>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span className="block border border-gray-300 rounded-lg p-4 text-center cursor-pointer">
                    Edit
                  </span>
                </label>
              </div>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              value={userName}
              placeholder="First and Last name"
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              type="text"
              id="email"
              value={session.data.user.email}
              disabled={true}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
