import { CaseCard } from "./case-card"

// Dados mockados das caixas
const cases = [
  {
    id: "toolbox",
    name: "Toolbox Case",
    price: 12.0,
    image: "/yellow-toolbox-case-csgo.jpg",
    rarity: "legendary",
  },
  {
    id: "daily",
    name: "Daily Case",
    price: 0,
    image: "/blue-daily-case-csgo.jpg",
    rarity: "common",
    isFree: true,
  },
  {
    id: "low",
    name: "Low Case",
    price: 1.8,
    image: "/yellow-low-case-csgo.jpg",
    rarity: "common",
  },
  {
    id: "indirect",
    name: "Indirect Case",
    price: 3.0,
    image: "/green-indirect-case-csgo.jpg",
    rarity: "uncommon",
  },
  {
    id: "medium",
    name: "Medium Case",
    price: 4.5,
    image: "/blue-medium-case-csgo.jpg",
    rarity: "rare",
  },
  {
    id: "ultra",
    name: "Ultra Case",
    price: 6.0,
    image: "/red-ultra-case-csgo.jpg",
    rarity: "epic",
  },
  {
    id: "ammo",
    name: "Ammo Case",
    price: 6.3,
    image: "/green-ammo-case-csgo.jpg",
    rarity: "rare",
  },
  {
    id: "rust",
    name: "Rust Case",
    price: 6.6,
    image: "/rust-case-csgo.jpg",
    rarity: "rare",
  },
  {
    id: "c4",
    name: "C4 Case",
    price: 7.2,
    image: "/c4-case-csgo.jpg",
    rarity: "epic",
  },
  {
    id: "chocolate",
    name: "Chocolate Case",
    price: 8.4,
    image: "/chocolate-case-csgo.jpg",
    rarity: "epic",
  },
  {
    id: "ember",
    name: "Ember Case",
    price: 9.0,
    image: "/ember-case-csgo-orange.jpg",
    rarity: "legendary",
  },
  {
    id: "neon",
    name: "Neon Case",
    price: 12.0,
    image: "/neon-case-csgo-purple.jpg",
    rarity: "legendary",
  },
]

export function CaseGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cases.map((caseItem) => (
        <CaseCard key={caseItem.id} {...caseItem} />
      ))}
    </div>
  )
}
