export const formatSubheading = (page: string) => {
    switch (page) {
        case "dashboard":
            return "Unified Dashboard for Seamless Laundry Operations";
        case "orders":
            return "Streamlined Order Management for Enhanced Efficiency";
        case "profile":
            return "Personalized Account Management for Tailored Service";
        case "staff":
            return "Comprehensive Staff Oversight for Optimal Performance";
        default:
            return "";
    }
};

export const formatPlaceholder = (page: string) => {
    switch(page){
        case "dashboard":
            return "Search for a User or an Order";
        case "orders":
            return "Search for Orders";
        case "profile":
            return "Search Unavailable";
        case "staff":
            return "Search for Staff"
    }
}