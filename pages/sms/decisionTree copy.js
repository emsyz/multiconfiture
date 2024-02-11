export function Node(infos) {
    this.id = infos.id != undefined ? infos.id : 0;
    this.next = infos.next != undefined ? infos.next : null;
}


export let tree = {
    start: [
        "self-merci",
        "self-bye"
    ],

    "self-merci": {
        text: "merci mamy",
        id: "self-merci",
        pending: true,
        next: "other-merci"
    },

    "other-merci": {
        text: "de rien",
        id: "other-merci",
        pending: false,
        character: "other",
        next: [
            "self-2-1",
            "self-2-2",
            "self-2-3"
        ]
    },

    "self-bye": {
        text: "bye mamy",
        id: "self-bye",
        pending: true,
        next: "other-merci"
    },

    "self-2-1": {
        text: "2-1",
        id: "self-2-1",
        pending: true,
        next: "other-last"
    },

    "self-2-2": {
        text: "2-2",
        id: "self-2-2",
        pending: true,
        next: "other-last"
    },

    "self-2-3": {
        text: `<i>Envoyer la photo</i>`,
        trueText: `<img src="https://images2.imgbox.com/78/9c/Xzwv7Tij_o.png">`,
        id: "self-3-3",
        pending: true,
        next: "other-last",

        image: true
    },

    "other-last": {
        text: "it's the last honey",
        id: "other-last",
        pending: false,
        character: "other"
    }

}