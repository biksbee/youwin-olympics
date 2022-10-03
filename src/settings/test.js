const allData = {
    "firebase-root-folder/lotg": {
        "casino-olympics-2022": {
            validDokmains: [
                "hepsibahis",
                "mroyun"
            ],
            generalInfo: {
                startDate: "2022-03-01",
                endDate: "2022-03-31",
                onBoard: {
                    active: true/false  // why?????
                },
                preLaunchSettings: {
                    active: true/false,
                    days: 2,
                    en: {
                        "active": true/false,
                        "image": "https://...",
                        "title": "Welcome to our awesome game!",
                        "subtitle": "More than 1000 prizes are waiting for you! Just jump in!",
                        "content": "<p>Welcome to our amazing game, casino, slots, gamble and betting 24/7. The winner takes it all. To play, all you need is to deposit a few thousand dollars!</p>",
                        cta: {
                            "label": "Deposit now",
                            "desktop": "/profile/deposit",
                            "mobile": "/profile/deposit"
                        },
                    },
                    tr: {  // same but in Turkish
                        "active": true/false,
                        "image": "https://...",
                        "title": "",
                        "subtitle": "",
                        "content": "",
                        cta: {
                            "label": "Deposit now",
                            "desktop": "/profile/deposit",
                            "mobile": "/profile/deposit"
                        },
                    },
                    fr: {
                        "active": true/false,
                    },
                },
                welcomePageSettings: {
                    active: true/false,
                    en: {
                        "image": "https://...",
                        "title": "Welcome to our awesome game!",
                        "subtitle": "More than 1000 prizes are waiting for you! Just jump in!",
                        "content": ".....",
                        cta: {
                            "logged-in": "Play now",
                            "logged-out": "Join now"
                        }
                    },
                    tr: {

                    },
                    fr: {

                    },
                },
                postCampaignSettings: {
                    active: true/false,
                    days: 2,
                    en: {
                        "image": "https://...",
                        "title": "Our game is over",
                        "subtitle": "Until next time, stay in touch!",
                        "content": "....",
                        cta: {
                            "label": "Play now",
                            "desktop": "/t/casino/lobby.aspx",
                            "mobile": "/casino"
                        }
                    },
                    tr: {

                    },
                    fr: {

                    },

                },
                notEligibleSettings: {
                    action: true/false,
                    modulesToCheck: [
                        "minigameSpinTheWheel",
                        "_campaign"
                    ],
                    depositToCheck: {
                       days: 7,
                       amount: 500,
                       func: "callback func"
                    },
                    en: {},
                    tr: {},
                    fr: {}
                },
            },
            sections: [
                {
                    module: "dailyCampaign",  // ?
                    howItWorks: {
                        en: {
                            "image": "https://united.mediaglb.com/apps/olympics-2022/onboarding-promos.png",
                            "title": "Daily promotions",
                            "terms": [
                                "This is term no.1",
                                "This is term no.2",
                                "This is term no.3"
                            ]
                        },
                        tr: {},
                        fr: {},
                    },
                    settings: {
                        //?????????????
                    }
                }
            ],
        },
        "data-mini-game": {

        }
    }
}

export default allData;