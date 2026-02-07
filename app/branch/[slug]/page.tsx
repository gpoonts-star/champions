import { Navigation } from "@/components/navigation"
import { BranchHero } from "@/components/branch-hero"
import { BranchInfo } from "@/components/branch-info"
import { BranchGallery } from "@/components/branch-gallery"
import { BranchMap } from "@/components/branch-map"
import { notFound } from "next/navigation"

const branchesData = {
  "champions-1": {
    name: "Champions I",
    tagline: "L'excellence dès le primaire",
    description:
      "Notre campus historique situé à Safi, offrant un environnement d'apprentissage stimulant pour les élèves du cycle primaire.",
    address: "15 BL ALLAL ILLANE VILLE NOUVELLE - SAFI",
    phone: "0672641466",
    email: "contact@elazharichampions.com",
    coordinates: "32.2995,-9.2372",
    students: "Primaire",
    programs: "6 ans",
    facilities: [
      "Salles de classe modernes",
      "Bibliothèque scolaire",
      "Espace de jeux",
      "Cantine scolaire",
      "Salles d'informatique",
    ],
    details:
      "Le campus Champions I est dédié à l'enseignement primaire. Depuis 2011, nous accompagnons nos élèves dans l'acquisition des savoirs fondamentaux avec une pédagogie axée sur la réussite et l'épanouissement.",
    partnerships:
      "Nous travaillons en étroite collaboration avec les parents et les institutions éducatives locales pour garantir un suivi personnalisé de chaque enfant.",
  },
  "champions-2": {
    name: "Champions II",
    tagline: "Un éveil passionnant",
    description:
      "Situé au cœur de la ville nouvelle, ce campus accueille nos plus jeunes élèves dans un cadre sécurisé et coloré.",
    address: "Mohammed V N °4 Qu:ABC ville nouvelle Safi",
    phone: "0672641466",
    email: "contact@elazharichampions.com",
    coordinates: "32.2995,-9.2372",
    students: "Maternelle",
    programs: "3 ans",
    facilities: [
      "Jardin d'enfants",
      "Salles d'éveil",
      "Espace sieste",
      "Cantine adaptée",
      "Salles de motricité",
    ],
    details:
      "Champions II est notre campus dédié au préscolaire. Nous offrons un programme équilibré entre enseignement coranique, école maternelle et activités d'éveil pour préparer au mieux l'entrée au primaire.",
    partnerships:
      "Nos partenariats avec des experts en petite enfance nous permettent de proposer des activités d'éveil innovantes et adaptées.",
  },
  "college-lycee": {
    name: "Collège et Lycée",
    tagline: "Forger les leaders de demain",
    description:
      "Notre campus secondaire prépare les élèves aux défis académiques du collège et du lycée avec rigueur.",
    address: "Rue Mekka ville nouvelle Safi",
    phone: "0672641466",
    email: "contact@elazharichampions.com",
    coordinates: "32.2995,-9.2372",
    students: "Secondaire",
    programs: "7 ans",
    facilities: [
      "Laboratoires de sciences",
      "Centre de documentation (CDI)",
      "Salles multimédias",
      "Espaces d'étude",
      "Terrains de sport",
    ],
    details:
      "Le campus Collège et Lycée Les Champions offre un parcours complet vers le baccalauréat. Nous mettons l'accent sur l'excellence académique, la discipline et la préparation aux études supérieures.",
    partnerships:
      "Nous entretenons des liens avec les universités et écoles supérieures pour orienter au mieux nos bacheliers.",
  },
}

export function generateStaticParams() {
  return [{ slug: "champions-1" }, { slug: "champions-2" }, { slug: "college-lycee" }]
}

type Params = Promise<{ slug: string }>

export default async function BranchPage(props: { params: Params }) {
  const { slug } = await props.params
  const branch = branchesData[slug as keyof typeof branchesData]

  if (!branch) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <BranchHero name={branch.name} tagline={branch.tagline} />
      <BranchInfo branch={branch} />
      <BranchGallery slug={slug} />
      <BranchMap name={branch.name} address={branch.address} coordinates={branch.coordinates} />
    </main>
  )
}
