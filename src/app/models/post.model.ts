import { Time } from "@angular/common";
import { ReviewModel } from "./review.model";

export interface PostModel {

	ageRestriction: number;
	attendanceCount: number;
	category: string;
	description: string;
	id: number;
	images: string[];
	isFlagged: boolean;
	locations: string[];
	paymentTypes: string[];
	postingUserId: string;
	reviews: ReviewModel[];
	rating: number;
	times: string[];
	title: string;

}