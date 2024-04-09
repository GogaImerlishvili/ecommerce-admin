"use client";
import { useState } from "react";
import AddressInputs from "@/app/components/layout/AddressInputs";
import EditableImage from "@/app/components/layout/EditableImage";
import { useProfile } from "@/app/components/UseProfile";

export default function UserForm({ user, onSave }) {
  console.log(user);
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  // function handleAddressChange(propName, value) {
  //   if (propName === "phone") setPhone(value);
  //   if (propName === "streetAddress") setStreetAddress(value);
  //   if (propName === "postalCode") setPostalCode(value);
  //   if (propName === "city") setCity(value);
  //   if (propName === "country") setCountry(value);
  // }

  return (
    <div className="flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[200px]">
          <EditableImage link={user?.image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            image,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
            admin
          })
        }
      >
        <label>Email</label>
        <input type="email" value={user?.email} disabled={true} />
        <label>Tel</label>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone || ""}
          onChange={(ev) => setPhone(ev.target.value)}
        />
        <label>Street address</label>
        <input
          type="text"
          placeholder="Street address"
          value={streetAddress}
          onChange={(ev) => setStreetAddress(ev.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
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
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2  mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
