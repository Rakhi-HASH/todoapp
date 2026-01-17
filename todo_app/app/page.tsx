import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import TaskSection from "@/components/TaskSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <Hero />
          <TaskSection />
        </div>
      </div>
    </main>
  );
}
