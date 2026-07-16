import {
  Wrench, Zap, HardHat, Hammer, Scissors, Shirt,
  Laptop, Wrench as Mecanic, Snowflake, PaintBucket, Flame, Sprout,
} from 'lucide-react'

export const villes = [
  'Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua',
  'Maroua', 'Ngaoundéré', 'Kribi', 'Limbe', 'Buea',
]

export const professions = [
  'Plombier', 'Électricien', 'Maçon', 'Menuisier', 'Coiffeur',
  'Couturier', 'Informaticien', 'Mécanicien', 'Frigoriste',
  'Peintre', 'Soudeur', 'Jardinier',
]

export const categories = [
  { id: 1, nom: 'Plombier', icon: Wrench, count: 128 },
  { id: 2, nom: 'Électricien', icon: Zap, count: 142 },
  { id: 3, nom: 'Maçon', icon: HardHat, count: 96 },
  { id: 4, nom: 'Menuisier', icon: Hammer, count: 87 },
  { id: 5, nom: 'Coiffeur', icon: Scissors, count: 210 },
  { id: 6, nom: 'Couturier', icon: Shirt, count: 154 },
  { id: 7, nom: 'Informaticien', icon: Laptop, count: 73 },
  { id: 8, nom: 'Mécanicien', icon: Mecanic, count: 118 },
  { id: 9, nom: 'Frigoriste', icon: Snowflake, count: 41 },
  { id: 10, nom: 'Peintre', icon: PaintBucket, count: 65 },
  { id: 11, nom: 'Soudeur', icon: Flame, count: 58 },
 
]

export const artisans = [
  {
    id: 1, nomProfessionnel: 'Jean-Paul Etoundi', metier: 'Plombier', ville: 'Douala',
    telephone: '+237 690 12 34 56', email: 'jp.etoundi@example.com',
    bio: "Plombier expérimenté depuis 12 ans, spécialisé dans l'installation sanitaire et le dépannage rapide.",
    note: 4.8, avis: 56, photo: 'https://placehold.co/400x400', cover: 'https://placehold.co/600x400',
    disponible: true,
  },
  {
    id: 2, nomProfessionnel: 'Marie Ngo Bilong', metier: 'Coiffeur', ville: 'Yaoundé',
    telephone: '+237 677 22 33 44', email: 'marie.ngo@example.com',
    bio: "Coiffeuse professionnelle, tresses, défrisage et coiffures de mariage à domicile.",
    note: 4.9, avis: 98, photo: 'https://placehold.co/400x400', cover: 'https://placehold.co/600x400',
    disponible: true,
  },
  {
    id: 3, nomProfessionnel: 'Samuel Mvondo', metier: 'Électricien', ville: 'Douala',
    telephone: '+237 655 44 22 11', email: 'samuel.mvondo@example.com',
    bio: "Électricien certifié pour installations neuves, rénovations et dépannages d'urgence.",
    note: 4.6, avis: 41, photo: 'https://placehold.co/400x400', cover: 'https://placehold.co/600x400',
    disponible: false,
  },
  {
    id: 4, nomProfessionnel: 'Alice Fouda', metier: 'Couturier', ville: 'Bafoussam',
    telephone: '+237 691 55 66 77', email: 'alice.fouda@example.com',
    bio: "Couturière créative, tenues traditionnelles et modernes sur mesure.",
    note: 4.7, avis: 63, photo: 'https://placehold.co/400x400', cover: 'https://placehold.co/600x400',
    disponible: true,
  },
  {
    id: 5, nomProfessionnel: 'Robert Talla', metier: 'Menuisier', ville: 'Douala',
    telephone: '+237 678 88 99 00', email: 'robert.talla@example.com',
    bio: "Menuisier spécialisé dans le mobilier sur mesure et l'agencement intérieur.",
    note: 4.5, avis: 29, photo: 'https://placehold.co/400x400', cover: 'https://placehold.co/600x400',
    disponible: true,
  },
  {
    id: 6, nomProfessionnel: 'David Ateba', metier: 'Mécanicien', ville: 'Yaoundé',
    telephone: '+237 699 33 22 11', email: 'david.ateba@example.com',
    bio: "Mécanicien auto généraliste, diagnostic électronique et entretien courant.",
    note: 4.4, avis: 34, photo: 'https://placehold.co/400x400', cover: 'https://placehold.co/600x400',
    disponible: true,
  },
  {
    id: 7, nomProfessionnel: 'Christelle Manga', metier: 'Informaticien', ville: 'Douala',
    telephone: '+237 654 11 22 33', email: 'christelle.manga@example.com',
    bio: "Technicienne informatique : dépannage, réseaux et maintenance de parc.",
    note: 4.9, avis: 47, photo: 'https://placehold.co/400x400', cover: 'https://placehold.co/600x400',
    disponible: true,
  },
  {
    id: 8, nomProfessionnel: 'Patrick Owona', metier: 'Peintre', ville: 'Kribi',
    telephone: '+237 693 44 55 66', email: 'patrick.owona@example.com',
    bio: "Peintre en bâtiment, finitions soignées pour intérieur et extérieur.",
    note: 4.3, avis: 18, photo: 'https://placehold.co/400x400', cover: 'https://placehold.co/600x400',
    disponible: true,
  },
]

export const galerieArtisan = [
  'https://placehold.co/400x400', 'https://placehold.co/400x400', 'https://placehold.co/400x400',
  'https://placehold.co/400x400', 'https://placehold.co/400x400', 'https://placehold.co/400x400',
]

export const avisArtisan = [
  { id: 1, nom: 'Cédric Mbarga', note: 5, commentaire: "Travail rapide et soigné, je recommande vivement.", date: '12 juin 2026', photo: 'https://placehold.co/100x100' },
  { id: 2, nom: 'Sandrine Abena', note: 4, commentaire: "Très professionnel, ponctuel. Petit souci de communication au départ mais tout s'est bien passé.", date: '2 mai 2026', photo: 'https://placehold.co/100x100' },
  { id: 3, nom: 'Junior Nkolo', note: 5, commentaire: "Excellent artisan, prix honnête et travail de qualité.", date: '18 avril 2026', photo: 'https://placehold.co/100x100' },
]

export const temoignages = [
  { id: 1, nom: 'Florence Biya', ville: 'Douala', texte: "J'ai trouvé un électricien fiable en moins de 10 minutes. Le contact WhatsApp a rendu tout tellement simple.", photo: 'https://placehold.co/100x100' },
  { id: 2, nom: 'Herve Kamga', ville: 'Yaoundé', texte: "Prestavice m'a permis de trouver des clients réguliers pour mon activité de menuiserie.", photo: 'https://placehold.co/100x100' },
  { id: 3, nom: 'Aïcha Oumarou', ville: 'Garoua', texte: "Plateforme simple et rassurante, les avis clients m'ont aidée à faire le bon choix.", photo: 'https://placehold.co/100x100' },
]

export const demandes = [
  { id: 1, titre: 'Réparation fuite d\'eau cuisine', metier: 'Plombier', ville: 'Douala', description: "Fuite au niveau du tuyau sous l'évier de la cuisine, intervention rapide souhaitée.", budget: '15 000 - 25 000 FCFA', date: '2026-07-05' },
  { id: 2, titre: 'Installation prises électriques', metier: 'Électricien', ville: 'Douala', description: "Ajout de 4 prises murales dans un salon nouvellement construit.", budget: '30 000 FCFA', date: '2026-07-08' },
  { id: 3, titre: 'Confection robe de soirée', metier: 'Couturier', ville: 'Yaoundé', description: "Robe de soirée sur mesure, tissu déjà disponible.", budget: '', date: '2026-07-12' },
]

export const statsArtisan = [
  { label: 'Vues du profil', value: 1284 },
  { label: 'Contacts reçus', value: 96 },
  { label: 'Avis reçus', value: 47 },
  { label: 'Note moyenne', value: '4.8/5' },
  { label: 'Demandes reçues', value: 12 },
]

export const statsClient = [
  { label: 'Demandes publiées', value: 6 },
  { label: 'Artisans contactés', value: 14 },
  { label: 'Avis laissés', value: 9 },
]
