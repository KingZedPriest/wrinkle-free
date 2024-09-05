export const formatSubheading = (page: string) => {
    switch (page) {
        case "dashboard":
            return "Unified Dashboard for Seamless Laundry Operations";
        case "orders":
            return "Streamlined Order Management for Enhanced Efficiency";
        case "profile":
            return "Personalized Account Management for Tailored Service";
        case "search":
            return "Advanced Search Capabilities for Rapid Information Retrieval";
        case "staff":
            return "Comprehensive Staff Oversight for Optimal Performance";
        default:
            return "";
    }
};
