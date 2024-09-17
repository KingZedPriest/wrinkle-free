export const formatSubheading = (page: string) => {
    switch (page) {
        case "dashboard":
            return "Unified Dashboard for Seamless Laundry Operations.";
        case "orders":
            return "Streamlined Order Management for Enhanced Efficiency.";
        case "profile":
            return "Personalized Account Management for Tailored Service.";
        case "staff":
            return "Comprehensive Staff Oversight for Optimal Performance.";
        case "staff/new":
            return "Add New Staff Member to Enhance Efficiency.";
        case "orders/new":
            return "Create Customer Order.";
        case "unauthorised":
            return "Insufficient Clearance.";
        default:
            return "Seamless Laundry Operations.";
    }
};

export const formatPlaceholder = (page: string) => {
    switch (page) {
        case "dashboard":
            return "Search for a User";
        case "orders":
            return "Search for an Order(s)";
        case "staff":
            return "Search for a Staff";
        default:
            return "Search Unavailable";
    }
}