import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white">Welcome</Button>
    </div>
  );
}
