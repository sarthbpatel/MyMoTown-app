export interface UserModel {

	uid: string;
	email: string;
	isAdmin: boolean;
	isFlagged: boolean;
	banTime: number;
	attendingPosts: number[];

}