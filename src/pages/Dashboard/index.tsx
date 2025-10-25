import StatCard from "@/components/cards/StatCard";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { useTickets } from "@/hooks/useTickets";
import { CheckCircle2, CircleDot, Clock, Ticket } from "lucide-react";
import { Link } from "react-router";

export default function Dashboard() {
  const { user } = useAuth();
  const { tickets } = useTickets();

  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === "open").length;
  const inProgressCount = tickets.filter(
    (t) => t.status === "in_progress",
  ).length;
  const closedCount = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Here is an overview of your ticket management system.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Ticket size={32} />}
            label="Total Tickets"
            count={totalCount}
            colorClass="text-blue-600"
          />
          <StatCard
            icon={<CircleDot size={32} />}
            label="Open Tickets"
            count={openCount}
            colorClass="text-green-600"
          />
          <StatCard
            icon={<Clock size={32} />}
            label="In Progress"
            count={inProgressCount}
            colorClass="text-amber-600"
          />
          <StatCard
            icon={<CheckCircle2 size={32} />}
            label="Closed Tickets"
            count={closedCount}
            colorClass="text-gray-600"
          />
        </div>

        <div className="flex justify-center">
          <Link
            to="/tickets"
            className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Manage Tickets
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
