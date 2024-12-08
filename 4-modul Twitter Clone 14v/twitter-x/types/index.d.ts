export interface IUser {
    createdAt: Date;//global date qilindi chunki user created bo'lganda mongodbda global vaqt bilan userni qachin created bo'lgani aytib qo'yilishi kerak
    username: string;
    email: string;
    name: string;
    profileImage: string;
    coverImage: string;
    updatedAt: Date;
    _id: string;
    bio: string;
    location: string;
    followers: string[];
    following: string[];
    hasNewNotifications: boolean;
    notifications: string[];
    isFollowing: boolean;
}

export interface IPost {
    body: string;
    comments: number;
    createdAt: string;
    likes: number
    updatedAt: string;
    user: IUser;//postni user yozadi shu sabab userni tanish uchun typlari berib qo'yilishi kerak
    _id: string;
    hasLiked: boolean
}
