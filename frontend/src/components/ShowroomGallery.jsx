import { useState } from "react";

const showroomImages = [
  { id: 1, src: "https://picsum.photos/seed/showroom-1/600/450", caption: "Espace exposition — vitrines réfrigérées" },
  { id: 2, src: "https://picsum.photos/seed/showroom-2/600/450", caption: "Zone équipements pâtisserie" },
  { id: 3, src: "https://picsum.photos/seed/showroom-3/600/450", caption: "Installation cafétéria" },
  { id: 4, src: "https://picsum.photos/seed/showroom-4/600/450", caption: "Matériel hôtellerie" },
  { id: 5, src: "https://picsum.photos/seed/showroom-5/600/450", caption: "Chambre froide sur mesure" },
  { id: 6, src: "https://picsum.photos/seed/showroom-6/600/450", caption: "Comptoir fast-food" },
];

export default function ShowroomGallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12">
      <h2 className="font-display font-bold text-2xl mb-2">Découvrez notre Showroom</h2>
      <p className="text-sm text-on-surface-variant mb-8 max-w-2xl">
        Un aperçu de nos installations et équipements chez nos clients partenaires.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {showroomImages.map((img) => (
          <button
            key={img.id}
            onClick={() => setActive(img)}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-surface-container-low hover:border-secondary/50 transition-colors duration-300"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <p className="text-white text-xs font-medium text-left">{img.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <div className="max-w-3xl w-full">
            <img src={active.src} alt={active.caption} className="w-full rounded-lg" />
            <p className="text-sm text-on-surface-variant text-center mt-4">{active.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
