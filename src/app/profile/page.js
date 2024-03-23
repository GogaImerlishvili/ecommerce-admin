"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  console.log(session);
  const [userName, setUserName] = useState("User");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const { status } = session;

  useEffect(() => {
    let initialUserName =
      session?.data?.user?.email || session?.data?.user?.name || "User";
    if (initialUserName.includes("@")) {
      initialUserName = initialUserName.split("@")[0];
    }

    if (status === "authenticated") {
      setUserName(initialUserName);
      setImage(session?.data?.user?.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          console.log(data);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          image: image,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile Saved!",
      error: "Error!",
    });
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      toast("Uploading image...");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        toast.success("Upload complete!");
      } else {
        toast.error("Upload failed!");
      }
      const link = await response.json();
      setImage(link);
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You are not authenticated</div>;
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-red-600 text-4xl mb-4 mt-4">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative">
              <div className="relative h-full w-full max-w-[200px]">
                <Image
                  className="rounded-lg mx-auto mb-1 shadow-lg"
                  src={image || "/istockphoto-1300845620-612x612.jpg"}
                  alt="avatar"
                  width={200}
                  height={200}
                />

                <label>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span
                    className="block border border-gray-300 rounded-lg p-1  
                  text-center cursor-pointer"
                  >
                    Edit
                  </span>
                </label>
              </div>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and last name</label>
            <input
              type="text"
              value={userName}
              placeholder="First and Last name"
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              value={session.data.user.email}
              disabled={true}
            />
            <label>Tel</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label>Street address</label>
            <input
              type="text"
              placeholder="Street address"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal code"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
