import BeforeTheCampaign from "../views/BeforeTheCampaign.vue";
import DailyMinigame from "../views/DailyMinigame.vue";
import EndOfCampaign from "../views/EndOfCampaign.vue";
import Guest from "../views/Guest.vue";
import HowItWorks from "../views/HowItWorks.vue";
import Test from "../views/Test.vue"
import Lobby from "../views/Lobby";
import PreviousGifts from "../views/PreviousGifts";



const settingsRoute = {
    HowItWorks: {
        name: "HowItWorks",
        component: HowItWorks,
        style: {
            Carousel_1_image: {
                name: "image",
                value: "https://.....",
            },
            Carousel_1_backgroundImage: {
                name: "bgImage",
                value: "#0ef6c4",
            },
            Carousel_1_title: {
                name: "title",
                value: "Every day minigame",
            },
            Carousel_1_question: {
                name: "question",
                value: "how it works?",
            },
            Carousel_1_list_item1: {
                name: "list_item1",
                value: "some text",
            },
            Carousel_1_list_item2: {
                name: "list_item2",
                value: "some text",
           },
            Carousel_1_list_item3: {
                name: "list_item3",
                value: "some text",
            },
            Carousel_2_image: {
                name: "image",
                value: "https://.....",
                  },
            Carousel_2_backgroundImage: {
                name: "bgImage",
                value: "#0ef6c4",
                  },
            Carousel_2_title: {
                name: "title",
                value: "daily offers",
                  },
            Carousel_2_question: {
                name: "question",
                value: "how it works?",
                  },
            Carousel_2_list_item1: {
                name: "list_item1",
                value: "some text",
                          },
            Carousel_2_list_item2: {
                name: "list_item2",
                value: "some text",
                          },
            Carousel_2_list_item3: {
                name: "list_item3",
                value: "some text",
            },
            buttonColor: {
                name: "btnColor",
                value: "#e405a6"
            },
            buttonText: {
                name: "btnText",
                value: "play new",
            },
            show_term: {
                name: "show_term",
                value: "show term & conditions",
            },
            show_term_li1: {
                name: "li1",
                value: "some text"
            },
            show_term_li2: {
                name: "li1",
                value: "some text"
            },
            show_term_li3: {
                name: "li1",
                value: "some text"
            }

        },
    },
    Guest: {
        name: "Guest",
        component: Guest,
        style: {
            image: {
              name: "logo",
              value: "https://.....",
            },
            image_text: {
                name: "image text",
                value: "https://.....",
            },
            text1: {
                name: "text1",
                value: "A new campaign every day!",
            },
            text2: {
                name: "text2",
                value: "Increased earnings, free returns and more!",
            },
            text3: {
                name: "text3",
                value: "Casino Olympics, much bigger, more generous!",
            },
            buttonColor: {
                name: "btnColor",
                value: "#e405a6",
            },
            buttonText: {
                name: "btnText",
                value: "Let's go",
            },
        },
    },
    Test: {
        name: "Test",
        component: Test,
        style: {

        },
    },
    BeforeTheCampaign: {
        name: "BeforeTheCampaign",
        component: BeforeTheCampaign,
        style: {

        },
    },

};



export default settingsRoute;




