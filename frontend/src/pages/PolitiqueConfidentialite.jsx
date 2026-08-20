export default function PolitiqueConfidentialite() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-margin-desktop py-16">
      <h1 className="font-display font-bold text-2xl mb-2">Politique de confidentialite</h1>
      <p className="text-xs text-on-surface-variant mb-10">
        Derniere mise a jour : {new Date().toLocaleDateString('fr-FR')}
      </p>

      <div className="space-y-8 text-sm text-on-surface-variant leading-relaxed">
        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            1. Qui sommes-nous
          </h2>
          <p>
            Attia Froid, basee Av Ali Belhouane, Kelibia, Tunisie, exploite ce site afin de
            presenter ses equipements professionnels de refrigeration et de restauration
            (cafeteria, fast-food, boulangerie, hotellerie) et de permettre aux visiteurs de
            demander des devis et de laisser des avis.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            2. Donnees que nous collectons
          </h2>
          <p className="mb-2">Nous collectons uniquement les donnees que vous nous transmettez volontairement :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Formulaire de demande de devis :</strong> nom de l'entreprise, nom du
              contact, telephone, email, message et eventuellement le produit concerne.
            </li>
            <li>
              <strong>Formulaire d'avis :</strong> votre nom, une note et votre commentaire.
            </li>
            <li>
              <strong>Formulaire de contact :</strong> nom, email et message.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            3. Pourquoi nous les utilisons
          </h2>
          <p>
            Ces informations servent uniquement a traiter votre demande de devis, a repondre a
            vos questions, et a publier votre avis sur le site (apres moderation). Nous ne
            vendons ni ne partageons vos donnees avec des tiers a des fins commerciales.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            4. Ou sont stockees vos donnees
          </h2>
          <p>
            Vos donnees sont stockees dans notre base de donnees securisee et ne sont accessibles
            qu'au personnel autorise d'Attia Froid via l'espace d'administration protege par
            authentification.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            5. Cookies et stockage local
          </h2>
          <p>
            Le site utilise le stockage local de votre navigateur pour memoriser votre preference
            d'affichage (mode sombre/clair) et, pour l'espace administrateur, votre session de
            connexion. Aucun cookie de suivi publicitaire ou analytique tiers n'est utilise.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            6. Vos droits
          </h2>
          <p>
            Vous pouvez a tout moment nous demander l'acces, la rectification ou la suppression
            des donnees vous concernant en nous contactant aux coordonnees ci-dessous.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-on-surface mb-2">
            7. Nous contacter
          </h2>
          <p>
            Pour toute question concernant cette politique de confidentialite :{' '}
            <span className="font-mono">attia_froid@hotmail.com</span> - 55 836 100.
          </p>
        </section>
      </div>
    </div>
  )
}
