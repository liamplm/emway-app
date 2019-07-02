import Ads from "./ads";
import Search from "./search";
import Home from "./home";
import ContactUs from "./contactUs";
import FAQ from "./faq";
import RataServices from "./rataServices";
import Services from "./services";
import Detail from "./detail";
import Categories from "./categories";
export default Routes = {
    Home: {
        title: 'صفحه اصلی',
        screen: Home,
        icon: require('../images/house-64.png')
    },
    Categories: {
        title: 'دسته بندی ها',
        screen: Categories,
        isFaIcon: true,
        icon: 'th-large'
    },
    Search: {
        title: 'جستو و جو',
        screen: Search,
        isFaIcon: true,
        icon: 'search'
    },
    Services: {
        title: 'خدمات',
        screen: Services,
        isFaIcon: true,
        icon: 'list'
        // icon: require('../images/report-3-64.png')
    },
    FAQ: {
        title: 'پرسش های متداول',
        screen: FAQ,
        icon: require('../images/question-mark-6-64.png')
    },
    Ads: {
        title: 'تبلیغات سودمند',
        screen: Ads,
        icon: require('../images/wow-badge-64.png')
    },
    ContactUs: {
        title: 'ارتباط با ما',
        screen: ContactUs,
        icon: require('../images/business-contact-64.png')
    },

    RataServices: {
        title: 'خدمات راتا',
        screen: RataServices,
        icon: require('../images/globe-3-64.png')
    },

    Detail: {
        screen: Detail,
        isPublic: false
    },
}
