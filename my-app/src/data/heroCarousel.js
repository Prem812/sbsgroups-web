export const dummySlides = [
  {
    id: "clx1234567890abcdefghijklmn", // CUID Format example
    nextSlideIn: 5, // dusration is for IMAGE , SOLID & GRADIENT only and it is in seconds, if media type is video then duration will be ignored
    mediaType: "IMAGE", // IMAGE/VIDEO/SOLID/GRADIENT
    solidColor: "#000000", // Only for solid color type, option will be disable if media type is not solid it will support hex code value and we can use color picker
    gradientColor: { // enable only when media type is GRADIENT and option will be disable if media type is not gradient
      gradientType: "linear", // linear or radial
      gradientDirection: "to right", // for linear gradient only, can be "to right", "to left", "to top", "to bottom", "to top right", "to top left", "to bottom right", "to bottom left"
      gradientColorStarts: "#ff0000", // for linear gradient only, starting color hex code
      gradientColorEnds: "#0000ff", // for linear gradient only, ending color hex code
      gradientColorStops: "0%, 100%", // for linear gradient only, color stops in percentage for each color, default is 0 to 100% if not provided
    }, // Only for gradient type gradient color selecter disable if media type is not gradient
    mediaUrl: "https://sbsgroups.co.in:9000/uploads/products/1776489717441.jpg",
    videoLoop: false, // default false if media type is not video although its default tyupe is false and if you make it true it will never let you go on another slider automatically it will keep on looping the video in that slider only, so use it carefully if you wants to use you should show prev and next button from settings
    layoutType: "center", // LEFT, CENTER, RIGHT for contents only, for media type SOLID & GRADIENT only CENTER is allowed
    badge: "Polisher Scrubber",
    badgeStyle: {
      fontColor: "#ffffff", // font color for badge text, by default it will be white and it will only support hex code and we can use color picker for select color
      backgroundColor: "#e98a0fa1", // by default it will be light saffron color and it will only support hex code and we can use color picker to select color
      padding: "5px 5px", // by default it will be 5 and 10px and can change if needed from range selectors it can be 00 also
      fontWeight: "700", // by default it will be 700 and if we want to change we can select like in 100s and 50s
      letterSpacing: "0.05em",  //all value will be in em where by default 0.05em
      textTransform: "uppercase", //can be uppercase or lowercase or capitalize or none where none will show as written in ctaText by default is UPPERCASE
      transition: "all 1.3s ease", // by default it will be "all 0.3s ease" you can change it if you wants to make changes in transition effect
      hoverScale: 1.03, // by default it will be 1.03 which means on hover it will scale to 103% of its original size you can change it to make it more or less scaling on hover
    },
    title: "Makita 40Vmax XGT BL Cordless Polisher Scrubber (PS001G)",
    titleStyle: "bg-blue-900", //for styling title only
    description: "This model is a cordless polisher scrubber powered by a 40Vmax XGT Li-Ion battery. By changing the brush or pad attachments, the machine can be used for a wide range of applications, such as cleaning dirt and stains from floors and polishing wax on floors.",
    descriptionStyle: "bg-transparent", //for styling description only
    ctaText: "Explore Product", //click to action button text
    ctaLink: "https://sbsgroups.co.in/products", //click to action button link 
    ctaOpenInNewTab: true, //click to action button open in new tab or not
    ctaButtonStyle: {
      fontColor: "#ffffff",
      backgroundColor: {
        mediatype: "SOLID", // SOLID or GRADIENT
        solid: "#007bff00", // active only when media type is solid color hex code  
        gradient:{
          gradientType: "linear", // linear or radial
          gradientDirection: "to right", // for linear gradient only, can be "to right", "to left", "to top", "to bottom", "to top right", "to top left", "to bottom right", "to bottom left"
          gradientColorStarts: "#ff0000", // for linear gradient only, starting color hex code
          gradientColorEnds: "#0000ff", // for linear gradient only, ending color hex code
        },
      },
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "700",
      letterSpacing: "0.05em",  //all value will be in em where by default 0.05em
      textTransform: "uppercase", //can be uppercase or lowercase or capitalize or none where none will show as written in ctaText by default is Capitalize
      transition: "all 0.3s ease", // by default it will be "all 0.3s ease" you can change it if you wants to make changes in transition effect
      hoverScale: 2.03, // by default it will be 1.03 which means on hover it will scale to 103% of its original size you can change it to make it more or less scaling on hover
    },
  },
  {
    id: "clx234567890abcdefghijklmno",
    mediaType: "VIDEO", // IMAGE/VIDEO/SOLID/GRADIENT by default SOLID
    nextSlideIn: 5, // dusration is for IMAGE , SOLID & GRADIENT only, if media type is video then duration will be ignored
    solidColor: "#000000", // Only for solid color type, option will be disable if media type is not solid it will support hex code value and we can use color picker
    gradientColor: { // enable only when media type is GRADIENT and option will be disable if media type is not gradient
      gradientType: "linear", // linear or radial
      gradientDirection: "to right", // for linear gradient only, can be "to right", "to left", "to top", "to bottom", "to top right", "to top left", "to bottom right", "to bottom left"
      gradientColorStarts: "#ff0000", // for linear gradient only, starting color hex code
      gradientColorEnds: "#0000ff", // for linear gradient only, ending color hex code
      gradientColorStops: "0%, 100%", // for linear gradient only, color stops in percentage for each color, default is 0 to 100% if not provided
    }, // Only for gradient type gradient color selector disable if media type is not gradient
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // this input is for both image and video there is no by default into it
    videoLoop: "true", // default false if media type is not video although its default tyupe is false and if you make it true it will never let you go on another slider automatically it will keep on looping the video in that slider only, so use it carefully if you wants to use you should show prev and next button from settings
    layoutType: "LEFT", // LEFT, CENTER, RIGHT for contents only, for media type SOLID & GRADIENT only CENTER is allowed
    badge: "Polisher Scrubber",
    badgeStyle: {
      fontColor: "#ffffff", // font color for badge text, by default it will be white and it will only support hex code and we can use color picker for select color
      backgroundColor: "#007bff", // by default it will be light saffron color and it will only support hex code and we can use color picker to select color
      padding: "5px 10px", // by default it will be 5 and 10px and can change if needed from range selectors
      fontWeight: "700", // by default it will be 700 and if we want to change we can select like in 100s and 50s
      letterSpacing: "0.05em",  //all value will be in em where by default 0.05em
      textTransform: "uppercase", //can be uppercase or lowercase or capitalize or none where none will show as written in ctaText by default is UPPERCASE
      transition: "all 0.3s ease", // by default it will be "all 0.3s ease" you can change it if you wants to make changes in transition effect
      hoverScale: 1.03, // by default it will be 1.03 which means on hover it will scale to 103% of its original size you can change it to make it more or less scaling on hover
    },
    title: "Makita 40Vmax XGT BL Cordless Polisher Scrubber (PS001G)",
    titleStyle: "bg-blue-900", //for styling title only
    description: "This model is a cordless polisher scrubber powered by a 40Vmax XGT Li-Ion battery. By changing the brush or pad attachments, the machine can be used for a wide range of applications, such as cleaning dirt and stains from floors and polishing wax on floors.",
    descriptionStyle: "bg-green-700", //for styling description only
    ctaText: "Explore Product", //click to action button text
    ctaLink: "https://sbsgroups.co.in/products", //click to action button link 
    ctaOpenInNewTab: true, //click to action button open in new tab or not
    ctaButtonStyle: {
      fontColor: "#ffffff",
      backgroundColor: {
        mediatype: "SOLID", // SOLID or GRADIENT
        solid: "#007bff", // active only when media type is solid color hex code  
        gradient:{
          gradientType: "linear", // linear or radial
          gradientDirection: "to right", // for linear gradient only, can be "to right", "to left", "to top", "to bottom", "to top right", "to top left", "to bottom right", "to bottom left"
          gradientColorStarts: "#ff0000", // for linear gradient only, starting color hex code
          gradientColorEnds: "#0000ff", // for linear gradient only, ending color hex code
        },
      },
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "700",
      letterSpacing: "0.05em",  //all value will be in em where by default 0.05em
      textTransform: "uppercase", //can be uppercase or lowercase or capitalize or none where none will show as written in ctaText by default is Capitalize
      transition: "all 0.3s ease", // by default it will be "all 0.3s ease" you can change it if you wants to make changes in transition effect
      hoverScale: 1.03, // by default it will be 1.03 which means on hover it will scale to 103% of its original size you can change it to make it more or less scaling on hover
    },
  },
  {
    id: "clx34567890abcdefghijklmnop",
    mediaType: "IMAGE", // IMAGE/VIDEO/SOLID/GRADIENT
    nextSlideIn: 5, // dusration is for IMAGE , SOLID & GRADIENT only, if media type is video then duration will be ignored
    solidColor: "#000000", // Only for solid color type, option will be disable if media type is not solid it will support hex code value and we can use color picker
    gradientColor: { // enable only when media type is GRADIENT and option will be disable if media type is not gradient
      gradientType: "linear", // linear or radial
      gradientDirection: "to right", // for linear gradient only, can be "to right", "to left", "to top", "to bottom", "to top right", "to top left", "to bottom right", "to bottom left"
      gradientColorStarts: "#ff0000", // for linear gradient only, starting color hex code
      gradientColorEnds: "#0000ff", // for linear gradient only, ending color hex code
      gradientColorStops: "0%, 100%", // for linear gradient only, color stops in percentage for each color, default is 0 to 100% if not provided
    }, // Only for gradient type gradient color selecter disable if media type is not gradient
    mediaUrl: "https://sbsgroups.co.in:9000/uploads/products/1776489717441.jpg",
    videoLoop: false, // default false if media type is not video although its default tyupe is false and if you make it true it will never let you go on another slider automatically it will keep on looping the video in that slider only, so use it carefully if you wants to use you should show prev and next button from settings
    layoutType: "LEFT", // LEFT, CENTER, RIGHT for contents only, for media type SOLID & GRADIENT only CENTER is allowed
    badge: "Polisher Scrubber",
    badgeStyle: {
      fontColor: "#ffffff", // font color for badge text, by default it will be white and it will only support hex code and we can use color picker for select color
      backgroundColor: "#007bff", // by default it will be light saffron color and it will only support hex code and we can use color picker to select color
      padding: "5px 10px", // by default it will be 5 and 10px and can change if needed from range selectors
      fontWeight: "700", // by default it will be 700 and if we want to change we can select like in 100s and 50s
      letterSpacing: "0.05em",  //all value will be in em where by default 0.05em
      textTransform: "uppercase", //can be uppercase or lowercase or capitalize or none where none will show as written in ctaText by default is UPPERCASE
      transition: "all 0.3s ease", // by default it will be "all 0.3s ease" you can change it if you wants to make changes in transition effect
      hoverScale: 1.03, // by default it will be 1.03 which means on hover it will scale to 103% of its original size you can change it to make it more or less scaling on hover
    },
    title: "Makita 40Vmax XGT BL Cordless Polisher Scrubber (PS001G)",
    titleStyle: "bg-blue-900", //for styling title only
    description: "This model is a cordless polisher scrubber powered by a 40Vmax XGT Li-Ion battery. By changing the brush or pad attachments, the machine can be used for a wide range of applications, such as cleaning dirt and stains from floors and polishing wax on floors.",
    descriptionStyle: "bg-green-700", //for styling description only
    ctaText: "Explore Product", //click to action button text
    ctaLink: "https://sbsgroups.co.in/products", //click to action button link 
    ctaOpenInNewTab: true, //click to action button open in new tab or not
    ctaButtonStyle: {
      fontColor: "#ffffff",
      backgroundColor: {
        mediatype: "SOLID", // SOLID or GRADIENT
        solid: "#007bff", // active only when media type is solid color hex code  
        gradient:{
          gradientType: "linear", // linear or radial
          gradientDirection: "to right", // for linear gradient only, can be "to right", "to left", "to top", "to bottom", "to top right", "to top left", "to bottom right", "to bottom left"
          gradientColorStarts: "#ff0000", // for linear gradient only, starting color hex code
          gradientColorEnds: "#0000ff", // for linear gradient only, ending color hex code
        },
      },
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "700",
      letterSpacing: "0.05em",  //all value will be in em where by default 0.05em
      textTransform: "uppercase", //can be uppercase or lowercase or capitalize or none where none will show as written in ctaText by default is Capitalize
      transition: "all 0.3s ease", // by default it will be "all 0.3s ease" you can change it if you wants to make changes in transition effect
      hoverScale: 1.03, // by default it will be 1.03 which means on hover it will scale to 103% of its original size you can change it to make it more or less scaling on hover
    },
  },
  {
    id: "cljh3b5ty00023b67m1n0b9v7",
    mediaType: "IMAGE", // IMAGE/VIDEO/SOLID/GRADIENT
    nextSlideIn: 5, // dusration is for IMAGE , SOLID & GRADIENT only, if media type is video then duration will be ignored
    solidColor: "#000000", // Only for solid color type, option will be disable if media type is not solid it will support hex code value and we can use color picker
    gradientColor: { // enable only when media type is GRADIENT and option will be disable if media type is not gradient
      gradientType: "linear", // linear or radial
      gradientDirection: "to right", // for linear gradient only, can be "to right", "to left", "to top", "to bottom", "to top right", "to top left", "to bottom right", "to bottom left"
      gradientColorStarts: "#ff0000", // for linear gradient only, starting color hex code
      gradientColorEnds: "#0000ff", // for linear gradient only, ending color hex code
      gradientColorStops: "0%, 100%", // for linear gradient only, color stops in percentage for each color, default is 0 to 100% if not provided
    }, // Only for gradient type gradient color selecter disable if media type is not gradient
    mediaUrl: "https://sbsgroups.co.in:9000/uploads/products/1776489717441.jpg",
    videoLoop: false, // default false if media type is not video although its default tyupe is false and if you make it true it will never let you go on another slider automatically it will keep on looping the video in that slider only, so use it carefully if you wants to use you should show prev and next button from settings
    layoutType: "LEFT", // LEFT, CENTER, RIGHT for contents only, for media type SOLID & GRADIENT only CENTER is allowed
    badge: "Polisher Scrubber",
    badgeStyle: {
      fontColor: "#ffffff", // font color for badge text, by default it will be white and it will only support hex code and we can use color picker for select color
      backgroundColor: "#007bff", // by default it will be light saffron color and it will only support hex code and we can use color picker to select color
      padding: "5px 10px", // by default it will be 5 and 10px and can change if needed from range selectors
      fontWeight: "700", // by default it will be 700 and if we want to change we can select like in 100s and 50s
      letterSpacing: "0.05em",  //all value will be in em where by default 0.05em
      textTransform: "uppercase", //can be uppercase or lowercase or capitalize or none where none will show as written in ctaText by default is UPPERCASE
      transition: "all 0.3s ease", // by default it will be "all 0.3s ease" you can change it if you wants to make changes in transition effect
      hoverScale: 1.03, // by default it will be 1.03 which means on hover it will scale to 103% of its original size you can change it to make it more or less scaling on hover
    },
    title: "Makita 40Vmax XGT BL Cordless Polisher Scrubber (PS001G)",
    titleStyle: "bg-blue-900", //for styling title only
    description: "This model is a cordless polisher scrubber powered by a 40Vmax XGT Li-Ion battery. By changing the brush or pad attachments, the machine can be used for a wide range of applications, such as cleaning dirt and stains from floors and polishing wax on floors.",
    descriptionStyle: "bg-green-700", //for styling description only
    ctaText: "Explore Product", //click to action button text
    ctaLink: "https://sbsgroups.co.in/products", //click to action button link 
    ctaOpenInNewTab: true, //click to action button open in new tab or not
    ctaButtonStyle: {
      fontColor: "#ffffff",
      backgroundColor: {
        mediatype: "SOLID", // SOLID or GRADIENT
        solid: "#007bff", // active only when media type is solid color hex code  
        gradient:{
          gradientType: "linear", // linear or radial
          gradientDirection: "to right", // for linear gradient only, can be "to right", "to left", "to top", "to bottom", "to top right", "to top left", "to bottom right", "to bottom left"
          gradientColorStarts: "#ff0000", // for linear gradient only, starting color hex code
          gradientColorEnds: "#0000ff", // for linear gradient only, ending color hex code
        },
      },
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "700",
      letterSpacing: "0.05em",  //all value will be in em where by default 0.05em
      textTransform: "uppercase", //can be uppercase or lowercase or capitalize or none where none will show as written in ctaText by default is Capitalize
      transition: "all 0.3s ease", // by default it will be "all 0.3s ease" you can change it if you wants to make changes in transition effect
      hoverScale: 1.03, // by default it will be 1.03 which means on hover it will scale to 103% of its original size you can change it to make it more or less scaling on hover
    },
  },
];

export const CarouselSettings = {
  prevButton: "true", // "hidden" or "visible"
  nextButton: "true", // "hidden" or "visible"
  bottomDots: "true", // "hidden" or "visible"
};