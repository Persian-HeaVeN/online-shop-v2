export function calculateOffPrice(price: any, off: any) {
    const offPercent = Number(off);
    const productPrice = Number(price)
    if (offPercent > 0) {
        return Math.floor(Number(productPrice - (productPrice * offPercent) / 100));
    } else {
        return Number(productPrice);
    }
}