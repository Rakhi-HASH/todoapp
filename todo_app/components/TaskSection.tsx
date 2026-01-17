"use client";

export default function TaskSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="bg-white p-5 rounded-xl">
                <h3 className="font-semibold text-lg mb-1">Hello ! Sarah 👋</h3>
                <p className="text-gray-500 mb-4">Here’s what’s on your agenda</p>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Add a new task"
                        className="
    w-full max-w-2xl
    px-2 py-1 mb-2 mr-1
    border border-gray-300
    rounded-lg
    text-gray-700
    placeholder-gray-400
    focus:outline-none
    focus:ring-2 focus:ring-blue-500
    focus:border-blue-500
    shadow-sm
  "
                    />
                    <button className="mb-2 bg-blue-500 text-white px-2 py-1 border border-gray-300 rounded-lg">Add</button>
                </div>

                <div className="flex gap-2 mb-4">
                    <Tab label="All" active />
                    <Tab label="Active" />
                    <Tab label="Completed" />
                </div>

                <TaskItem title="Learn Figma" time="Tomorrow" />
                <TaskItem title="Office" time="Today, 10:00 AM" />
                <TaskItem title="Study" time="Tomorrow" />

                <p className="text-xs text-gray-500 mt-3">
                    2 tasks left • 1 task completed
                </p>
            </div>

            {/* Right */}
            <div className="bg-white p-5 rounded-xl">
                {/* <h3 className="font-semibold mb-4">Upcoming</h3> */}

                <div className="flex gap-2 mb-4">
                    <Tab label="All" active />
                    <Tab label="Yesterday" />
                    <Tab label="Today" />
                    <Tab label="Tomorrow" />
                </div>

                <div className="
    p-3
    space-y-3
    rounded-xl
    border border-white/40
    bg-white/50
    backdrop-blur-md
    shadow-sm
  ">
                    <UpcomingItem title="Office Meeting" time="Today, 12:00 PM" />
                    <UpcomingItem title="Trip Planning" time="15 January 2026" />
                    <UpcomingItem title="Design Prototyping" time="16 January 2026" />
                    <UpcomingItem title="Design Meeting" time="Tomorrow, 10:00 PM" />
                    <UpcomingItem title="Learn Figma" time="Tomorrow" />
                </div>
            </div>
        </div>
    );
}

function Tab({ label, active = false }: { label: string; active?: boolean }) {
    return (
        <button
            className={`px-3 py-1 rounded-full text-sm ${active
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
                }`}
        >
            {label}
        </button>
    );
}

function TaskItem({ title, time }: { title: string; time: string }) {
    return (
        <div className="flex justify-between items-center py-2 border-b">
            <span>{title}</span>
            <span className="text-xs text-gray-500">{time}</span>
        </div>
    );
}

function UpcomingItem({ title, time }: { title: string; time: string }) {
    return (
        <div className="flex justify-between py-2 border-b">
            <span>{title}</span>
            <span className="text-xs text-gray-500">{time}</span>
        </div>
    );
}
