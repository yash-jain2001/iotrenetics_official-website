import React from "react";

const cards = [
  {
    title: "Living Room",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    items: ["Voice Control", "Smart Lights", "Climate Control", "Smart TV"],
  },
  {
    title: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    items: [
      "Smart Lights",
      "Automated Curtains",
      "Climate Control",
      "Motion Sensors",
    ],
  },
  {
    title: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    items: ["Smart Lights", "Gas Sensor", "Voice Assistant", "Smart Plugs"],
  },
  {
    title: "Bathroom",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    items: [
      "Motion Lights",
      "Exhaust Control",
      "Water Heater",
      "Humidity Sensor",
    ],
  },
];

export default function SmartHomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-center mb-2">
        What You Can Automate
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Every room in your home can be smart. Here's what's possible.
      </p>

      {/* Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-full md:w-[48%] bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Image */}
            <div
              className="h-40 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="absolute bottom-0 w-full bg-black/40 text-white px-4 py-2">
                <h3 className="font-semibold">{card.title}</h3>
              </div>
            </div>

            {/* List */}
            <div className="p-4">
              {card.items.map((item, i) => (
                <p key={i} className="text-gray-600 mb-1">
                  ✓ {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="mt-14 text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Get instant estimate
        </h2>
        <p className="text-gray-500 mb-6">
          Use our calculator to get an approximate cost for your smart home project.
        </p>

        <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto text-left">
          {/* Row */}
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-medium">Number of Rooms</label>
              <select className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400">
                <option>1-2 Rooms</option>
                <option>3-4 Rooms</option>
                <option>5+ Rooms</option>
              </select>
            </div>

            <div className="flex flex-col flex-1">
              <label className="mb-1 font-medium">Property Type</label>
              <select className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400">
                <option>Apartment</option>
                <option>Villa</option>
                <option>Office</option>
              </select>
            </div>
          </div>

          {/* Checkbox Section */}
          <label className="font-medium block mb-3">
            What do you want to automate?
          </label>

          <div className="flex flex-wrap gap-3 mb-6">
            {[
              "Lighting",
              "Security",
              "Climate",
              "Audio",
              "Cameras",
              "Locks",
            ].map((item, i) => (
              <label
                key={i}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer w-[48%] md:w-[30%]"
              >
                <input type="checkbox" />
                {item}
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg w-full md:w-auto">
              Get detailed quote
            </button>

            <button className="border px-6 py-3 rounded-lg w-full md:w-auto">
              Call us now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}