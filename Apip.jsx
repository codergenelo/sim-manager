"use client";

import { useEffect, useState } from "react";

export default function SuperSIMManager() {
  const [sims, setSims] = useState<any[]>([]);
  const [selectedSim, setSelectedSim] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    photo: "",
    simName: "",
    owner: "",
    phone: "",
    email: "",
    password: "",
    pin: "",
    puk: "",
    provider: "",
    authType: "",
    balance: "",
    country: "",
    notes: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("superSIMDatabase");
    if (saved) {
      setSims(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("superSIMDatabase", JSON.stringify(sims));
  }, [sims]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function uploadPhoto(e: any) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm({
        ...form,
        photo: reader.result as string,
      });
    };

    reader.readAsDataURL(file);
  }

  function saveSIM() {
    if (!form.simName || !form.phone) {
      alert("Please fill SIM Name and Phone");
      return;
    }

    const newSIM = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toLocaleString(),
    };

    setSims([newSIM, ...sims]);

    setForm({
      photo: "",
      simName: "",
      owner: "",
      phone: "",
      email: "",
      password: "",
      pin: "",
      puk: "",
      provider: "",
      authType: "",
      balance: "",
      country: "",
      notes: "",
    });
  }

  function deleteSIM(id: number) {
    if (confirm("Delete this SIM?")) {
      setSims(sims.filter((sim) => sim.id !== id));
      setSelectedSim(null);
    }
  }

  const filtered = sims.filter(
    (sim) =>
      sim.simName.toLowerCase().includes(search.toLowerCase()) ||
      sim.phone.toLowerCase().includes(search.toLowerCase()) ||
      sim.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="border-b border-slate-800 p-5 flex justify-between items-center bg-slate-950 sticky top-0 z-50">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">
            Super SIM Manager
          </h1>

          <p className="text-slate-400 text-sm">
            Secure SIM Database System
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 px-5 py-3 rounded-2xl">
          Total SIMs: {sims.length}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 min-h-screen">

        {/* LEFT FORM */}
        <div className="lg:col-span-1 border-r border-slate-800 p-5 bg-slate-950 overflow-auto">

          <h2 className="text-2xl font-bold mb-5">
            Add SIM
          </h2>

          <div className="space-y-4">

            {/* PHOTO */}
            <div className="flex flex-col items-center">

              {form.photo ? (
                <img
                  src={form.photo}
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  No Photo
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={uploadPhoto}
                className="mt-3 text-sm"
              />
            </div>

            <input
              type="text"
              name="simName"
              placeholder="SIM Name"
              value={form.simName}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            />

            <input
              type="text"
              name="owner"
              placeholder="Owner Name"
              value={form.owner}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            />

            <input
              type="password"
              name="password"
              placeholder="SIM Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            />

            <input
              type="text"
              name="pin"
              placeholder="PIN Code"
              value={form.pin}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            />

            <input
              type="text"
              name="puk"
              placeholder="PUK Code"
              value={form.puk}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            />

            <select
              name="provider"
              value={form.provider}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            >
              <option value="">Network Provider</option>
              <option>Vodacom</option>
              <option>Airtel</option>
              <option>Tigo</option>
              <option>Halotel</option>
              <option>TTCL</option>
            </select>

            <select
              name="authType"
              value={form.authType}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            >
              <option value="">Auth Type</option>
              <option>2FA</option>
              <option>SMS OTP</option>
              <option>Email OTP</option>
              <option>Authenticator App</option>
            </select>

            <input
              type="text"
              name="balance"
              placeholder="Balance"
              value={form.balance}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl"
            />

            <textarea
              name="notes"
              placeholder="Notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl h-28"
            />

            <button
              onClick={saveSIM}
              className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-2xl font-bold text-lg"
            >
              Save SIM
            </button>

          </div>

        </div>

        {/* CENTER LIST */}
        <div className="lg:col-span-1 border-r border-slate-800 bg-slate-950 p-5 overflow-auto">

          <input
            type="text"
            placeholder="Search SIM..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-2xl mb-5"
          />

          <div className="space-y-4">

            {filtered.map((sim) => (
              <div
                key={sim.id}
                onClick={() => setSelectedSim(sim)}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-4 cursor-pointer hover:border-blue-500 transition-all"
              >

                <div className="flex items-center gap-4">

                  {sim.photo ? (
                    <img
                      src={sim.photo}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-800"></div>
                  )}

                  <div>
                    <h3 className="font-bold text-lg">
                      {sim.simName}
                    </h3>

                    <p className="text-slate-400 text-sm">
                      {sim.phone}
                    </p>

                    <p className="text-blue-400 text-sm">
                      {sim.provider}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT DETAILS */}
        <div className="lg:col-span-2 p-8 overflow-auto">

          {selectedSim ? (

            <div>

              <div className="flex flex-col md:flex-row gap-6 items-center mb-10">

                {selectedSim.photo ? (
                  <img
                    src={selectedSim.photo}
                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-slate-800"></div>
                )}

                <div>

                  <h2 className="text-5xl font-bold text-blue-400">
                    {selectedSim.simName}
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Added: {selectedSim.createdAt}
                  </p>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5">
                  <h3 className="text-xl font-bold mb-4">
                    Owner Information
                  </h3>

                  <p><b>Name:</b> {selectedSim.owner}</p>
                  <p><b>Phone:</b> {selectedSim.phone}</p>
                  <p><b>Email:</b> {selectedSim.email}</p>
                  <p><b>Country:</b> {selectedSim.country}</p>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5">
                  <h3 className="text-xl font-bold mb-4">
                    Security
                  </h3>

                  <p><b>Password:</b> {selectedSim.password}</p>
                  <p><b>PIN:</b> {selectedSim.pin}</p>
                  <p><b>PUK:</b> {selectedSim.puk}</p>
                  <p><b>Auth:</b> {selectedSim.authType}</p>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5">
                  <h3 className="text-xl font-bold mb-4">
                    Network
                  </h3>

                  <p><b>Provider:</b> {selectedSim.provider}</p>
                  <p><b>Balance:</b> {selectedSim.balance}</p>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5">
                  <h3 className="text-xl font-bold mb-4">
                    Notes
                  </h3>

                  <p>{selectedSim.notes}</p>
                </div>

              </div>

              <button
                onClick={() => deleteSIM(selectedSim.id)}
                className="mt-8 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold"
              >
                Delete SIM
              </button>

            </div>

          ) : (

            <div className="h-full flex items-center justify-center text-slate-500 text-2xl">
              Select SIM Card
            </div>

          )}

        </div>

      </div>

    </main>
  );
    }
