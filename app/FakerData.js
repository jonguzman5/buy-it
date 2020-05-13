import * as faker from 'faker';

export const getData = () => {
    let data = {
        fashionImage: faker.image.imageUrl(400, 400, "fashion"),
        foodImage: faker.image.imageUrl(400, 400, "food"),
        sportsImage: faker.image.imageUrl(400, 400, "sports"),
    }
    return data;
}