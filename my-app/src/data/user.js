export const USER = [ // can be only one data
    {
        id: "", // cuid id for better security, auto increment, auto generation,
        name: "", // name of the user, not required
        email: "", // email of the user, required, save in encrypted way,
        password: "", // password of the user, required, save in encrypted way
        image: "", // profile photo of the image, not required, save refernce only and image will be save at cloudinary, and its refernce will be its url, 
        designation: "", // designation of the admin in company by default it will be ADMIN
    }
]

export const USERSETTINGS = [
    {
        companyName: "", // company name
        companyHeaderLogo: "", // company header logo can be 
        CompanyFooterLogo: "", // compnay footer logo can be same or different
        companyFavIcon: "", // place favicon to show
        CompanyOgTiltle: "", // write og title
        CompanyOgImage: "", // upload og image
        Keywords: "", // keywords
        aboutCompanyInShort: "", // about company in short like in 200 words only, it will come from text editor
        companyMobile: "", // can be one or more
        companyLocationGoogleMapLink: "", // google map link of company location to list on contact us page 
        copyRightReserveForFooter: "", //to show in footer bottom, a copyright message
    }
]