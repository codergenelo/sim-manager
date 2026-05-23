// app/page.tsx

"use client";

import { useEffect, useState } from "react";

export default function SimManager() {
  const [sims, setSims] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    simName: "",
    phone: "",
    provider: "",
    pin: "",
    puk: "",
    notes: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("simCards");
    if (saved) {
      setSims(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("simCards", JSON.stringify(sims));
  }, [sims]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function addSim() {
    if (!form.simName || !form.phone) {
      alert("Fill SIM Name and Phone Number");
      return;
    }

    const newSim = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toLocaleString(),
    };

    setSims([newSim, ...sims]);

    setForm({
      simName: "",
      phone: "",
      provider: "",
      pin: "",
      puk: "",
      notes: "",
    });
  }

  function deleteSim(id: number) {
    if (confirm("Delete this SIM?")) {
      setSims(sims.filter((sim) => sim.id !== id));
    }
  }

  const filtered = sims.filter(
    (sim) =>
      sim.simName.toLowerCase().includes(search.toLowerCase()) ||
      sim.phone.toLowerCase().includes(search.toLowerCase()) ||
      sim.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-950 text-white p-5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-5">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              SIM Manager
            </h1>
            <p className="text-slate-400 mt-2">
              Advanced SIM card memory system
            </p>
          </div>

          <div className="bg-slate-800 px-5 py-3 rounded-2xl border border-slate-700">
            <h2 className="text-lg">
              Total SIMs:{" "}
              <span className="font-bold text-blue-400">
                {sims.length}
              </span>
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Form */}
          <div className="lg:col-span-1 bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-2xl">

            <h2 className="text-2xl font-semibold mb-6">
              Add SIM Card
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="simName"
                placeholder="SIM Name"
                value={form.simName}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 outline-none"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 outline-none"
              />

              <select
                name="provider"
                value={form.provider}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 outline-none"
              >
                <option value="">Select Provider</option>
                <option>Vodacom</option>
                <option>Airtel</option>
                <option>Tigo</option>
                <option>Halotel</option>
                <option>TTCL</option>
              </select>

              <input
                type="text"
                name="pin"
                placeholder="PIN Code"
                value={form.pin}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 outline-none"
              />

              <input
                type="text"
                name="puk"
                placeholder="PUK Code"
                value={form.puk}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 outline-none"
              />

              <textarea
                name="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 outline-none h-28"
              />

              <button
                onClick={addSim}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all rounded-2xl p-3 text-lg font-bold"
              >
                Save SIM
              </button>

            </div>
          </div>

          {/* SIM List */}
          <div className="lg:col-span-2 bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-2xl">

            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

              <h2 className="text-2xl font-semibold">
                Saved SIM Cards
              </h2>

              <input
                type="text"
                placeholder="Search SIM..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-3 outline-none w-full md:w-72"
              />

            </div>

            <div className="space-y-5 max-h-[700px] overflow-auto pr-2">

              {filtered.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  No SIM cards found
                </div>
              ) : (
                filtered.map((sim) => (
                  <div
                    key={sim.id}
                    className="bg-slate-800 border border-slate-700 rounded-3xl p-5 hover:scale-[1.01] transition-all"
                  >

                    <div className="flex flex-col md:flex-row justify-between gap-4">

                      <div className="space-y-2">

                        <h3 className="text-2xl font-bold text-blue-400">
                          {sim.simName}
                        </h3>

                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          {sim.phone}
                        </p>

                        <p>
                          <span className="font-semibold">Provider:</span>{" "}
                          {sim.provider}
                        </p>

                        <p>
                          <span className="font-semibold">PIN:</span>{" "}
                          {sim.pin}
                        </p>

                        <p>
                          <span className="font-semibold">PUK:</span>{" "}
                          {sim.puk}
                        </p>

                        <p>
                          <span className="font-semibold">Notes:</span>{" "}
                          {sim.notes}
                        </p>

                        <p className="text-sm text-slate-400">
                          Added: {sim.createdAt}
                        </p>

                      </div>

                      <div className="flex md:flex-col gap-3">

                        <button
                          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-2xl"
                          onClick={() => deleteSim(sim.id)}
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                ))
              )}

            </div>

          </div>

        </div>

      </div>
    </main>
  );
            }
