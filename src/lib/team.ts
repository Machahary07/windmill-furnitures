export type Member = { name: string; role: string; image: string; bio?: string };

const placeholder = "/images/team-placeholder.jpg";

/* TODO(client): replace with real names, roles, photos and short bios */
export const founder = {
  name: "Pradeep Sachdeva",
  role: "Founder, 1991",
  bio: "Architect and urban designer, founder of Pradeep Sachdeva Design Associates (PSDA) and of Windmill Furniture. His belief that design should be a quiet backdrop to daily life still shapes every piece we draw.",
};

export const leads: Member[] = [
  { name: "Lorem ipsum", role: "Design Director", image: placeholder, bio: "Leads the studio’s drawing board, from first sketch to workshop drawing." },
  { name: "Lorem ipsum", role: "Workshop Head", image: placeholder, bio: "Runs the Aya Nagar workshop and its team of carpenters, polishers and upholsterers." },
  { name: "Lorem ipsum", role: "Client Projects", image: placeholder, bio: "Looks after commissions and project orders from enquiry to installation." },
];

export const members: Member[] = [
  "Architect", "Designer", "Designer", "Master Carpenter", "Carpenter", "Carpenter",
  "Polisher", "Upholsterer", "Cane Weaver", "Workshop Manager", "Client Care", "Logistics",
].map((role) => ({ name: "Lorem ipsum", role, image: placeholder }));
