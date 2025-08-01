import HacerFetch from "@/context/test";

export default function Test() {
  const username = "Antonio";
  const pas = "23";

  return (
    <div>
      <HacerFetch username={username} password={pas} />
    </div>
  );
}

export function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}