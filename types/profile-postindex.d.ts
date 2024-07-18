// export interface Post {
//   post: {
//     post: {
//       postId: string
//       userId: string
//       travelNationality: string
//       travelCity: string
//       travelStartDate: string
//       travelEndDate: string
//       travelStatus: string
//       preferredGender: string
//       travelStyle: string
//       travelPurpose: string
//       createdAt: string
//       imageUrls: string[]
//     }
//     user: {
//       userId: string
//       email: string
//       name: string
//       nickname: string
//       nationality: string
//       language: string
//       profileImage: string
//       introduction: string
//       city: string
//       authority: string
//       gender: string
//       mbti: string
//       interests: string
//       birthday: string
//       lastLoginAt: string
//     } | null
//   }
// }

export interface Post {
  userId: string
  travelNationality: string
  travelCity: string
  travelStartDate: string
  travelEndDate: string
  travelStatus: string
  preferredGender: string
  travelStyle: string
  travelPurpose: string
  imageUrls: string[]
}
