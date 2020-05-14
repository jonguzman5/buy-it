import * as faker from 'faker';

export const getData = () => {
    let data = {
        //fashionImage: faker.image.imageUrl(400, 400, "fashion"),
        fashionImage: `${faker.image.fashion()}?random=${Date.now()}`,
        //foodImage: faker.image.imageUrl(400, 400, "food"),
        foodImage: `${faker.image.food()}?random=${Date.now()}`,
        //sportsImage: faker.image.imageUrl(400, 400, "sports"),        
        sportsImage: `${faker.image.sports()}?random=${Date.now()}`
    }
    return data;
}