export function Node(infos) {
    this.id = infos.id != undefined ? infos.id : 0;
    this.next = infos.next != undefined ? infos.next : null;
}


export let tree = {
    start: [
        "self-0-bof",
        "self-0-super",
        "self-0-nul"
    ],


    ///////// reponses 0


    "self-0-bof": {
        id: "self-0-bof",
        text: "bof :/",
        pending: true,
        next: "other-1-quoi"
    },

    "self-0-super": {
        id: "self-0-super",
        text: "ouais top ! (...)",
        trueText: "Ouais top ! ENfin faut éviter les cassos dans la cours mais sinon ca va",
        pending: true,
        next: "other-1-cassos"
    },

    "self-0-nul": {
        id: "self-0-nul",
        text: "non c'est trop nul",
        pending: true,
        next: "other-1-quoi"
    },


    ///////// reponses 1


    "other-1-quoi": {
        id: "other-1-quoi",
        text: "ah mince comment ca... ?",
        pending: false,
        character: "other",
        next:
        [
            "self-1-cours",
            "self-1-amis",
            "self-1-famille"
        ]
    },

    "other-1-cassos": {
        id: "other-1-cassos",
        text: "ah ouais ?? mais je pensais qu'il y avait beaucopu de gens de primaire",
        pending: false,
        character: "other",
        next:
        [
            "self-1-cassos-primaire",
            "self-1-cassos-eviter"
        ]
    },


    /// self
    
    "self-1-cours": {
        id: "self-1-cours",
        text: 'les cours sont trop durs',
        trueText: "ouais les cours sont trop durs... j'arrive pas à m'habituer au nouveau rythme :((( puis je m'ennuie sans toi en cours",
        pending: true,
        next: "other-2-missu"
    },
    
    "self-1-amis": {
        id: "self-1-amis",
        text: `c'est super nul sans toi`,
        trueText: "c'est super nul sans toi, les gens ils sont pas tres sympas et un peu des barlos genre",
        pending: true,
        next: "other-2-missu"
    },
    
    "self-1-famille": {
        id: "self-1-famille",
        text: `c'est compliqué avec papa`,
        trueText: "c'est un peu compliqué à la maison ces derniers jours avec l'anniversaire de la mort de maman qui arrive. papa est triste tout le temps",
        pending: true,
        next: "other-2-papa"
    },
    
    "self-1-cassos-primaire": {
        id: "self-1-cassos-primaire",
        text: `peu de gens de primaire sont inscrits ici`,
        trueText: "pas ouf y a pas vraiment tant de gens qu'on connait que ça. y a plus que sasha avec qui je reste. les autres ils sont pas tres sympas et un peu des barlos genre.",
        pending: true,
        next: "other-2-primaire"
    },
    
    "self-1-cassos-eviter": {
        id: "self-1-cassos-eviter",
        text: `pas trop envie d'en parler`,
        trueText: "ouais pas trop envie d'en parler... c'est trop nul ca sert a rien d'en parler",
        pending: true,
        next: "other-2-harrypotter"
    },



    /////////// reponses 2

    "other-2-missu": {
        id: "other-2-missu",
        text: `tu me manques aussi les gens sont pas aussi cools que toi. mais t'inquiète tu vas te faire des nouveaux potes !! j'en suis sûr`,
        pending: false,
        character: "other",
        next:
        [
            "self-2-potes-ouais",
            "self-2-potes-probablement",
            "self-2-potes-non"
        ]
    },

    "other-2-papa": {
        id: "other-2-papa",
        text: `oh ouais je comprends :((( c'est dans une semaine non ? ca va aller ?`,
        pending: false,
        character: "other",
        next:
        [
            "self-2-papa-jsp",
            "self-2-papa-oui",
            "self-2-papa-triste"
        ]
    },

    "other-2-primaire": {
        id: "other-2-primaire",
        text: `oh ouais pas ouf :// heureusement sasha est là !!`,
        pending: false,
        character: "other",
        next:
        [
            "self-2-sasha"
        ]
    },

    "other-2-harrypotter": {
        id: "other-2-harrypotter",
        text: `ouais je comprends. tu fais quoi ce soir sinon ? le nouveau Harry Potter sort bientot, on peut se voir pour se changer les idées !!`,
        pending: false,
        character: "other",
        next:
        [
            "self-2-harrypotter"
        ]
    },


    /// self

    "self-2-potes-ouais": {
        id: "self-2-potes-ouais",
        text: "ouais",
        trueText: "Ouais... Si ca se trouve je tomberai sur un mec ou une meuf mega trop bien !! Enfin bref. Tu fais quoi ce samedi ?",
        pending: true,
        next: "other-2-2-samedi"
    },

    "self-2-potes-probablement": {
        id: "self-2-potes-probablement",
        text: "probablement",
        trueText: "Probablement... J'espere que les gens sont moins nuls qu'ils en ont l'air. Enfin bref. Tu fais quoi ce samedi ?",
        pending: true,
        next: "other-2-2-samedi"
    },

    "self-2-potes-non": {
        id: "self-2-potes-non",
        text: "j'en doute",
        trueText: "J'en doute... A coup sur ils ont pas les bonnes refs et c'est des gamins. Enfin bref. Tu fais quoi ce samedi ?",
        pending: true,
        next: "other-2-2-samedi"
    },

    "other-2-2-samedi": {
        id: "other-2-2-samedi",
        text: `Je pensais aller voir harry potter, celui qui sort bientôt. Tu veux aller le voir ensemble ? On pourra se changer les idées ensemble !!`,
        pending: false,
        character: "other",
        next:
        [
            "self-2-2-ok"
        ]
    },


    // cinema transition

    "self-2-papa-jsp": {
        id: "self-2-papa-jsp",
        text: "je suis pas sûre",
        trueText: `Suis pas sure... Chaque année c'est pareil. Il est mal pendant des jours et c'est dur de lui parler... Mais c'est pas grave, ca finira par passer. et Mamy est là aussi`,
        pending: true,
        next: "other-2-3-courage"
    },

    "self-2-papa-oui": {
        id: "self-2-papa-oui",
        text: "oui ça ira",
        trueText: `Oui ça finir par aller... Chaque année c'est pareil. Il est mal pendant des jours et c'est dur de lui parler mais après on passe beaucoup de temps ensemble. et Mamy est là aussi`,
        pending: true,
        next: "other-2-3-courage"
    },

    "self-2-papa-triste": {
        id: "self-2-papa-triste",
        text: "oui mais c'est dur",
        trueText: `Oui mais c'est dur... Chaque année c'est pareil. Il est mal pendant des jours et c'est dur de lui parler... On compense après et ça finit par passer, et mamy est là, mais j'ai l'impression d'etre seule pendant des jours`,
        pending: true,
        next: "other-2-3-courage"
    },

    "other-2-3-courage": {
        id: "other-2-3-courage",
        text: `Je comprends c'est vraiment pas chouette. Tu veux qu'on se voie un de ces quatre ? on pourra parler et faire plein de trucs pour te changer les idées. Un cinéma samedi par exemple ?`,
        pending: false,
        character: "other",
        next:
        [
            "self-2-3-ok"
        ]
    },



    /////////// responses 3 : cinema

    "self-2-harrypotter": {
        id: "self-2-harrypotter",
        text: "Oh oui !!",
        trueText: `Oh ouiiii, carrément chaude !! Tu es dispo quand ?`,
        pending: true,
        next: "other-3-heure"
    },

    "self-2-2-ok": {
        id: "self-2-2-ok",
        text: "ouais trop bien !",
        trueText: "Ouais trop bien ! Trop hâte, tu veux y aller à quelle heure ?",
        pending: true,
        next: "other-3-heure"
    },

    "self-2-sasha": {
        id: "self-2-sasha",
        text: "oui !",
        trueText: `Oui clair ! Enfin bref, tu fais quoi ce samedi ?`,
        pending: true,
        next: "other-2-2-samedi"
    },

    "self-2-3-ok": {
        id: "self-2-3-ok",
        text: "oui !",
        trueText: `Oui ça fera du bien ! On peut aller voir le nouveau Harry Potter, tu es dispo quand ?`,
        pending: true,
        next: "other-3-heure"
    },




    ////////// 3 : CINEMA

    "other-3-heure": {
        id: "other-3-heure",
        text: `Comme tu veux. séance de 14h ca me paraît bien ?`,
        pending: false,
        character: "other",
        next:
        [
            "self-3-ok"
        ]
    },

    "self-3-ok": {
        id: "self-3-ok",
        text: "ok !",
        trueText: `Ok ça me parait bien ! D'ailleurs j'aurai des trucs à te montrer ;)))`,
        pending: true,
        next: "other-3-question"
    },

    "other-3-question": {
        id: "other-3-question",
        text: `oooh comment ça ?`,
        pending: false,
        character: "other",
        next:
        [
            "self-3-enigmatique",
            "self-3-suspens"
        ]
    },

    // self

    "self-3-enigmatique": {
        id: "self-3-enigmatique",
        text: "Quelque chose de jamais vu !!",
        trueText: `Quelque chose de jamais vu !! T'en reviendras pas ahahah`,
        pending: true,
        next: "other-4-insiste"
    },

    "self-3-suspens": {
        id: "self-3-enigmatique",
        text: "Ahahh... Devine !",
        pending: true,
        next: "other-4-guess"
    },


    ////////// : hair

    "other-4-insiste": {
        id: "other-4-insiste",
        text: `Ah tu fais durer le suspens là !!! accouche !! ;P`,
        pending: false,
        character: "other",
        next:
        [
            "self-solution-tuverras",
            "self-solution-photo"
        ]
    },

    "other-4-guess": {
        id: "other-4-guess",
        text: `Hmmmmm... des nouveaux vêtements ?`,
        pending: false,
        character: "other",
        next:
        [
            "self-4-2-recommence",
            "self-solution-tuverras",
            "self-4-2-presque"
        ]
    },

    "self-4-2-recommence": {
        id: "self-4-2-recommence",
        text: "A côté de la plaque !",
        trueText: `T'es à côté de la plaque toi ahahahah.... enfin en vrai pas trooop trop`,
        pending: true,
        next: "other-4-insiste"
    },

    "self-4-2-presque": {
        id: "self-4-2-presque",
        text: "Presque... ;P",
        trueText: `Presque... ;P D'autres idées ?`,
        pending: true,
        next: "other-4-insiste"
    },


    ///// solutions

    "self-solution-tuverras": {
        id: "self-solution-tuverras",
        text: "Tu verras ;P",
        trueText: `Ahah, bon tu verras ;P Je dois y aller, on se parle plus tard pour samedi !`,
        pending: true,
        next: "other-solution-hate"
    },

    "other-solution-hate": {
        id: "other-solution-hate",
        text: `Arghhh trop envie de voir ! Mais ca marche à samedi !!`,
        pending: false,
        character: "other"
    },

    "self-solution-photo": {
        text: `<i>Envoyer une photo</i>`,
        trueText: `<img src="https://images2.imgbox.com/78/9c/Xzwv7Tij_o.png">`,
        id: "self-solution-photo",
        pending: true,
        next: "other-solution-reaction",

        image: true
    },

    "other-solution-reaction": {
        id: "other-solution-hate",
        text: `Ahhh waw ptn !! trop stylé`,
        pending: false,
        character: "other",
        next: [
            "self-solution-last"
        ]
    },

    "self-solution-last": {
        id: "self-solution-last",
        text: "T'as vu ça",
        trueText: `T'as vu ça ;P Bon je dois y aller, on se parle plus tard pour samedi !`,
        pending: true,
        next: "other-solution-last"
    },

    "other-solution-last": {
        id: "other-solution-last",
        text: `Ca marche, à samedi !!`,
        pending: false,
        character: "other"
    },




}