export const SelectTravelesList = [
    {
        id:1,
        title:'Just Me',
        desc: 'A sole travelesin exploration',
        icons:'🚵🏻',
        people:1,
    },
    {
        id:2,
        title:'A Couple',
        desc: 'Two Traveles in tandem',
        icons:'🥂',
        people:2,
    },
    {
        id:3,
        title:'Family',
        desc:'A group pf fun loving adv',
        icons:'🏡',
        people: '3 to 4 People',
    },
    {
        id:4,
        title:'Friends',
        desc:'A Bunch of thrill-seeks',
        icons:'🛥️',
    }
]

export const SelectBudgetOptions= [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icons:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icons:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icons:'💸',
    }
]

export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating , description and suggest itinerary with placeName, Place, Details , Image Url, Geo Coordinates, tickets Pricing,rating, Time travel each of the location for 3 days with each day plan with best time to vist in JSON format "