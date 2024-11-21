const formatAmount = (amount: number | null) => {
    if (amount === null) return 'N/A';
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

export default formatAmount