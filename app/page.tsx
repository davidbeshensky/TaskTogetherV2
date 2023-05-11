import { Inter } from "next/font/google";
import TasksParent from "./components/TasksParent";


const inter = Inter({ subsets: ["latin"] });

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TasksParent />
    </main>
  );
}
