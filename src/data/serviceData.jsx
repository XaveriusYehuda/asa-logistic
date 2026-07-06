// export handling
import heroExportHandling from '../assets/heroService/export-handling.webp';
import leftExportHandling from '../assets/mainServiceCard/leftExportHandling.png';
import centerExportHandling from '../assets/mainServiceCard/centerExportHandling.png';
import rightExportHandling from '../assets/mainServiceCard/rightExportHandling.png';
import subServiceEXP from '../assets/subServiceImage/export-handling.webp';
// import clearance
import heroImportClearance from '../assets/heroService/import-clearance.webp';
import leftImportClearance from '../assets/mainServiceCard/leftImportClearance.png';
import centerImportClearance from '../assets/mainServiceCard/centerImportClearance.png';
import rightImportClearance from '../assets/mainServiceCard/rightImportClearance.png';
import subServiceIMP from '../assets/subServiceImage/import-clearance.webp';
// international ff
import heroInternationalFF from '../assets/heroService/international-freight.webp';
import leftInternationalFreight from '../assets/mainServiceCard/leftInternationalFreight.png';
import centerInternationalFreight from '../assets/mainServiceCard/centerInternationalFreight.png';
import rightInternationalFreight from '../assets/mainServiceCard/rightInternationalFreight.png';
import subServiceIFF from '../assets/subServiceImage/international-freight.webp'; 
// domestic delivery
import heroDomesticDelivery from '../assets/heroService/domestic-delivery.webp'; 
import leftDomesticDelivery from '../assets/mainServiceCard/leftDomesticDelivery.png';
import centerDomesticDelivery from '../assets/mainServiceCard/centerDomesticDelivery.png';
import rightDomesticDelivery from '../assets/mainServiceCard/rightDomesticDelivery.png';
import subServiceDD from '../assets/subServiceImage/domestic-delivery.webp';
// undername exim
import heroUndernameExim from '../assets/heroService/undername-export-import.webp';
import leftUndernameExim from '../assets/mainServiceCard/leftUndernameExim.webp';
import centerUndernameExim from '../assets/mainServiceCard/centerUndernameExim.webp';
import rightUndernameExim from '../assets/mainServiceCard/rightUndernameExim.webp';
import subServiceUDN from '../assets/subServiceImage/undername-exim.webp';


const serviceData = [
  {
    id : 0,
    idHTML : "export",
    path : "/service?tab=export",
    heroImage : heroExportHandling,
    heroTitle : "Export Handling",
    heroCaption : "Gain access to new markets without logistical barriers. We specialize in handling documentation, insurance, and port operations to ensure the seamless distribution of your export cargo.",
    mainTag : "Our Service",
    mainTittle : "Export Handling",
    mainCaption : "We provide door-to-door LCL/FCL export services, covering consolidation, documentation, and insurance. By utilizing premium sea and air freight networks, we guarantee seamless port handling and efficient international shipping for every cargo.",
    leftCardImage : leftExportHandling,
    leftCardTitle : "Export Documentation",
    leftCardCaption : "Complete export documentation to ensure smooth global administration and customs clearance.",
    centerCardImage : centerExportHandling,
    centerCardTitle : "Port Handling",
    centerCardCaption : "Comprehensive insurance coverage to ensure the safety of goods from shipping risks.",
    rightCardImage : rightExportHandling,
    rightCardTitle : "Cargo Insurance",
    rightCardCaption : "Professional services at the port to ensure efficient cargo loading and unloading.",
    subTitle : "More information on ",
    subTitleRed : "door to door service",
    subCaption : "Door-to-door service ensures ease of export by picking up goods from your location and delivering them directly to their final destination safely and efficiently.",
    subImage : subServiceEXP,
  },
  {
    id : 1,
    idHTML : "import",
    path : "/service?tab=import",
    heroImage : heroImportClearance,
    heroTitle : "Import Clearance",
    heroCaption : "Ensuring smooth customs clearance by minimizing legal risks and delays, in order to support cost efficiency and the sustainability of your business in a professional manner.",
    mainTag : "Our Service",
    mainTittle : "Import Clearance",
    mainCaption : "Optimize your supply chain with professional Import Clearance services. We integrate seamless Customs Clearance with an effective Cargo Release Management system to avoid additional costs. Our services include secure Port to Warehouse Handling solutions, ensuring your imported goods arrive at their destination quickly, on time, and in accordance with the highest procedural standards.",
    leftCardImage : leftImportClearance,
    leftCardTitle : "Customs Clearance",
    leftCardCaption : "Management of accelerated cargo release to ensure efficient flow of goods.",
    centerCardImage : centerImportClearance,
    centerCardTitle : "Port to Warehouse Handling",
    centerCardCaption : "Integrated cargo transportation from the port directly to the customer's destination warehouse.",
    rightCardImage : rightImportClearance,
    rightCardTitle : "Cargo Release Management",
    rightCardCaption : "Professional handling of customs procedures to ensure the legality of exports and imports.",
    subTitle : "More information on ",
    subTitleRed : "cargo consolidation",
    subCaption : "Our consolidation service combines small shipments to optimize container space, reduce logistics costs, and expedite customs clearance to your warehouse.",
    subImage : subServiceIMP,
  },
  {
    id : 2,
    idHTML : "internationalff",
    path : "/service?tab=internationalff",
    heroImage : "src/assets/heroService/international-freight.webp",
    heroTitle : "International Freight",
    heroCaption : "A provider of integrated global logistics solutions through international document management, cargo consolidation, transparent cost calculations, shipment protection, and comprehensive customs procedures.",
    mainTag : "Our Service",
    mainTittle : "International Freight",
    mainCaption : "As a global transportation partner, we are here to simplify your supply chain. From organizing collective cargo to transparent freight cost calculations, we handle every administrative aspect of international trade. Our focus is on ensuring tax and customs compliance and providing comprehensive protection for your assets during air and sea transport.",
    leftCardImage : leftInternationalFreight,
    leftCardTitle : "Customs Clearance",
    leftCardCaption : "Professional handling of customs procedures to ensure the legality of exports and imports.",
    centerCardImage : centerInternationalFreight,
    centerCardTitle : "Export–Import Handling",
    centerCardCaption : "Comprehensive management of export-import operations to ensure a smooth global supply chain.",
    rightCardImage : rightInternationalFreight,
    rightCardTitle : "Freight Calculation",
    rightCardCaption : "Accurate shipping cost estimates to optimize logistics budget efficiency.",
    subTitle : "Get to know on ",
    subTitleRed : "supply chain customization",
    subCaption : "We design personalized supply chain solutions to optimize operational efficiency, reduce costs, and tailor distribution to the unique needs of your global business.",
    subImage : subServiceIFF,
  },
  {
    id : 3,
    idHTML : "domesticdelivery",
    path : "/service?tab=domesticdelivery",
    heroImage : heroDomesticDelivery,
    heroTitle : "Domestic Delivery",
    heroCaption : "Air, land, and sea logistics solutions covering all regions of Indonesia, handling large and small cargo professionally until it arrives safely at its destination.",
    mainTag : "Our Service",
    mainTittle : "Domestic Delivery",
    mainCaption : "Connect your business to various regions in Indonesia through our fleet of air, land, and sea transportation. With an integrated cargo management system, we handle both large and small shipments between provinces. Our commitment is to provide convenience through pick-up and delivery services right at your destination, ensuring your supply chain runs smoothly without distance barriers.",
    leftCardImage : leftDomesticDelivery,
    leftCardTitle : "Cargo Handling",
    leftCardCaption : "Professional cargo handling that ensures the safety of goods during the operational process.",
    centerCardImage : centerDomesticDelivery,
    centerCardTitle : "Inter-Island Shipping",
    centerCardCaption : "Integrated inter-island shipping services to support your national distribution connectivity.",
    rightCardImage : rightDomesticDelivery,
    rightCardTitle : "Door to Door Delivery",
    rightCardCaption : "A practical delivery solution from the pickup location directly to the recipient's doorstep.",
    subTitle : "More information on ",
    subTitleRed : "custom fleets",
    subCaption : "We provide a specialized fleet tailored to the characteristics of your cargo, ensuring delivery efficiency and the safety of goods during domestic shipping.",
    subImage : subServiceDD,
  },
  {
    id : 4,
    idHTML : "undernameexim",
    path : "/service?tab=undernameexim",
    heroImage : heroUndernameExim,
    heroTitle : "Undername Export Import",
    heroCaption : "By utilizing our company's legality and permits, all documentation and customs processes are handled legally and professionally, providing practical solutions for individuals, groups, and companies that do not yet have export-import permits to continue conducting international trade activities legally.",
    mainTag : "Our Service",
    mainTittle : "Undername Export Import",
    mainCaption : "Through the Undername service, you can conduct transactions in the global market using official permits from our company. We ensure that you are facilitated for expansion without having to wait for time-consuming permit document processing. Safe, legal, and professional. We help you send or import goods from abroad in a practical and transparent manner.",
    leftCardImage : leftUndernameExim,
    leftCardTitle : "Official License",
    leftCardCaption : "Obtain official and legal authorizations to ensure legal certainty customs clearance.",
    centerCardImage : centerUndernameExim,
    centerCardTitle : "Rapid and Reliable",
    centerCardCaption : "Fast and reliable shipping services to ensure your international shipments arrive on time and safely.",
    rightCardImage : rightUndernameExim,
    rightCardTitle : "Partnership",
    rightCardCaption : "Strategic partnership-based business solutions to professionally expand your export and import access and network.",
    subTitle : "Get to know on ",
    subTitleRed : "land lease",
    subCaption : "Through a legal and secure “flag leasing” system, we act as the official consignee. Focus on your business, let us take charge of the legalities.",
    subImage : subServiceUDN,
  },
];

export default serviceData;