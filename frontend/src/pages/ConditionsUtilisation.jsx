export default function ConditionsUtilisation() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-margin-desktop py-16">
      <h1 className="font-display font-bold text-2xl mb-2">Conditions d'utilisation</h1>
      <p className="text-xs text-on-surface-variant mb-10">
        Derniere mise a jour : {new Date().toLocaleDateString('fr-FR')}
      </p>

      <div className="space-y-8 text-sm text-on-surface-variant leading-relaxed">
        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            1. Acceptation des conditions
          </h2>
          <p>
            En consultant ce site, vous acceptez les presentes conditions d'utilisation. Si vous
            n'etes pas d'accord avec l'une de ces conditions, veuillez ne pas utiliser le site.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            2. Objet du site
          </h2>
          <p>
            Ce site presente le catalogue d'equipements professionnels d'Attia Froid et permet
            aux visiteurs de demander des devis et de consulter les caracteristiques des produits.
            Il ne s'agit pas d'un site de vente en ligne : aucun paiement n'est effectue sur ce
            site.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            3. Prix et disponibilite
          </h2>
          <p>
            Les prix affiches sur le catalogue sont donnes a titre indicatif et hors taxes (HT).
            Ils ne constituent pas une offre contractuelle et peuvent etre modifies sans preavis.
            Seul un devis confirme par Attia Froid engage l'entreprise sur un prix et une
            disponibilite.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            4. Propriete intellectuelle
          </h2>
          <p>
            L'ensemble des contenus de ce site (textes, logo, mise en page, structure) est la
            propriete d'Attia Froid, sauf mention contraire. Toute reproduction sans autorisation
            prealable est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            5. Avis clients
          </h2>
          <p>
            Les avis publies sont soumis par les visiteurs et moderes par notre equipe avant
            publication. Attia Froid se reserve le droit de refuser ou de retirer tout avis
            juge inapproprie, mensonger ou sans rapport avec nos produits ou services.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            6. Espace administrateur
          </h2>
          <p>
            L'espace d'administration est strictement reserve au personnel autorise d'Attia
            Froid. Toute tentative d'acces non autorise est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            7. Disponibilite du site
          </h2>
          <p>
            Attia Froid met tout en oeuvre pour assurer l'accessibilite du site, mais ne peut
            garantir une disponibilite continue et ne saurait etre tenue responsable
            d'interruptions temporaires.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            8. Contact
          </h2>
          <p>
            Pour toute question relative a ces conditions :{' '}
            <span className="font-mono">attia_froid@hotmail.com</span> - 55 836 100.
          </p>
        </section>
      </div>
    </div>
  )
}
