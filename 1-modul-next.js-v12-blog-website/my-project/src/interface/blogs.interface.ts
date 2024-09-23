export interface BlogsType {
    //hygraphda yozilgan serverni datalari qanday typda ekanligi alohida papkada yozildi va bu blogs ishlatilgan joyga har bi malumotni typini alohida yozib o'tirmasdan shu blogstypeni chaqirib qo'ysa bo'ldi shunda  blogs ishlatilgan faillarda har bir qiymatga typni alohida yozish kerak bo'lmaydi
    excerpt: string;
    id: string;
    slug: string;
    title: string;
    createdAt: Date;
    image: {
        url: string;
    };
    author: {
        name: string;
        avatar: {
            url: string;
        };
    };
    category: {
        label: string;
        slug: string;
    };
    description: {
        text: string;
        html: string;
    };
}
