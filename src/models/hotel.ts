export interface HotelProps {
    comment: string
    contents: string
    id: string
    events?: {
        name: string
        promoEndTime: string
        tagThemeStyle: {
            backgroundColor: string
            fontColor: string
        }
    }
    images: string[]
    location: {
        directions: string
        pointGeolocation: { x: number; y: number }
    }
    mainImageUrl: string
    price: number
    startRating: number
}
